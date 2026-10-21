const btn = document.getElementById('toggleTheme');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

function updateThemeButton(theme) {
    const isLight = theme === 'light';
    btn.innerHTML = isLight ? '<i class="bi bi-moon-stars"></i>' : '<i class="bi bi-sun"></i>';
    btn.setAttribute('aria-label', isLight ? 'Activar tema oscuro' : 'Activar tema claro');
    btn.title = isLight ? 'Activar tema oscuro' : 'Activar tema claro';
}

updateThemeButton(currentTheme);

btn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});