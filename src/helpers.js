export default function makeDiv(css) {
  let div = document.createElement('div');
  div.classList.add(css);

  return div;
}
