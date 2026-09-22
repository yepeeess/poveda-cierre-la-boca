(() => {
  const toggle = document.createElement('button');
  toggle.className = 'mobile-options';
  toggle.innerHTML = '☰ <span>Opciones</span>';
  const panel = document.createElement('aside');
  panel.className = 'mobile-options-panel';
  const title = document.createElement('strong');
  title.textContent = 'Opciones';
  const close = document.createElement('button');
  close.textContent = '×';
  close.className = 'mobile-close';
  panel.append(title, close);
  document.body.append(toggle, panel);
  document.querySelectorAll('#nav [data-nav]').forEach(item => {
    const option = document.createElement('button');
    option.textContent = item.textContent.trim();
    option.onclick = () => { item.click(); panel.classList.remove('open'); };
    panel.appendChild(option);
  });
  const more = document.createElement('button');
  more.className = 'mobile-more';
  more.innerHTML = '<b>•••</b><span>Más</span>';
  document.querySelector('#bottom')?.appendChild(more);
  document.querySelectorAll('#bottom [data-nav]').forEach(button => {
    button.onclick = () => window.go(button.dataset.nav);
  });
  more.onclick = () => panel.classList.toggle('open');
  toggle.onclick = () => panel.classList.toggle('open');
  close.onclick = () => panel.classList.remove('open');
})();
