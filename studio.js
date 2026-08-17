const navButtons = document.querySelectorAll('.studio-nav button[data-view]');
const views = document.querySelectorAll('.view');
const pageTitle = document.querySelector('[data-page-title]');
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

const now = new Date();
const overviewDate = document.querySelector('#overview .page-intro > div > p');
const overviewGreeting = document.querySelector('#overview .page-intro > div > h1');
const nextEventLabel = document.querySelector('.next-event .panel-head strong');

if (overviewDate) {
  const formatted = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(now);
  overviewDate.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

if (overviewGreeting) {
  const hour = now.getHours();
  overviewGreeting.textContent = hour < 13 ? 'Buenos días.' : hour < 20 ? 'Buenas tardes.' : 'Buenas noches.';
}

if (nextEventLabel) nextEventLabel.textContent = 'Sábado · 22 ago';

function showView(id) {
  views.forEach((view) => view.classList.toggle('active', view.id === id));
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.view === id));
  const active = document.getElementById(id);
  if (pageTitle && active) pageTitle.textContent = active.dataset.title || 'Studio';
  sidebar?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navButtons.forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.jump)));
sidebarToggle?.addEventListener('click', () => sidebar?.classList.toggle('open'));

const miniCalendar = document.querySelector('#mini-calendar');
const miniDays = [27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6];
if (miniCalendar) {
  miniDays.forEach((day, index) => {
    const span = document.createElement('span');
    span.textContent = day;
    if (index < 5 || index > 35) span.classList.add('muted');
    if ([12, 19, 26, 33].includes(index)) span.classList.add('event');
    miniCalendar.appendChild(span);
  });
}

const calendarGrid = document.querySelector('#calendar-grid');
const largeDays = [27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6];
const events = {
  12: ['Boda · Marta & José', 'wedding'],
  18: ['Evento privado', 'private'],
  22: ['Boda · Elena & Álvaro', 'wedding'],
  29: ['Comunión · Familia Ruiz', 'private']
};
if (calendarGrid) {
  largeDays.forEach((day, index) => {
    const cell = document.createElement('div');
    cell.className = 'day';
    if (index < 5 || index > 35) cell.classList.add('muted');
    cell.append(String(day));
    if (index >= 5 && index <= 35 && events[day]) {
      const event = document.createElement('div');
      event.className = `calendar-event ${events[day][1] === 'private' ? 'private' : ''}`;
      event.textContent = events[day][0];
      cell.appendChild(event);
    }
    calendarGrid.appendChild(cell);
  });
}
