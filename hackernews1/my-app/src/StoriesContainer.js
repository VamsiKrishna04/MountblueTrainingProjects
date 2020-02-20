import React from 'react';
import Story from './Story'

class StoriesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            selectedStoryId: null,
        };
    }

    handleStorySelect = (id) => {
        this.setState({
            selectedStoryId: this.state.stories.find((story) => story.item_id === id).item_id
        },
            () => {
                console.log("Id in State updated", this.state.selectedStoryId);
            }
        );
    };


    handleIncrement = (storyId) => {
        this.setState({
            selectedStoryId: this.state.stories.find((story) => story.item_id === storyId).item_id,
        },
            () => {
                //console.log("Incrementing");
                this.setState({
                    stories: this.state.stories.map((story) => {
                        if (story.item_id === storyId) {
                            return {
                                ...story,
                                score: story.score + 1
                            }
                        }
                        return story;
                    })
                })
            });
    };

    handleDecrement = (storyId) => {
        this.setState({
            selectedStoryId: this.state.stories.find((story) => story.item_id === storyId).item_id,
        },
            () => {
                this.setState({
                    stories: this.state.stories.map((story) => {
                        if (story.item_id === storyId) {
                            return {
                                ...story,
                                score: story.score - 1
                            }
                        }
                        return story;
                    })
                })
            });
    };


    componentDidMount() {
        fetch("hn_data/stories.json")
            .then(res => res.json())
            .then(data => this.setState({
                stories: data,
            }))
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <h1>List Of Stories</h1>
                    {
                        this.state.stories.map((story, index) => {
                            return <Story
                                key={story.item_id}
                                index={index + 1}
                                onSelect={this.handleStorySelect}
                                onIncrement={this.handleIncrement}
                                onDecrement={this.handleDecrement}
                                {...story}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}


export default StoriesContainer;
