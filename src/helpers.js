import plusCircleOutline from './images/plus-circle-outline.svg';

const elementClass = (element, css) => {
  const elem = document.createElement(element);
  elem.classList.add(css);

  return elem;
};

function addTask() {
  const div = elementClass('div', 'add-task');
  const text = elementClass('div', 'add-task-text');
  const plus = elementClass('div', 'add-task-plus');

  text.textContent = 'Add task';

  div.appendChild(plus);
  div.appendChild(text);

  return div;

}

export { elementClass, addTask };
