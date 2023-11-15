import { format } from 'date-fns';
import { elementClass } from './helpers.js';

export default function mainSection() {
  const headingMain = elementClass('div', 'main-heading');
  const headingTitle = elementClass('div', 'main-heading-title');
  headingTitle.textContent = 'Today';
  const headingDate = elementClass('div', 'main-heading-date');
  headingDate.textContent = format(new Date(), 'EE, MMM io');

  headingMain.appendChild(headingTitle);
  headingMain.appendChild(headingDate);

  return headingMain;
}
