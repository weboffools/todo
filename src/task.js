import { v4 as uuidv4 } from 'uuid';

class Task {
  _id = uuidv4().slice(24);
  creation = Date.now();
  type = 'task';

  constructor(name, descr, date, priority, project) {

    this.name = name;
    this.description = descr;
    this.date = date;
    this.priority = priority;
    this.project = project;
  }

  get fullKey() {
    return `${this.name}_${this._id}`;
  }

}

export default Task;
