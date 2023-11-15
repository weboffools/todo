import { elementClass } from './helpers.js';

function Sidebar() {
  const list = elementClass('ul', 'side-menu');
  const today = elementClass('li', 'today-item');
  const upcoming = elementClass('li', 'upcoming-item');
  const allTasks = elementClass('li', 'all-tasks');

  list.appendChild(today);
  list.appendChild(upcoming);
  list.appendChild(allTasks);
  
  return { list, today, upcoming, allTasks };
}

export { Sidebar };

