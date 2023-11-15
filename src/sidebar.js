import { elementClass } from './helpers.js';

function Sidebar() {
  const list = elementClass('ul', 'side-menu');
  const today = elementClass('li', 'today-item');
  today.textContent = 'Today';
  const upcoming = elementClass('li', 'upcoming-item');
  upcoming.textContent = 'Upcoming';
  const allTasks = elementClass('li', 'all-tasks');
  allTasks.textContent = 'All Tasks';

  for (let item of [today, upcoming, allTasks]) {
    list.appendChild(item);
  }

  return { list, today, upcoming, allTasks };
}

export default Sidebar;
