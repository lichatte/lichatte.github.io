const filteredMenuBtns = document.querySelectorAll('.all-posts__menu a');
const filteredPost = document.querySelectorAll('.post__link');

filteredMenuBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const currentFilter = this.getAttribute('href').slice(1);
        const allFilteredContent = document.querySelectorAll('.all-posts__content');

        for (const content of allFilteredContent) {
            // Do something with each element
            if (content.id === currentFilter) {
                setTimeout(() => {
                    content.classList.remove('hidden');
                    content.style.position = "static";
                }, 400);
            } else {
                content.classList.add('hidden');
                setTimeout(() => {
                    content.style.position = "absolute"; 
                }, 400);
            }
        }
    });
});

filteredPost.forEach(post => {
    post.addEventListener('click', function(e) {
        e.preventDefault();

        const currentPostMoreInfo = this.closest('.post').querySelector('.post__more-info');
        currentPostMoreInfo.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

window.addEventListener('click', ({ target }) => {
    const currentPostMoreInfo = target.closest('.post').querySelector('.post__more-info');
    const clickedOnClosingPost = currentPostMoreInfo && target.classList.contains('post__wrapper');
    
    if (clickedOnClosingPost) {
        currentPostMoreInfo.style.display = 'none';
        document.body.style.overflow = 'scroll';
    }
});