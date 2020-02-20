import React from 'react';
//<p>by {comment.by}</p>
function CommentDetails({ comment }) {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <p>{comment.text}</p>
                </div>
            </div>
        </>
    )
}

export default CommentDetails;

