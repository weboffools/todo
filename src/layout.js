import elementClass from './helpers.js';


export default function layout() {

  const container = elementClass('container');
  const header = elementClass('header');
  const sidebar = elementClass('sidebar');
  const main = elementClass('main-section');

  container.appendChild(header);
  container.appendChild(sidebar);
  container.appendChild(main);

  return container;
}
      
