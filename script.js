// Menú accesible para pantallas pequeñas y desplazamiento suave.
document.addEventListener('DOMContentLoaded', () => {
  const botonMenu = document.querySelector('.menu-toggle');
  const navegacion = document.querySelector('.nav');

  if (botonMenu && navegacion) {
    botonMenu.addEventListener('click', () => {
      const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
      botonMenu.setAttribute('aria-expanded', String(!estaAbierto));
      botonMenu.setAttribute('aria-label', estaAbierto ? 'Abrir menú' : 'Cerrar menú');
      navegacion.classList.toggle('abierto', !estaAbierto);
    });

    navegacion.querySelectorAll('a').forEach((enlace) => {
      enlace.addEventListener('click', () => {
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-label', 'Abrir menú');
        navegacion.classList.remove('abierto');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      const id = enlace.getAttribute('href');
      if (id && id.length > 1) {
        const destino = document.querySelector(id);
        if (destino) {
          evento.preventDefault();
          destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* --- SERVICIO 1 --- */
  const formulario = document.querySelector('.s1-form');
  if (formulario) {
    const mensaje = formulario.querySelector('.s1-confirmacion');
    const campoFecha = formulario.querySelector('[name="fecha"]');
    const hoy = new Date();
    const fechaLocal = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if (campoFecha) campoFecha.min = fechaLocal;

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      if (mensaje) mensaje.textContent = '';

      const datos = new FormData(formulario);
      const nombre = String(datos.get('nombre') || '').trim();
      const correo = String(datos.get('correo') || '').trim();
      const destino = String(datos.get('destino') || '').trim();
      const fecha = String(datos.get('fecha') || '').trim();
      const personas = String(datos.get('personas') || '').trim();
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(fecha) && fecha > fechaLocal;

      if (!nombre || !correo || !destino || !fecha || !personas) {
        if (mensaje) mensaje.textContent = 'Completa todos los campos para enviar tu solicitud.';
        formulario.reportValidity();
        return;
      }
      if (!correoValido) {
        formulario.elements.correo.setCustomValidity('Escribe un correo electrónico válido.');
        formulario.elements.correo.reportValidity();
        formulario.elements.correo.setCustomValidity('');
        if (mensaje) mensaje.textContent = 'Revisa el formato de tu correo electrónico.';
        return;
      }
      if (!fechaValida) {
        formulario.elements.fecha.setCustomValidity('Elige una fecha futura.');
        formulario.elements.fecha.reportValidity();
        formulario.elements.fecha.setCustomValidity('');
        if (mensaje) mensaje.textContent = 'La fecha del viaje debe ser posterior a hoy.';
        return;
      }

      if (mensaje) mensaje.textContent = `¡Gracias, ${nombre}! Recibimos tu solicitud para ${destino}. Nos pondremos en contacto contigo pronto.`;
      formulario.reset();
      if (campoFecha) campoFecha.min = fechaLocal;
    });
  }
  /* --- SERVICIO 2 --- */
});
