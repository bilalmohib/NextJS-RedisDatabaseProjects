const CommentContainer = (props) => {
    // listingID={comment.listingID}
    // comment={comment.comment}
    // userWhoCommented={comment.userWhoCommented}
    // timeCommented={comment.timeCommented}
    const { listingID, comment, userWhoCommented, timeCommented } = props;
    return (
        <div className="comment-container">
            <h4 className="comment-header"><b>The listing ID is</b> : {listingID}</h4>
            <h4 className="comment-header"><b>The comment is</b> : {comment}</h4>
            <h4 className="comment-header"><b>The user who commented</b> : {userWhoCommented}</h4>
            <h4 className="comment-header"><b>The time the comment was created</b> : {timeCommented}</h4>
        </div>
    )
}
export default CommentContainer;