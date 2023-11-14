import makeDiv from './helpers.js';


export default function layout() {

  const container = makeDiv('container');
  const header = makeDiv('header');
  const sidebar = makeDiv('sidebar');
  const main = makeDiv('main-section');

  container.appendChild(header);
  container.appendChild(sidebar);
  container.appendChild(main);

  return container;
}
      
