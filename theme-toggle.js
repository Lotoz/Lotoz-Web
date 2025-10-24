(function(){
  const btn = document.getElementById('toggleTheme');
  const icon = document.getElementById('themeIcon');
  const link = document.getElementById('theme-stylesheet');
  //Ficheros de estilo
  const LIGHT = 'styles.css';
  const DARK = 'stylesDark.css';

  function setTheme(name){
    if(!link) return;
    link.href = name === 'light' ? LIGHT : DARK;
    localStorage.setItem('site-theme', name);
    if(icon){
      icon.className = (name === 'light') ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    // letra accesible
    if(btn){
      btn.setAttribute('aria-pressed', name === 'dark');
    }
  }

  // iniciamos desde localStorage
  const saved = localStorage.getItem('site-theme');
  if(saved){
    setTheme(saved);
  } else {
    // Si es el style es oscuro, lo deja oscuro, si no, claro
    const cur = link ? link.getAttribute('href') : '';
    setTheme(cur && cur.toLowerCase().includes('dark') ? 'dark' : 'light');
  }

  if(btn){
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('site-theme') || (link && link.getAttribute('href') && link.getAttribute('href').toLowerCase().includes('dark') ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
})();