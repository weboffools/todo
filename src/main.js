import { format } from 'date-fns';
import makeDiv from './helpers.js';

export default function mainSection() {
  const headingMain = makeDiv('main-heading');
  const headingTitle = makeDiv('main-heading-title');
  headingTitle.textContent = 'Today';
  const headingDate = makeDiv('main-heading-date');
  headingDate.textContent = format(new Date(), 'MMMM dd, yyyy');

  headingMain.appendChild(headingTitle);
  headingMain.appendChild(headingDate);

  return headingMain;
}
