import { elementClass } from './helpers.js';


export default function layout() {

  const container = elementClass('div', 'container');
  const header = elementClass('div', 'header');
  const sidebar = elementClass('div', 'sidebar');
  const main = elementClass('div', 'main-section');

  container.appendChild(header);
  container.appendChild(sidebar);
  container.appendChild(main);

  return container;
}
      
