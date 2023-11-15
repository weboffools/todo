import { elementClass } from './helpers.js';

function Sidebar() {
  const container = elementClass('div', 'side-container');
  const list = elementClass('ul', 'side-menu');

  const today = elementClass('li', 'today-item');
  const upcoming = elementClass('li', 'upcoming-item');
  const allTasks = elementClass('li', 'all-tasks');

  container.appendChild(list);
  list.appendChild(today);
  list.appendChild(upcoming);
  list.appendChild(allTasks);
  
  return { container, today, upcoming, allTasks };
}

export { Sidebar };

