import { useState } from "react";

const TodoList = (props) => {

    // todo.title = req.body.title;
    // todo.timeSubmitted = new Date().toLocaleString();
    // todo.completed = false;
    //Destructing the props object to get the props in variables
    const { id, index, title, completed, timeSubmitted, setTodoList, todoList, isCompleted, setIsCompleted } = props;

    const [isEdit, setIsEdit] = useState(false);

    const [editValue, setEditValue] = useState(title);

    //Methods
    const triggerUpdateToCloud = async (uniqueId, type) => {
        if (editValue !== "") {
            if (type === "markComplete") {
                // alert(`Triggering Update to Cloud with the value: ${editValue}`);
                await fetch(`http://localhost:8000/todo/${uniqueId}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        completed: !completed,
                        title: editValue,
                        timeSubmitted: new Date().toLocaleString()
                    })
                });
                let tempList = []
                for (let i = 0; i < todoList.length; i++) {
                    let tempObj = todoList[i];
                    if (todoList[i].id === uniqueId) {
                        tempObj = { ...tempObj, completed: !completed }
                    }
                    tempList.push(tempObj);
                }
                setTodoList(tempList);
                setIsEdit(false);
            }
            else if (type === 'triggerUpdate') {
                const response = await fetch(`http://localhost:8000/todo/${uniqueId}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        completed: completed,
                        title: editValue,
                        timeSubmitted: timeSubmitted
                    })
                });
                let tempList = []
                for (let i = 0; i < todoList.length; i++) {
                    let tempObj = todoList[i];
                    if (todoList[i].id === uniqueId) {
                        tempObj = { ...tempObj, title: editValue }
                    }
                    tempList.push(tempObj);
                }
                setTodoList(tempList);
                setIsEdit(false);
            }
            else {
                console.warn("Please look at your function arguements.Make them correct.")
            }
        }
        else {
            alert("Please enter a value to update");
        }
    }

    const deleteTodo = async uniqueId => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await fetch(`http://localhost:8000/todo/${uniqueId}`, {
                method: 'DELETE'
            });

            setTodoList(todoList.filter(t => t.id !== uniqueId));
        }
    }

    return (
        <div className="todoList">
            {(todoList.length !== 0) ? (
                <div>
                    <div>
                        {
                            (isEdit) ? (
                                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="form-control" />
                            ) : (
                                (!completed) ? (
                                    <h3>
                                        {index + 1}- {title}
                                    </h3>
                                ) : (
                                    <h3 className="text-success">
                                        <del>{index + 1}- {title}</del>
                                    </h3>
                                ))
                        }
                    </div>
                    <div className="d-flex mt-4 justify-content-between">
                        <h6 className="mt-2">{timeSubmitted}</h6>
                        <div className="d-flex justify-content-between">
                            {
                                (!isEdit) ? (
                                    <button style={{ marginRight: "10px" }} className="btn btn-warning" onClick={() => setIsEdit(true)}>Edit</button>
                                ) : (
                                    <button style={{ marginRight: "10px" }} className="btn btn-success" onClick={() => triggerUpdateToCloud(id, "triggerUpdate")}>Update</button>
                                )
                            }
                            <button style={{ marginRight: "10px" }} className="btn btn-danger" onClick={() => deleteTodo(id)}>Delete</button>
                            {
                                (!completed) ? (
                                    <button className="btn btn-success" onClick={() => triggerUpdateToCloud(id, "markComplete")}>Mark Complete</button>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => triggerUpdateToCloud(id, "markComplete")}>Mark Incomplete</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <h3 className="text-center">No Tasks to Display</h3>
            )}
        </div>
    )
}
export default TodoList;