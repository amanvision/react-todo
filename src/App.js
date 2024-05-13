import { useState } from "react";

var initialTodoList = [
  {
    id: 1,
    name: "Complete project proposal",
    description: "Write and finalize the project proposal document",
    status: "incomplete",
    createdAt: "5:06 am, 05/12/2024"
  },
  {
    id: 2,
    name: "Prepare presentation slides",
    description: "Create slides for the project presentation",
    status: "incomplete",
    createdAt: "5:06 am, 05/12/2024"
  },
  {
    id: 3,
    name: "Review code",
    description: "Review and provide feedback on the codebase",
    status: "complete",
    createdAt: "5:06 am, 05/12/2024"
  },
  {
    id: 4,
    name: "Test new feature",
    description: "Test the new feature implementation for bugs",
    status: "incomplete",
    createdAt: "5:06 am, 05/12/2024"
  }
];

// Example usage:
// console.log(initialTodoList);


export default function App() {
  return (
    <div className="App">
      <h1>Todo List 📝</h1>
      <TodoList />
    </div>
  );
}

function TodoList() {
  const [todoLists, setTodoList] = useState(initialTodoList);

  const [showAddTask, setShowAddTask] = useState(false);

  const [filterBy, setFilterBy] = useState("all");

  const [selectedTodo, setSelectedTodo] = useState(null);



  function handleTodoStatus(id) {

    setTodoList(todoLists => todoLists.map(todoList => todoList.id === id ? (todoList.status === "incomplete" ? { ...todoList, status: "complete" } : { ...todoList, status: "incomplete" }) : todoList));

  }

  function handleDeleteTodo(id) {
    setTodoList(todoLists => todoLists.filter(todoList => todoList.id !== id));
  }

  function handleAddTaskBtn() {
    setShowAddTask((show) => !show);
  }

  function handleAddTask(task) {
    setTodoList(tasks => [...tasks, task]);
  }

  function handleUpdatedTodo(id, newTodo) {
    setTodoList(todoLists => todoLists.map(todoList => todoList.id === id ? { ...todoList, ...newTodo } : todoList));

    setSelectedTodo(null);
  }





  function handleSelectedTodo(todoItem) {
    setSelectedTodo((curr) => curr?.id === todoItem.id ? null : todoItem);
    // setSelectedTodo(todoItem);
  }

  let filter;

  if (filterBy === "all") {
    filter = todoLists;
  }

  if (filterBy === "complete") {
    filter = todoLists.filter(todoList => todoList.status === "complete");
    console.log(todoLists.length);
  }

  if (filterBy === "incomplete") {
    filter = todoLists.filter(todoList => todoList.status === "incomplete")
  }


  return (
    <div className="content-width">
      <div className="head-items">
        <div>
          <button onClick={handleAddTaskBtn}>{showAddTask ? "Close" : "Add Task"}</button>
        </div>
        <div>
          <label htmlFor="filter">Filter by status</label>
          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="all">all</option>
            <option value="incomplete">incomplete</option>
            <option value="complete">complete</option>
          </select>
        </div>
      </div>
      {
        showAddTask &&
        <div className="add-todo-form">
          <AddTodoForm onAddTask={handleAddTask} onHandleAddTaskBtn={setShowAddTask} />
        </div>
      }
      <ul className="todo-list">
        {todoLists.length <= 0 ?
          <p className="no-task">No tasks to show 🥲</p>
          :
          filter.map((todo) => <TodoItem todo={todo} key={todo.id} onTodoStatus={handleTodoStatus} onDeleteTodo={handleDeleteTodo} onSelectedTodo={handleSelectedTodo} selectedTodo={selectedTodo} />)
        }
      </ul>
      {selectedTodo &&
        <EditTodoForm selectedTodo={selectedTodo} onUpdateTodo={handleUpdatedTodo} setSelectedTodo={setSelectedTodo} />
      }
    </div >
  )
}

function TodoItem({ todo, onTodoStatus, onDeleteTodo, onSelectedTodo, selectedTodo }) {
  // const [statusCheck, setStatusCheck] = useState("incomplete");

  // function handleStatusCheck(e) {
  //   if (statusCheck === "incomplete") {
  //     setStatusCheck("complete");
  //   } else {
  //     setStatusCheck("incomplete");
  //   }

  // }

  var isChecked = todo.status === "complete" ? "checked" : '';
  return (
    <li className={isChecked}>

      <input type="checkbox" className="checkbox" checked={isChecked} onChange={() => onTodoStatus(todo.id)} />
      <div className="todo-details">
        <h3 className="todo-title-name">{todo.name}</h3>
        <p className="todo-description">{todo.description}</p>
        <span className="todo-date"><>Created At: {todo.createdAt}</></span><br></br>
        {todo.updatAt &&
          <span className="todo-date">
            <p>Edited At:  <strong>{todo.updatAt}</strong></p>
          </span>
        }
      </div>
      <div className="actions">
        <button className="delete" onClick={() => onDeleteTodo(todo.id)}>❌</button>
        <button className="edit" onClick={() => onSelectedTodo(todo)}>✏️</button>
      </div>
    </li >
  )
}

function AddTodoForm({ onAddTask, onHandleAddTaskBtn }) {
  const id = crypto.randomUUID();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");

  function getCurrentTime() {
    var currentDate = new Date();

    // Format the current time
    var formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: true }) + ', ' +
      (currentDate.getMonth() + 1) + '/' +
      currentDate.getDate() + '/' +
      currentDate.getFullYear();

    return formattedTime;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }

    console.log("submitted")

    const newTask = { id: id, name, description, status: status, createdAt: getCurrentTime() };
    console.log(newTask);

    onAddTask(newTask);
    cancleAddTask();
  }

  function cancleAddTask() {
    setName("");
    setDescription("");
    setStatus("incomplete");
    onHandleAddTaskBtn(false);
  }

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <div>
          <label>name</label>
          <input type="text" placeholder="Add Todo" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input type="textarea" placeholder="Add description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} >
            <option value="incomplete">incomplete</option>
            <option value="complete">complete</option>
          </select>
        </div>
        <div className="actions">
          <button className="add-task">Add Task</button>
          <button className="cancel" onClick={cancleAddTask}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

function EditTodoForm({ selectedTodo, onUpdateTodo, setSelectedTodo }) {
  const id = selectedTodo.id;
  const [newName, setNewName] = useState(selectedTodo.name);
  const [newDescription, setNewDescription] = useState(selectedTodo.description);
  const [newStatus, setNewStatus] = useState(selectedTodo.status);
  const createdAt = selectedTodo.createdAt;


  function getCurrentTime() {
    var currentDate = new Date();

    // Format the current time
    var formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: true }) + ', ' +
      (currentDate.getMonth() + 1) + '/' +
      currentDate.getDate() + '/' +
      currentDate.getFullYear();

    return formattedTime;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName || !newDescription) {
      alert("Please fill in all fields");
      return;
    }

    const updatedTodo = { id: id, name: newName, description: newDescription, status: newStatus, createdAt, updatAt: getCurrentTime() };
    console.log(id, updatedTodo);
    onUpdateTodo(id, updatedTodo);
  }
  return (
    <div className="add-todo edit-form">
      <form onSubmit={handleSubmit} >
        <div>
          <label>name</label>
          <input type="text" placeholder="Add Todo" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input type="textarea" placeholder="Add description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </div>
        <div>
          <label>Status</label>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="incomplete">incomplete</option>
            <option value="complete">complete</option>
          </select>
        </div>
        <div className="actions">
          <button className="add-task">Add Task</button>
          <button className="cancel" onClick={(e) => { setSelectedTodo(null) }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}