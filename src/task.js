function Task(name, description, dueDate, priority, project ) {
  let obj = {
    name: name,
    description: description,
    due: dueDate,
    priority: priority,
    project: project
  };

  return obj;
}

export default Task;
