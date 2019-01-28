import React from 'react';
import _ from 'lodash';

class Event extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = { title: undefined, displayTime: '', showMap: false, distance: undefined };
  }

  // converting string into title case
  titleCase = str => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  };

  isLetter = c => {
    return c.toLowerCase() !== c.toUpperCase();
  };

  componentDidMount() {
    // truncate event title
    let title = _.truncate(this.titleCase(this.props.event.title.toLowerCase()), {
      length: 65,
      separator: ' ',
      omission: ''
    });

    // checks for non letter characters at the end of the truncated title
    if (!this.isLetter(title[title.length - 1]) && title[title.length - 1] !== ')') {
      title = title.substring(0, title.length - 1);
    }

    // evaluate title length and choose class (font-size)
    let titleSize = 'normal';
    if (title.length < 50) {
      titleSize = 'med';
    }
    if (title.length < 35) {
      titleSize = 'big';
    }
    if (title.length < 20) {
      titleSize = 'huge';
    }

    // get current position and event position - differnce = distance to display
    let lat, lng;
    if (!this.props.position) {
      lat = 25.033499866;
      lng = 121.558997764;
    } else {
      lat = this.props.position.latitude;
      lng = this.props.position.longitude;
    }
    // let distance =
    //   geolib.getDistance(
    //     { latitude: this.props.event.latitude, longitude: this.props.event.longitude },
    //     { latitude: lat, longitude: lng }
    //   ) / 1000;

    let distance = getDistance(lat, lng, this.props.event.latitude, this.props.event.longitude);
    distance = distance.toFixed(1) + ' KM';

    const eventTime = new Date(this.props.event.start_time);
    const options = { month: 'short', day: 'numeric' };
    const displayTime = eventTime.toLocaleDateString('en-US', options);

    this.setState({ title, displayTime, titleSize, distance });
  }

  openMap = () => {
    this.props.toggleMap(this.props.id.split('-')[1]);
  };

  openEventful = () => {
    window.open(this.props.event.url);
  };

  render() {
    return (
      <div
        className="event"
        style={{ animationDelay: `${Math.random() * 2.4}s` }}
        key={this.state.title}
      >
        <div className="event__img-container">
          <img src={this.props.event.image.medium.url} alt="" />
        </div>
        <div className="event__text">
          <div className={`event__text--title-${this.state.titleSize}`}>{this.state.title}</div>
          <div className="event__text--maps">
            <div className="event__text--maps-distance" onClick={this.openMap}>
              {this.state.distance} <i className="icon fas fa-location-arrow" />{' '}
            </div>
            <div className="event__text--maps-date" onClick={this.openEventful}>
              <div className="event__text--maps-date--to-move">
                <div className="eventful">Eventful.com</div>
                {this.state.displayTime}
                <i className="icon fas fa-calendar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;

const getDistance = (lat1, lon1, lat2, lon2, unit = 'K') => {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var radlon1 = (Math.PI * lon1) / 180;
  var radlon2 = (Math.PI * lon2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  console.log(dist);
  return dist;
};
