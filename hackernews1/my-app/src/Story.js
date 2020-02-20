import React from 'react';
import { Route, Link } from 'react-router-dom'
import Comments from './Comments'
const User = ({ match }) => <p>{match.params.id}</p>

function Story({ title, index, score, onSelect, item_id, onIncrement, onDecrement }) {
    const commentLink = "/comments/" + item_id;
    return (
        <>
            {/* <Comments/> */}
            <div className="row">
                <div className="col-md-12">
                    <p onClick={() => onSelect(item_id)}>{index}.{title}</p>
                    <button type="button" className="btn btn-primary">
                        Score <span className="badge badge-light">{score}</span>
                    </button>
                    <button type="button" className="btn btn-success" onClick={() => onIncrement(item_id)}>Upvote</button>
                    <button type="button" className="btn btn-warning" onClick={() => onDecrement(item_id)}>Downvote</button>
                    <Link to={commentLink} >Comments</Link>
                    <Route path="/comments/:id" component={Comments} />
                </div>
            </div>
        </>
    );
}

export default Story;