document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!header || !menuButton || !mainNav) return;

    const closeMenu = () => {
        header.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '메뉴 열기');
    };

    menuButton.addEventListener('click', () => {
        const willOpen = !header.classList.contains('menu-open');
        header.classList.toggle('menu-open', willOpen);
        menuButton.setAttribute('aria-expanded', String(willOpen));
        menuButton.setAttribute('aria-label', willOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
            menuButton.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) closeMenu();
    });
});
