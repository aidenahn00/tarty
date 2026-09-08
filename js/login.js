document.addEventListener('DOMContentLoaded', () => {
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
// Login UI only: connect a real authentication service before enabling sign-in.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');
    const username = document.querySelector('#login-id');
    const password = document.querySelector('#login-password');
    const remember = document.querySelector('#login-remember');
    const status = document.querySelector('#login-status');
    const toggle = document.querySelector('.login-password-toggle');
    const storageKey = 'tarty.login.username';

    try {
        username.value = localStorage.getItem(storageKey) || '';
        remember.checked = Boolean(username.value);
    } catch (_) { /* Storage may be disabled by the browser. */ }

    remember.addEventListener('change', () => {
        if (!remember.checked) {
            try { localStorage.removeItem(storageKey); } catch (_) {}
        }
    });
    toggle.addEventListener('click', () => {
        const visible = password.type === 'password';
        password.type = visible ? 'text' : 'password';
        toggle.textContent = visible ? '숨기기' : '보기';
        toggle.setAttribute('aria-pressed', String(visible));
    });
    [username, password].forEach(input => {
        input.addEventListener('input', () => {
            input.removeAttribute('aria-invalid');
            document.getElementById(input.getAttribute('aria-describedby')).textContent = '';
            status.textContent = '';
        });
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        status.textContent = '';
        let firstInvalid = null;
        [username, password].forEach(input => {
            const invalid = input === username ? !input.value.trim() : !input.value;
            input.setAttribute('aria-invalid', String(invalid));
            document.getElementById(input.getAttribute('aria-describedby')).textContent =
                invalid ? (input === username ? '아이디를 입력해 주세요.' : '비밀번호를 입력해 주세요.') : '';
            if (invalid && !firstInvalid) firstInvalid = input;
        });
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }
        try {
            if (remember.checked) localStorage.setItem(storageKey, username.value.trim());
            else localStorage.removeItem(storageKey);
        } catch (_) {}
        status.textContent = '현재 로그인 서비스를 준비하고 있어요. 서비스가 연결되면 로그인할 수 있습니다.';
    });
    document.querySelectorAll('[data-login-help]').forEach(button => {
        button.addEventListener('click', () => {
            status.textContent = button.dataset.loginHelp + ' 서비스를 준비하고 있어요. 이용 문의는 고객센터 1644-4321로 연락해 주세요.';
        });
    });
});