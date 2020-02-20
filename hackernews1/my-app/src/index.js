import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Header from './header';
import StoriesContainer from './StoriesContainer';
import Story from './Story';
import Comments from './Comments';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/header" component={Header} />
            <Route exact path="/stories" component={StoriesContainer} />
            <Route exact path="/story" component={Story} />
            <Route path="/comments/:id" component={Comments} />
        </div>
    </Router>
)

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
