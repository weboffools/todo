import { format, add } from 'date-fns';
import { elementClass, addTask } from './helpers.js';

function Today() {
  const headingMain = elementClass('div', 'main-heading');
  const headingTitle = elementClass('div', 'main-heading-title');
  headingTitle.textContent = 'Today';
  const headingDate = elementClass('div', 'main-heading-date');
  headingDate.textContent = format(new Date(), 'EE, MMM do');

  headingMain.appendChild(headingTitle);
  headingMain.appendChild(headingDate);

  return headingMain;
}

function Upcoming() {
  const container = elementClass('div', 'days-container');

  for (let i = 0; i < 5; i++) {
    let day = elementClass('div', `day-${i}`);
    day.classList.add('day');
    let today = new Date();

    let dayHead = elementClass('div', 'day-head');
    let dayHeadDOW = elementClass('div', 'weekday');
    let dayHeadMonthDay = elementClass('div', 'month-day');
    dayHeadDOW.textContent = 
      format(add(today, {days: `${i}`}), 'EEEE');
    dayHeadMonthDay.textContent = 
      format(add(today, {days: `${i}`}), 'MMM dd');
    let dayBody = elementClass('div', `day-${i}-body`);
    dayBody.appendChild(addTask());
    dayHead.appendChild(dayHeadDOW);
    dayHead.appendChild(dayHeadMonthDay);
    day.appendChild(dayHead);
    
    day.appendChild(dayBody);
    container.appendChild(day);
  }

  return container;
  
}

export { Today, Upcoming };
