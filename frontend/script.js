function showAlert(type, message) {
  const box = document.getElementById('alertBox');
  box.className = `alert alert-${type}`;
  box.textContent = message;
  box.classList.remove('d-none');
}

(function() {
  const pwd = document.getElementById('password');
  const toggle = document.getElementById('togglePwd');
  const icon = toggle.querySelector('i');
  toggle.addEventListener('click', () => {
    const isText = pwd.type === 'text';
    pwd.type = isText ? 'password' : 'text';
    icon.classList.toggle('bi-eye');
    icon.classList.toggle('bi-eye-slash');
    pwd.focus();
  });
})();

(function () {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      showAlert('warning', 'Revisa los campos resaltados.');
      return;
    }

    const user = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;
    const ok = (user === 'admin@demo.com' || user === 'admin') && pass === '123456';

    if (ok) {
      showAlert('success', '¡Bienvenido! Redirigiendo…');
      if (document.getElementById('remember').checked) {
        localStorage.setItem('session_demo', JSON.stringify({ user, ts: Date.now() }));
      } else {
        sessionStorage.setItem('session_demo', JSON.stringify({ user, ts: Date.now() }));
      }
      setTimeout(() => { window.location.href = '#dashboard'; }, 1000);
    } else {
      showAlert('danger', 'Credenciales inválidas. Usa admin@demo.com / 123456');
    }
  }, false);
})();