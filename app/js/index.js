const postMenuFilters = document.querySelectorAll(".all-posts__menu a");
const postLinks = document.querySelectorAll(".post__link");
const mainMenuAnchors = document.querySelectorAll("menu a");
const sections = document.querySelectorAll("section");

mainMenuAnchors.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		for (const menuBtn of mainMenuAnchors) {
			menuBtn.classList.remove("active");
		}
		this.classList.add("active");
	});
});

const observerOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.4
};

const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Remove 'active' class from all links first
			mainMenuAnchors.forEach((anchor) => {
				anchor.classList.remove("active");
			});

			// Add 'active' class to the link corresponding to the current section
			const currentSectionId = entry.target.id;
			const correspondingLink = document.querySelector(
				`a[href="#${currentSectionId}"]`
			);
			if (correspondingLink) {
				correspondingLink.classList.add("active");
			}
		}
	});
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => {
	observer.observe(section);
});

postMenuFilters.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		e.preventDefault();
		const currentFilter = this.getAttribute("href").slice(1);
		const filteredContent = document.querySelectorAll(
			".all-posts__content"
		);

		for (const menuBtn of postMenuFilters) {
			menuBtn.classList.remove("active");
		}

		this.classList.add("active");

		for (const content of filteredContent) {
			content.classList.add("hidden");

			if (content.id === currentFilter) {
				content.classList.remove("hidden");
			}
		}
	});
});

postLinks.forEach((post) => {
	post.addEventListener("click", function (e) {
		e.preventDefault();

		const currentPostMoreInfo =
			this.closest(".post").querySelector(".post__more-info");
		currentPostMoreInfo.style.display = "flex";
		document.body.style.overflow = "hidden";
	});
});

window.addEventListener("click", ({ target }) => {
    if (!target.closest(".post")) return;

	const currentPostMoreInfo = target.closest(".post").querySelector(".post__more-info");
	const clickedOnClosingPost = currentPostMoreInfo && target.classList.contains("post__wrapper");

	if (clickedOnClosingPost) {
		currentPostMoreInfo.style.display = "none";
		document.body.style.overflow = "scroll";
	}
});
