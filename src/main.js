import { format, add } from 'date-fns';
import { elementClass } from './helpers.js';

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

  let divArray = [];

  for (let i = 0; i < 5; i++) {
    let day = elementClass('div', `day-${i}`);
    day.classList.add('day');
    let today = new Date();

    let dayHead = elementClass('div', `day-${i}-head`);
    dayHead.textContent = format(add(today, {days: `${i}`}), 'EE, MMM, do');
    let dayBody = elementClass('div', `day-${i}-body`);
    day.appendChild(dayHead);
    
    day.appendChild(dayBody);
    divArray.push(day);
    container.appendChild(day);
  }

  return container;
  
}

export { Today, Upcoming };
