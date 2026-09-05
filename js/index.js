document.addEventListener('DOMContentLoaded', () => {
    const padImageQuery = window.matchMedia('(max-width: 1024px)');
    const mobileImageQuery = window.matchMedia('(max-width: 768px)');
    const responsiveImages = document.querySelectorAll('img[data-pad-src]');

    responsiveImages.forEach((image) => {
        image.dataset.pcSrc = image.getAttribute('src');
    });

    const updateResponsiveImages = () => {
        responsiveImages.forEach((image) => {
            const source = mobileImageQuery.matches && image.dataset.moSrc
                ? image.dataset.moSrc
                : padImageQuery.matches
                    ? image.dataset.padSrc
                    : image.dataset.pcSrc;

            image.setAttribute('src', source);
        });
    };

    updateResponsiveImages();
    padImageQuery.addEventListener('change', updateResponsiveImages);
    mobileImageQuery.addEventListener('change', updateResponsiveImages);

    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const backdrop = document.querySelector('.menu-backdrop');
    const sidebarClose = document.querySelector('.sidebar-close');
    const profileButton = document.querySelector('.profile-action');
    const accountPanel = document.querySelector('.account-panel');
    const accountPanelClose = document.querySelector('.account-panel-close');
    const submenuButtons = mainNav?.querySelectorAll('.submenu-toggle') || [];

    if (!header || !menuButton || !mainNav) return;

    const closeMenu = () => {
        header.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '메뉴 열기');
        document.body.classList.remove('menu-open');
    };

    const closeAccount = () => {
        header.classList.remove('account-open');
        profileButton?.setAttribute('aria-expanded', 'false');
        profileButton?.setAttribute('aria-label', '회원 메뉴 열기');
        accountPanel?.setAttribute('inert', '');
        document.body.classList.remove('account-open');
    };

    menuButton.addEventListener('click', () => {
        const willOpen = !header.classList.contains('menu-open');
        closeAccount();
        header.classList.toggle('menu-open', willOpen);
        menuButton.setAttribute('aria-expanded', String(willOpen));
        menuButton.setAttribute('aria-label', willOpen ? '메뉴 닫기' : '메뉴 열기');
        document.body.classList.toggle('menu-open', willOpen);
    });

    profileButton?.addEventListener('click', () => {
        if (window.innerWidth > 1024) return;

        const willOpen = !header.classList.contains('account-open');
        closeMenu();
        header.classList.toggle('account-open', willOpen);
        profileButton.setAttribute('aria-expanded', String(willOpen));
        profileButton.setAttribute('aria-label', willOpen ? '회원 메뉴 닫기' : '회원 메뉴 열기');
        accountPanel?.toggleAttribute('inert', !willOpen);
        document.body.classList.toggle('account-open', willOpen);
    });

    submenuButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const item = button.closest('.nav-item');
            const willExpand = !item.classList.contains('is-expanded');

            submenuButtons.forEach((otherButton) => {
                if (otherButton === button) return;

                otherButton.closest('.nav-item').classList.remove('is-expanded');
                otherButton.setAttribute('aria-expanded', 'false');
                otherButton.setAttribute('aria-label', `${otherButton.closest('.nav-item').querySelector(':scope > a').textContent.trim()} 하위 메뉴 펼치기`);
            });

            item.classList.toggle('is-expanded', willExpand);
            button.setAttribute('aria-expanded', String(willExpand));
            button.setAttribute('aria-label', `${item.querySelector(':scope > a').textContent.trim()} 하위 메뉴 ${willExpand ? '접기' : '펼치기'}`);
        });
    });

    backdrop?.addEventListener('click', () => {
        closeMenu();
        closeAccount();
    });
    sidebarClose?.addEventListener('click', closeMenu);
    accountPanelClose?.addEventListener('click', closeAccount);

    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
            closeAccount();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
            closeAccount();
        }
    });
});

const header = document.querySelector('.site-header');
const mainMenu = document.querySelectorAll('.main-nav>ul>li');

mainMenu.forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
        header.style.borderBottom = '1px solid #fff';
    });
    el.addEventListener('mouseleave', ()=>{
        header.style.borderBottom = '1px solid var(--gray-300)';
    });
});