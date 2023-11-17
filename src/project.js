import { v4 as uuidv4 } from 'uuid';

class Project {
  _id = uuidv4().slice(24);
  tasks = [];

  constructor(name) {
    this.name = name;
  }

  get fullKey() {
    return `${this.name}_${this._id}`;
  }

  addTask(task) {
    this.tasks.push(task);
  }

}

export default Project;

