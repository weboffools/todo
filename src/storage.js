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
    let p = JSON.parse(localStorage
      .getItem(project));
    p.tasks.push(task);
    localStorage.setItem(project, JSON.stringify(p));

    // let projects = getProjects();
    // projects.forEach((p) => {
    //   if (p.name.toLowerCase() === project.toLowerCase()) {
    //     let key = `${p.name}_${p._id}`;
    //     p.tasks.push(task);
    //     localStorage.setItem(key, JSON.stringify(p));
    //     return;
    //   }
    // });
    //
  }

  function removeTaskFromProject(project, taskId) {
    const p = JSON.parse(localStorage
      .getItem(project));
    const index = p.tasks.indexOf(taskId);
    p.tasks.splice(index, 1);
    localStorage.setItem(project, JSON.stringify(p));
  }
    

  function getNumTasksInProject() {
    let projects = getProjects();
    return projects[0].tasks.length;
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
  };
}

export default ManageStorage;
