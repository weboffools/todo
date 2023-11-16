import { v4 as uuidv4 } from 'uuid';

function storagePush(e) {
  const id = uuidv4();
  let task = {
    name: e.target.task_name.value,
    descr: e.target.task_descr.value,
    date: e.target.due_date.value,
  };
  localStorage.setItem(id, JSON.stringify(task));
}

function storageLookup() {
  let entries = Object.entries(localStorage);
  let search = 'Laundry';
  let type = 'name';
  let map = entries.map((entry) => JSON.parse(entry[1])).filter(obj => obj[type] === search);
  console.log(map);
}

export { storagePush, storageLookup };
