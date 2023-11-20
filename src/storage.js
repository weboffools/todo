import Project from './project.js';

function ManageStorage() {
  const currentStore = Object.entries(localStorage);

  const getStore = () => currentStore;

  function initStore() {
    if (localStorage.length === 0) {
      let defaultStore = new Project('Home');
      localStorage.setItem(defaultStore.fullKey, JSON.stringify(defaultStore));
    }
  }

  function addToStore(item) {
    if (item instanceof Project) {
      let projects = getProjects();
      const exists = (project) => project.name === item.name;
      if (projects.some(exists)) {
        alert('Project already exists!');
      } else {
        localStorage.setItem(item.fullKey, JSON.stringify(item));
      }
    } else {
      localStorage.setItem(item.fullKey, JSON.stringify(item));
    }
  }

  function storageLookup(searchString, type) {
    let map = getStore()
      .map((entry) => JSON.parse(entry[1]))
      .filter((obj) => obj[type] === searchString);
    return map;
  }

  function getProjects() {
    let projects = getStore()
      .map((entry) => JSON.parse(entry[1]))
      .filter((obj) => obj['type'] === 'project');
    return projects;
  }

  function addTaskToProject(project, task) {
    let projects = getProjects();
    projects.forEach((p) => {
      if (p.name.toLowerCase() === project) {
        p.tasks.push(task);
        return;
      }
    });
  }
  return {
    initStore,
    addToStore,
    storageLookup,
    getStore,
    getProjects,
    addTaskToProject,
  };
}

export default ManageStorage;
