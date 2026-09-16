(() => {
  let registered = localStorage.mroRegistered === 'yes';
  const originalGo = go;
  window.go = function(id) {
    if (!registered && !['inicio', 'registro', 'info'].includes(id)) {
      msg('Regístrate para desbloquear', 'Crea tu perfil para activar agenda, QR, retos, networking y premios.');
      originalGo('registro');
      return;
    }
    originalGo(id);
  };
  document.querySelector('#form')?.addEventListener('submit', () => {
    registered = true;
    localStorage.mroRegistered = 'yes';
    msg('Funciones desbloqueadas', 'Tu perfil activó todas las experiencias de Territorio MRO.');
  }, true);
  document.querySelectorAll('[data-nav]').forEach(button => {
    const destination = button.dataset.nav;
    if (!registered && !['inicio', 'registro', 'info'].includes(destination)) {
      button.style.opacity = '.52';
      button.title = 'Requiere registro';
    }
  });
  const ranking = document.querySelector('#ranking');
  if (ranking) ranking.innerHTML = [
    ['01','María González','TechNova Solutions','2.450'],
    ['02','Andrés Ramírez','InnovaHub','2.150'],
    ['03','Laura Méndez','DataMind','1.980'],
    ['04','Carlos Valencia','Smart Ideas','1.650'],
    ['05','Sofía Martínez','NeuroLab','1.420'],
    ['07','Tú','Perfil de asistente','1.250'],
  ].map(x => '<div class="rank '+(x[1] === 'Tú' ? 'me' : '')+'"><b>'+x[0]+'</b><span>'+x[1]+'<br><small>'+x[2]+'</small></span><em>'+x[3]+' pts</em></div>').join('');

  const sponsors = document.querySelector('#patrocinadores');
  if (sponsors) sponsors.innerHTML = ['Sumatec','TechNova','InnovaHub','CloudWare','DataMind'].map(name =>
    '<article class="card"><div class="sponsor">'+name+'</div><h3>Demo de página '+name+'</h3><p>Soluciones, casos de éxito y contacto del patrocinador.</p><button class="btn">Ver demo</button></article>'
  ).join('');

  const prizes = document.querySelector('#premios');
  if (prizes) prizes.innerHTML = [
    ['1er lugar','Laptop profesional','5.000 puntos'],
    ['2do lugar','Tablet industrial','3.000 puntos'],
    ['3er lugar','Audífonos inalámbricos','2.000 puntos'],
    ['4to lugar','Experiencia VIP','1.500 puntos'],
    ['5to lugar','Gift card tecnológica','1.000 puntos'],
  ].map(x => '<article class="card prize"><span class="eyebrow">'+x[0]+'</span><h2>'+x[1]+'</h2><p>Demo: '+x[2]+' requeridos.</p></article>').join('');

  const game = document.querySelector('#juego');
  if (game) game.onclick = () => {
    const questions = [
      ['¿Qué ayuda a reducir paradas no programadas?', 'Mantenimiento preventivo.', 'Cambiar equipos cada semana', 'Esperar a que el activo falle'],
      ['¿Qué indicador mide el tiempo promedio entre fallas?', 'MTBF: tiempo medio entre fallas.', 'MTTR', 'Inventario mínimo'],
      ['¿Cuál es el primer paso antes de intervenir un equipo?', 'Aplicar bloqueo y etiquetado.', 'Encender el equipo', 'Solicitar un repuesto'],
      ['¿Qué beneficio aporta un inventario MRO ordenado?', 'Disponibilidad de repuestos a tiempo.', 'Más compras urgentes', 'Menos registros'],
      ['¿Para qué sirve una orden de trabajo?', 'Planificar y registrar mantenimiento.', 'Eliminar inspecciones', 'Cambiar el ranking'],
      ['¿Qué se revisa con termografía?', 'Puntos de calor anómalos.', 'El color de los repuestos', 'La agenda del evento'],
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];
    document.querySelector('#pregunta').textContent = q[0];
    document.querySelector('#numero').textContent = '50';
    game.style.display = 'none';
    const holder = game.parentElement;
    holder.querySelectorAll('.quiz-option').forEach(x => x.remove());
    [q[1], q[2], q[3]].sort(() => Math.random() - .5).forEach(answer => {
      const option = document.createElement('button');
      option.className = 'btn quiz-option';
      option.style.margin = '6px 4px';
      option.textContent = answer;
      option.onclick = () => {
        holder.querySelectorAll('.quiz-option').forEach(x => x.disabled = true);
        if (answer === q[1]) {
          option.style.background = '#1d9b58';
          document.querySelector('#pregunta').textContent = '¡Correcto! ' + q[1];
          add(50, 'Respuesta correcta en el desafío relámpago.');
        } else {
          option.style.background = '#87212a';
          document.querySelector('#pregunta').textContent = 'Incorrecto. La respuesta era: ' + q[1];
          msg('Respuesta incorrecta', 'No sumaste puntos. La respuesta correcta era: ' + q[1]);
        }
        game.textContent = 'Nueva pregunta';
        game.style.display = 'inline-block';
      };
      holder.appendChild(option);
    });
  };
})();
