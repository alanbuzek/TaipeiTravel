import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Landing from './Landing';
import EventPage from './EventPage';
// google key - AIzaSyDgO4KpgroHMVTzJr17asDGlxvLPj-4q9Y
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.033499866,121.558997764&radius=5000&type=restaurant&key=AIzaSyBH3yEmLTeKifU3lQUzwP3SZSHREQMPcuU
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
