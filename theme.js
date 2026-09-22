(() => {
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  document.body.appendChild(button);
  const apply = light => {
    document.body.classList.toggle('light-theme', light);
    button.textContent = light ? '☾ Modo oscuro' : '☀ Modo claro';
    localStorage.mroLightTheme = light ? 'yes' : 'no';
  };
  apply(localStorage.mroLightTheme ? localStorage.mroLightTheme === 'yes' : window.innerWidth <= 800);
  button.onclick = () => apply(!document.body.classList.contains('light-theme'));
})();
