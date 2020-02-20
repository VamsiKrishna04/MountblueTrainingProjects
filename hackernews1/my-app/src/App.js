import React from 'react';
import Header from './header';
import StoriesContainer from './StoriesContainer';

function App(props) {
  return (
    <div className="container">
      <div className="row">
        <Header></Header>
      </div>
      <div className="row">
        <div className="col-md-12">
          <StoriesContainer />
        </div>
      </div>
    </div>
  );
}

export default App;



/*
why className not class
Learn Component LifeCycle Methods
y to fetch data in didmount
y 2 use setState
y to keep state outside instead of constructor
https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf#targetText=From%20Parent%20to%20Child%20Using%20Props,-Let%20us%20consider&targetText=This%20is%20the%20easiest%20direction,and%20the%20most%20basic%20one.&targetText=%2F%2FIt%20is%20no%20compulsion,data%20from%20Parent%20to%20Child.
https://github.com/webpack/docs/wiki/troubleshooting#not-enough-watchers
*/