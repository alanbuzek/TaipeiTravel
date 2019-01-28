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
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById('map'));
    directionsDisplay.setMap(map);
    let start;
    console.log(this.props.currentPosition);
    if (this.props.currentPosition) {
      start = {
        lat: parseFloat(this.props.currentPosition.latitude),
        lng: parseFloat(this.props.currentPosition.longitude)
      };
    } else {
      start = {
        lat: 25.033499866,
        lng: 121.558997764
      };
    }

    console.log(start);
    let end = {
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

    // const map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: { lat: -34.397, lng: 150.644 },
    //   zoom: 8
    // });
    // const marker = new window.google.maps.Marker({
    //   position: { lat: -34.397, lng: 150.644 },
    //   map
    // });

    // const directions = await new window.google.maps.DirectionsService().route(
    //   {
    //     origin: 'Chicago, IL',
    //     destination: 'Los Angeles, CA',
    //     waypoints: [
    //       {
    //         location: 'Joplin, MO',
    //         stopover: false
    //       },
    //       {
    //         location: 'Oklahoma City, OK',
    //         stopover: true
    //       }
    //     ],
    //     provideRouteAlternatives: false,
    //     travelMode: 'DRIVING',
    //     drivingOptions: {
    //       departureTime: new Date(/* now, or future date */),
    //       trafficModel: 'pessimistic'
    //     },
    //     unitSystem: window.google.maps.UnitSystem.IMPERIAL
    //   },
    //   response => {
    //     console.log(response);
    //   }
    // );
  };

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBH3yEmLTeKifU3lQUzwP3SZSHREQMPcuU&callback=initMap'
    );
    window.initMap = this.initMap;
  };

  fetchAdress = async () => {
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
          <i className="material-icons x-icon" onClick={this.props.toggleMap}>
            close
          </i>
          <div className="events__map--text">
            <div className="venue">{this.props.event.venue_name}</div>
            <div className="adress">{this.state.address}</div>
          </div>
          <div id="map" />
        </div>
      </div>
    );
  }
}

export default Map;

function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
/*   <script
      async
      defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBH3yEmLTeKifU3lQUzwP3SZSHREQMPcuU&callback=initMap"
    ></script> */
