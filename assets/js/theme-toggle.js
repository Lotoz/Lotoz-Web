const btn = document.getElementById('toggleTheme');
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema guardado
document.documentElement.setAttribute('data-theme', currentTheme);

btn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Cambiar icono opcionalmente
    btn.innerHTML = newTheme === 'light' ? '<i class="bi bi-moon-stars"></i>' : '<i class="bi bi-sun"></i>';
});