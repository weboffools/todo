const makeDiv = (css) => {
  const div = document.createElement('div');
  div.classList.add(css);

  return div;
};

export { makeDiv };
