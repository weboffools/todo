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

  function getTasks() {
    let tasks = getStore()
      .map((entry) => JSON.parse(entry[1]))
      .filter((obj) => obj['type'] === 'task');
    return tasks;
  }

  function getProjects() {
    let projects = getStore()
      .map((entry) => JSON.parse(entry[1]))
      .filter((obj) => obj['type'] === 'project');
    return projects;
  }

  function addTaskToProject(project, task) {
    
    let p = JSON.parse(localStorage.getItem(project));
    p.tasks.push(task);
    localStorage.setItem(project, JSON.stringify(p));
    return;
  }

  function removeTaskFromProject(key) {
    let project = JSON.parse(localStorage.getItem(key));
    const index = project.tasks.indexOf(key);
    project.tasks.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(project));
        
    return;
    
  }
    
  function getNumTasksInProject() {
    let projects = getProjects();
    return projects[0].tasks.length;
  }

  function getTasksInProject(key) {
    let project = JSON.parse(localStorage.getItem(key));
    return project.tasks;
  }

  return {
    initStore,
    addToStore,
    storageLookup,
    getStore,
    getTasks,
    getProjects,
    addTaskToProject,
    removeTaskFromProject,
    getNumTasksInProject,
    getTasksInProject,
  };
}

export default ManageStorage;
