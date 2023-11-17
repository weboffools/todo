function ManageStorage() {

  function storagePush(task, project) {
    localStorage.setItem(project.id, JSON.stringify(task));
  }

  function storageLookup(searchString, type) {
    let entries = Object.entries(localStorage);
    let map = entries
      .map((entry) => JSON.parse(entry[1]))
      .filter((obj) => obj[type] === searchString);
    console.log(map);
  }

  return { storagePush, storageLookup };
}

export default ManageStorage;
