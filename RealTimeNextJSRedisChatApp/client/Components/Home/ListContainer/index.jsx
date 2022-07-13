import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer";

const ListContainer = (props) => {

    //Destructing the props object to get the props in variables
    const { id, title, isPublic, category, description, userWhoCreated, timeCreated, userWhoCommented, listingList, setListingList } = props;

    //Setting the state of the component
    const [commentsList, setCommentsList] = useState([]);
    const [commentsListLoading, setCommentsListLoading] = useState(true);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchDataComments();

        // setLoggedInUserData(loggedUserData);
    }, []);

    function fetchDataComments() {
        if (typeof window !== "undefined") {
            (async () => {
                const response = await fetch('http://localhost:8000/comment/', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    }
                });
                const content = await response.json();
                setCommentsList(content);
            })();
        }
    }

    // const [isEdit, setIsEdit] = useState(false);
    // const [editValue, setEditValue] = useState(title);

    //Methods
    // const triggerUpdateToCloud = async (uniqueId, type) => {
    //     if (editValue !== "") {
    //         if (type === "markComplete") {
    //             // alert(`Triggering Update to Cloud with the value: ${editValue}`);
    //             await fetch(`http://localhost:8000/todo/${uniqueId}`, {
    //                 method: "PUT",
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     completed: !completed,
    //                     title: editValue,
    //                     timeSubmitted: timeSubmitted
    //                 })
    //             });
    //             let tempList = []
    //             for (let i = 0; i < todoList.length; i++) {
    //                 let tempObj = todoList[i];
    //                 if (todoList[i].id === uniqueId) {
    //                     tempObj = { ...tempObj, completed: !completed }
    //                 }
    //                 tempList.push(tempObj);
    //             }
    //             setTodoList(tempList);
    //             setIsEdit(false);
    //         }
    //         else if (type === 'triggerUpdate') {
    //             const response = await fetch(`http://localhost:8000/todo/${uniqueId}`, {
    //                 method: "PUT",
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     completed: completed,
    //                     title: editValue,
    //                     timeSubmitted: new Date().toLocaleString()
    //                 })
    //             });
    //             let tempList = []
    //             for (let i = 0; i < todoList.length; i++) {
    //                 let tempObj = todoList[i];
    //                 if (todoList[i].id === uniqueId) {
    //                     tempObj = { ...tempObj, title: editValue }
    //                 }
    //                 tempList.push(tempObj);
    //             }
    //             setTodoList(tempList);
    //             setIsEdit(false);
    //         }
    //         else {
    //             console.warn("Please look at your function arguements.Make them correct.")
    //         }
    //     }
    //     else {
    //         alert("Please enter a value to update");
    //     }
    // }

    const deleteListing = async uniqueId => {
        if (userWhoCommented !== null) {
            if (window.confirm('Are you sure you want to delete this task?')) {
                await fetch(`http://localhost:8000/listing/${uniqueId}`, {
                    method: 'DELETE'
                });
                // listingList
                setListingList(listingList.filter(l => l.id !== uniqueId));
            }
        }
        else {
            alert("You are not authorized to delete this listing. Please register or login to delete this listing.");
        }
    }

    const postComment = async (event, Lid) => {
        event.preventDefault();

        if (comment !== "") {
            if (userWhoCommented !== null) {
                event.preventDefault();
                const response = await fetch('http://localhost:8000/comment', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        // comment.listingID = req.body.listingID;
                        // comment.comment = req.body.comment;
                        // comment.userWhoCommented = req.body.userWhoCommented;
                        // comment.timeCommented = req.body.timeCommented;
                        listingID: id,
                        comment: comment,
                        userWhoCommented: userWhoCommented,
                        timeCommented: new Date().toLocaleString()
                    })
                }).catch(err => {
                    alert("Error Occured While posting comment ==> " + err);
                    console.log("Error Occured While posting comment ==> ", err);
                })

                // Fetch the one comment data from the API after the POST request
                const comments = await response.json();

                alert("Comment Added Successfully with Lid=> " + Lid);
                setCommentsList([...commentsList, comments]);
                setComment("");
            }
            else {
                alert("Please login to post the comment");
            }
        } else {
            alert('Please fill all the fields to add a new comment to the the list');
        }
    }

    return (
        <div className="todoList">
            <h4><b>The id of the listing</b> : {id}</h4>
            <h4><b>The title of the listing</b> : {title}</h4>
            <h4><b>The listing is public</b> : {isPublic.toLocaleString()}</h4>
            <h4><b>The category of the listing</b> : {category}</h4>
            <h4><b>The description of the listing</b> : {description}</h4>
            <h4><b>The user who created the listing</b> : {userWhoCreated}</h4>
            <h4><b>The time the listing was created</b> : {timeCreated}</h4>

            <section className="d-flex justify-content-center">
                <button className="btn btn-danger mt-2" style={{ letterSpacing: 3 }} onClick={() => deleteListing(id)}>Delete Listing</button>
            </section>

            <section className="text-left commentSection">
                <h3 className="text-info text-center">Comments</h3>
                <div className="text-center">
                    <textarea className="form-control" name="reply" cols="30" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" placeholder="Enter the reply here for the listing"></textarea>
                    <button className="btn btn-success mt-4 mb-4" onClick={(e) => postComment(e, id)}>Add Reply</button>
                </div>
                {(commentsList.length !== 0) ? (
                    <>
                        {commentsList.map((comment, index) => {
                            return (
                                <div key={index}>
                                    {(comment.listingID === id) ? (
                                        <CommentContainer
                                            listingID={comment.listingID}
                                            comment={comment.comment}
                                            userWhoCommented={comment.userWhoCommented}
                                            timeCommented={comment.timeCommented}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>
                        <h3 className="text-danger text-center mt-4">There are no comments on this listing yet</h3>
                    </>
                )}
            </section>
        </div>
    )
}
export default ListContainer;