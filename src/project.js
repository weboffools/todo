import { v4 as uuidv4 } from 'uuid';

function Project(name) {
  let obj = {
    _id: uuidv4(),
    name: name,
    tasks: [],
  };

  return obj;
}

export default Project;

