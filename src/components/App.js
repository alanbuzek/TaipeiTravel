import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Landing from './Landing';
import EventPage from './EventPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Landing} />
          <Route path="/events" component={EventPage} />
        </div>
      </Router>
    );
  }
}

export default App;
