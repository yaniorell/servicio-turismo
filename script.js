/* --- SERVICIO 2 --- */
// Filtrado de tarjetas de excursiones
const s2Filtros = document.querySelectorAll('.s2-filtros [data-filtro]');
const s2Excursiones = document.querySelectorAll('.s2-excursion');

s2Filtros.forEach((boton) => {
  boton.addEventListener('click', () => {
    s2Filtros.forEach((item) => item.classList.remove('activo'));
    boton.classList.add('activo');

    const filtro = boton.dataset.filtro;
    s2Excursiones.forEach((tarjeta) => {
      tarjeta.hidden = filtro !== 'Todas' && tarjeta.dataset.dificultad !== filtro;
    });
  });
});
