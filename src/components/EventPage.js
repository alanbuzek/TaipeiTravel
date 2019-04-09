import React from 'react';
import { Link } from 'react-router-dom';

import eventful from '../api/eventful';
import Map from './Map';
import Event from './Event';

const app_key = 'LTXCgLrsCkpsNSWP'; // Eventful.com api key

class EventPage extends React.Component {
  state = {
    loaded: false,
    events: [],
    position: null,
    showMap: false
  };

  componentDidMount() {
    this.fetchEvents(); // fetches events upon mounting
    navigator.geolocation.getCurrentPosition(
      position => {
        // gets positions -> state update
        this.setState({
          position: { latitude: position.coords.latitude, longitude: position.coords.longitude }
        });
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }
  componentWillUnmount() {
    document.querySelector('html').style.overflow = 'hidden';
  }

  fetchEvents = async () => {
    let results = await eventful.get(
      `/search?app_key=${app_key}&location=Taipei&units=km&page_size=300&sort_order=popularity`
    );
    const events = results.data.events.event;
    const eventsArray = [];
    events.forEach(event => {
      eventsArray.push(event);
    });
    document.querySelector('html').style.overflow = 'auto';
    this.setState({ loaded: true, events: eventsArray });
  };

  toggleMap = mapId => {
    if (!this.state.showMap) {
      this.setState({ showMap: true, mapId });
    } else {
      this.setState({ showMap: false });
    }
  };

  renderMap = () => {
    if (this.state.showMap) {
      return (
        <Map
          event={this.state.events[this.state.mapId]}
          currentPosition={this.state.position}
          toggleMap={this.toggleMap}
        />
      );
    }
  };

  renderEvents = () => {
    if (this.state.loaded) {
      return this.state.events.map((event, index) => {
        return <Event id={`event-${index}`} event={event} toggleMap={this.toggleMap} position={this.state.position} />;
      });
    } else {
      // events not fetched yet, show loader
      return (
        <div className="loader__container">
          <div className="loader" />
          <div className="loader__text">Looking for events in Taipei...</div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="padding">
        <div className={`landing ${this.state.loaded ? 'events' : ''}`}>
          <Link to="/">
            <i className="material-icons x-icon x-icon--main">arrow_back</i>
          </Link>
          {this.renderMap()}
          <div className="events__container">{this.renderEvents()}</div>
        </div>
      </div>
    );
  }
}

export default EventPage;
