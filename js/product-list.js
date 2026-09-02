document.addEventListener('DOMContentLoaded', () => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const productImages = document.querySelectorAll('.menu-card > img');
    const tabs = document.querySelectorAll('.size-tabs button');
    const cards = document.querySelectorAll('.menu-card');
    const emptyMessage = document.querySelector('.empty-message');

    productImages.forEach((image) => {
        image.dataset.tabletSrc = image.dataset.padSrc;
        const mobileSource = image.dataset.pcSrc?.replace(/\.png$/, '-2.png');
        if (mobileSource && !mobileSource.endsWith('tart15-2.png')) image.dataset.mobileSrc = mobileSource;
    });

    const updateMobileImages = () => {
        productImages.forEach((image) => {
            if (mobileQuery.matches && image.dataset.mobileSrc) {
                image.src = image.dataset.mobileSrc;
            } else if (window.innerWidth <= 1024) {
                image.src = image.dataset.tabletSrc;
            } else {
                image.src = image.dataset.pcSrc;
            }
        });
    };

    updateMobileImages();
    mobileQuery.addEventListener('change', updateMobileImages);

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((item) => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', String(active));
            });

            let visibleCount = 0;
            cards.forEach((card) => {
                const visible = card.dataset.size === tab.dataset.size;
                card.hidden = !visible;
                if (visible) visibleCount += 1;
            });
            emptyMessage.hidden = visibleCount > 0;
        });
    });
});
