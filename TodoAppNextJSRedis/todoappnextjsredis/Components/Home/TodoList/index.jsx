import { useState } from "react";

const TodoList = (props) => {

    const [isEdit, setIsEdit] = useState(false);

    const [editValue, setEditValue] = useState(props.title);

    //Methods
    const triggerUpdateToCloud = () => {
        if (editValue !== "") {
            alert(`Triggering Update to Cloud with the value: ${editValue}`);
            setIsEdit(false);
        }
        else {
            alert("Please enter a value to update");
        }
    }

    return (
        <div className="todoList">
            <div>
                {isEdit ? (
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="form-control" />
                ) : (
                    <h3>
                        {props.index + 1}- Wake up in the morning
                    </h3>
                )}

            </div>
            <div className="d-flex mt-4 justify-content-between">
                <h6 className="mt-2">Date Added : 6 Jun 2022</h6>
                <div className="d-flex justify-content-between">
                    {(!isEdit) ? (
                        <button style={{ marginRight: "20px" }} className="btn btn-warning" onClick={() => setIsEdit(true)}>Edit</button>
                    ) : (
                        <button style={{ marginRight: "20px" }} className="btn btn-success" onClick={triggerUpdateToCloud}>Update</button>
                    )}

                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div >
    )
}
export default TodoList;