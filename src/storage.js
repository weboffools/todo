import { v4 as uuidv4 } from 'uuid';
import Task from './task.js';

function storagePush(e) {
  const id = uuidv4();
  let task = Task(
    e.target.task_name.value,
    e.target.task_descr.value,
    e.target.due_date.value,
    e.target.priority.value,
  );
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
