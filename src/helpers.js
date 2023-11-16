const elementClass = (element, css) => {
  const elem = document.createElement(element);
  elem.classList.add(css);

  return elem;
};

const inputID = (id, type, name) => {
  const input = document.createElement('input');
  input.setAttribute('id', id);
  input.setAttribute('type', type);
  input.setAttribute('name', name);

  return input;
};

const labelFor = (target, text) => {
  const label = document.createElement('label');
  label.setAttribute('for', target);
  label.textContent = text;

  return label;
};

export { elementClass, inputID, labelFor };
