function Task(name, description, dueDate, priority ) {
  let obj = {
    name: name,
    description: description,
    due: dueDate,
    priority: priority,
  };

  return obj;
}

export default Task;
