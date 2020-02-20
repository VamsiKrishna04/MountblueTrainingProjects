import React from 'react';
import CommentDetails from './CommentDetails';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }

    // componentDidMount(){
    //     fetch("hn_data/stories.json")
    //     .then(res => res.json())
    //     .then(data => this.setState({
    //         stories: data,
    //     }))
    // }

    componentDidMount() {
        var comments = require(`../public/hn_data/${this.props.match.params.id}.json`);
        //console.log(comments);
        this.setState({
            comments: comments,
        },
            () => {
                console.log("Updated Comments");
                // console.log(this.state.comments);
            }
        );
    }


    addNewComment = (newComment) => {
        console.log(newComment.value);
        const obj = { "text": newComment.value }
        const existingComments = this.state.comments;
        document.getElementById("newComment").value = "";
        existingComments.unshift(obj);
        this.setState({
            comments: existingComments,
        });
    };

    render() {
        // console.log(this.props)
        const { params } = this.props.match;
        const postId = params.id;
        const newCommentValue = document.getElementById("newComment");
        return (
            <>
                <h3>Add New Comment</h3>
                <input type="text" name="newComment" id="newComment" />
                <input type="button" value="Submit" onClick={() => this.addNewComment(newCommentValue)}></input>
                {this.state.comments.map((comment) => {
                    return <CommentDetails
                        comment={comment}
                    />
                })}
            </>
        );
    }
}

export default Comments;