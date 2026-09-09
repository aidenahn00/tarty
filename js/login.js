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