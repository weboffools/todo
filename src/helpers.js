const elementClass = (element, css) => {
  const elem = document.createElement(element);
  elem.classList.add(css);

  return elem;
};

export { elementClass };
