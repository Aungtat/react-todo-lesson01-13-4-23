import React, { useState } from "react";

const App = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [toEditTodo, SetToEditTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [foundedTask, setFoundedTask] = useState([]);
  const onAddTask = () => {
    if (todoValue) {
      setTodos([
        ...todos,
        {
          id: Math.random(),
          taskName: todoValue,
          isFinished: false,
        },
      ]);
      setTodoValue("");
    }

    setIsSearching(false);
  };

  const onDoneById = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isFinished: !todo.isFinished,
          };
        }

        return todo;
      });
    });
  };

  //delete function
  const onDelete = (id) => {
    //filter todos not to delete
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Edit function
  const onEdit = (id) => {
    //find todos to edit
    const toEdit = todos.find((todo) => todo.id == id);

    setIsEdit(!isEdit);
    setTodoValue(toEdit.taskName);
    SetToEditTodo(toEdit);
  };

  // Done edit function
  const onEditTask = () => {
    const editedTodo = todos.find((todo) => todo.id === toEditTodo.id);
    if (editedTodo) {
      editedTodo.taskName = todoValue;

      setTodoValue("");
      setIsEdit(!isEdit);
    }
  };

  //search task
  const onSearchTask = () => {
    const searchedTodos = todos.filter((todo) =>
      todo.taskName.includes(todoValue)
    );
    setIsSearching(true);
    setTodoValue("");
    setFoundedTask(searchedTodos);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "500px",
        fontSize: "1.5rem",
      }}
    >
      <input
        style={{
          height: "30px",
          width: "50%",
        }}
        type="text"
        value={todoValue}
        onChange={(e) => {
          setTodoValue(e.target.value);
        }}
      />

      {/* check on edit state or on add state */}
      {!isEdit ? (
        <>
          <button
            style={{
              height: "30px",
            }}
            onClick={onAddTask}
          >
            {isSearching ? "Show task" : "Add task"}
          </button>
          <button
            style={{
              height: "30px",
            }}
            onClick={onSearchTask}
          >
            Search task
          </button>
        </>
      ) : (
        <button
          style={{
            height: "30px",
          }}
          onClick={onEditTask}
        >
          DONE
        </button>
      )}

      <div>
        {/* loop todos array */}
        {isSearching &&
          foundedTask.map((todo) => {
            return (
              <div
                key={todo.id}
                style={{
                  margin: "5px",
                  backgroundColor: "green",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* line-through for finish todos */}
                {todo.isFinished && (
                  <span
                    style={{
                      margin: "5px",
                      borderBottom: "1px solid balck",
                      padding: "2px",
                      color: "black",
                      textDecoration: "line-through",
                    }}
                  >
                    {todo.taskName}
                  </span>
                )}

                {!todo.isFinished && (
                  <span
                    style={{
                      margin: "5px",
                      borderBottom: "1px solid balck",
                      padding: "2px",
                    }}
                  >
                    {todo.taskName}
                  </span>
                )}

                <div>
                  <button onClick={() => onDoneById(todo.id)}>
                    {todo.isFinished ? "UNDO" : "DONE"}
                  </button>
                  <button
                    style={{
                      margin: "5px",
                    }}
                    onClick={() => onDelete(todo.id)}
                  >
                    DELETE
                  </button>
                  {!todo.isFinished && (
                    <button
                      style={{
                        margin: "5px",
                      }}
                      onClick={() => onEdit(todo.id)}
                    >
                      EDIT
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        {!isSearching &&
          todos.map((todo) => {
            return (
              <div
                key={todo.id}
                style={{
                  margin: "5px",
                  backgroundColor: "green",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* line-through for finish todos */}
                {todo.isFinished && (
                  <span
                    style={{
                      margin: "5px",
                      borderBottom: "1px solid balck",
                      padding: "2px",
                      color: "black",
                      textDecoration: "line-through",
                    }}
                  >
                    {todo.taskName}
                  </span>
                )}

                {!todo.isFinished && (
                  <span
                    style={{
                      margin: "5px",
                      borderBottom: "1px solid balck",
                      padding: "2px",
                    }}
                  >
                    {todo.taskName}
                  </span>
                )}

                <div>
                  <button onClick={() => onDoneById(todo.id)}>
                    {todo.isFinished ? "UNDO" : "DONE"}
                  </button>
                  <button
                    style={{
                      margin: "5px",
                    }}
                    onClick={() => onDelete(todo.id)}
                  >
                    DELETE
                  </button>
                  {!todo.isFinished && (
                    <button
                      style={{
                        margin: "5px",
                      }}
                      onClick={() => onEdit(todo.id)}
                    >
                      EDIT
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
