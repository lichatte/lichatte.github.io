const postMenuFilters = document.querySelectorAll('.all-posts__menu a');
const postLinks = document.querySelectorAll('.post__link');
const postMoreInfoClose = document.querySelectorAll('.post__close');
const mainMenuAnchors = document.querySelectorAll('menu a');
const sections = document.querySelectorAll('section, footer');
const arrows = document.getElementById('arrows');

const numStars = 100; // Adjust the number of stars as needed

function createStars() {
	let container = document.getElementById('star-container');
	// If valid but empty (or just created), we populate it
	container.innerHTML = '';

	const count = 80;
	const stars = [];

	for (let i = 0; i < count; i++) {
		const s = document.createElement('div');
		s.className = 'star';

		// Random Initial Positions
		const x = Math.random() * 100;
		const y = Math.random() * 100; // 0-100%

		// 30% chance to be completely static (distant stars)
		const isStatic = Math.random() < 0.3;
		const z = isStatic ? 0 : 0.2 + Math.random() * 0.6; // Speed factor (depth)
		const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2; // Static stars smaller

		s.style.left = x + '%';
		s.style.top = y + '%';
		s.style.width = size + 'px';
		s.style.height = size + 'px';

		// Add twinkle variation
		s.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
		s.style.animationDelay = (Math.random() * 5) + 's';

		container.appendChild(s);
		stars.push({ el: s, initialY: y, speed: z });
	}
}

createStars();

arrows.addEventListener('click', function(e) {
	e.preventDefault();
	const topPosition = document.getElementById('works').offsetTop;
	window.scrollTo(0, topPosition);
});

mainMenuAnchors.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		for (const menuBtn of mainMenuAnchors) {
			menuBtn.classList.remove('active');
		}
		this.classList.add('active');
	});
});

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.2
};

const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Remove 'active' class from all links first
			mainMenuAnchors.forEach((anchor) => {
				anchor.classList.remove('active');
			});

			// Add 'active' class to the link corresponding to the current section
			const currentSectionId = entry.target.id;
			const correspondingLink = document.querySelector(`a[href='#${currentSectionId}']`);

			if (correspondingLink) {
				correspondingLink.classList.add('active');
			}

			switch (currentSectionId) {
				case 'skillset':
					const allSkillsets = document.querySelectorAll('.multi-skill');
					allSkillsets.forEach((skill) => {
						skill.classList.add('animated');
					});
					break;
				case 'timeline':
					const allTimelineBlocks = document.querySelectorAll('.timeline__block');
					allTimelineBlocks.forEach((block) => {
						block.classList.add('animated');
					});
					break;
				case 'contact':
					document.querySelector('.footer').classList.add('animated');
					break;
				default:
					break;
			}
		}
	});
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => {
	observer.observe(section);
});

postMenuFilters.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		e.preventDefault();
		const currentFilter = this.getAttribute('href').slice(1);
		const filteredContent = document.querySelectorAll('.all-posts__content');

		for (const menuBtn of postMenuFilters) {
			menuBtn.classList.remove('active');
		}

		this.classList.add('active');

		for (const content of filteredContent) {
			content.classList.add('hidden');

			if (content.id === currentFilter) {
				content.classList.remove('hidden');
			}
		}
	});
});

postLinks.forEach((post) => {
	post.addEventListener('click', function (e) {
		const currentPostMoreInfo = this.closest('.post').querySelector('.post__more-info');
		if (!currentPostMoreInfo) return;

		e.preventDefault();

		currentPostMoreInfo.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});
});

postMoreInfoClose.forEach((close) => {	
	/* postContainer.addEventListener('click', function(e) {
		const clickedElement = e.target;
		if (!clickedElement.closest('.post')) return;
		
		const parentPost = clickedElement.closest('.post');
		const postLink = clickedElement.closest('.post').querySelector('.post__link');
		const currentPostMoreInfo = parentPost.querySelector('.post__more-info');
		const clickedOnClosingPost = clickedElement.classList.contains('post__wrapper');
		
		if (clickedOnClosingPost) {
			currentPostMoreInfo.style.display = 'none';
			document.body.style.overflow = 'scroll';
			postLink.focus();
		}
	}); */

	close.addEventListener('click', function(e) {
		const parentPost = close.closest('.post');
		const postLink = parentPost.querySelector('.post__link');
		const currentPostMoreInfo = parentPost.querySelector('.post__more-info');
		
		currentPostMoreInfo.style.display = 'none';
		document.body.style.overflow = 'scroll';
		postLink.focus();
	});
});
