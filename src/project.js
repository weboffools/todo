import { v4 as uuidv4 } from 'uuid';

function Project(name, due) {
  let obj = {
    _id: uuidv4(),
    name: name,
    dueDate: due,
    tasks: [],
  };

  return obj;
}

export default Project;

