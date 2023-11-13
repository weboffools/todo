export default function homePage() {

  function makeDiv(css) {

    let div = document.createElement('div');
    div.classList.add(css);

    return div;
  }

  const container = makeDiv('home-container');
  const header = makeDiv('header');
  const sidebar = makeDiv('sidebar');
  const main = makeDiv('main-section');

  container.appendChild(header);
  container.appendChild(sidebar);
  container.appendChild(main);

  return container;
}
      
