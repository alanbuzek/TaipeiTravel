import React from 'react';
import axios from 'axios';

const maps_key = 'AIzaSyBH3yEmLTeKifU3lQUzwP3SZSHREQMPcuU'; // Google Maps API key

class Map extends React.Component {
  state = { address: '' };
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  componentDidMount() {
    this.fetchAdress();
    this.renderMap();
    console.log(this.props);
  }

  initMap = () => {
    // start map thru google api
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById('map'));
    directionsDisplay.setMap(map);
    let start;
    if (this.props.currentPosition) {
      // set start point in current position
      start = {
        lat: parseFloat(this.props.currentPosition.latitude),
        lng: parseFloat(this.props.currentPosition.longitude)
      };
    } else {
      // if no position given, set default at downtown Taipei
      start = {
        lat: 25.033499866,
        lng: 121.558997764
      };
    }

    let end = {
      // set end point coords
      lat: parseFloat(this.props.event.latitude),
      lng: parseFloat(this.props.event.longitude)
    };

    const request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  };

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBH3yEmLTeKifU3lQUzwP3SZSHREQMPcuU&callback=initMap');
    window.initMap = this.initMap;
  };

  fetchAdress = async () => {
    // get address of venye
    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.event.latitude},${
        this.props.event.longitude
      }52&key=${maps_key}`
    );
    const address = result.data.results[0].formatted_address;
    this.setState({ address: address.substring(0, address.length - 12) });
  };
  handleClickOut = e => {
    if (e.target.classList.value === 'events__map') {
      this.props.toggleMap();
    }
  };
  render() {
    return (
      <div className="events__map" onClick={this.handleClickOut}>
        <div className="events__map--container">
          <div className="events__map--text">
            <div className="venue">{this.props.event.venue_name}</div>
            <div className="adress">{this.state.address}</div>
          </div>
          <div id="map" />
          <i className="material-icons x-icon x-icon--map" onClick={this.props.toggleMap}>
            close
          </i>
        </div>
      </div>
    );
  }
}

export default Map;

// load google maps script into react
function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
