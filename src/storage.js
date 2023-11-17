import Project from './project.js';

function ManageStorage() {
  const currentStore = Object.entries(localStorage);

  const getStore = () => currentStore;

  function initStore() {
    if (localStorage.length === 0) {
      let defaultStore = Project('Home');

      localStorage.setItem('Home', JSON.stringify(defaultStore));
    }
  }

  function addToStore(key, value) {
    if (localStorage.getItem(key)) {
      console.log('Key exists');
    } else {
      localStorage.setItem(key, value);
    }
  }

  function storagePush(task, project) {
    localStorage.setItem(project.id, JSON.stringify(task));
  }

  function storageLookup(searchString, type) {
    let map = getStore()
      .map((entry) => JSON.parse(entry[1]))
      .filter((obj) => obj[type] === searchString);
    console.log(map);
  }

  return { initStore, addToStore, storagePush, storageLookup, getStore };
}

export default ManageStorage;
