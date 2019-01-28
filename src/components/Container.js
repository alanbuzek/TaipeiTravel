import React from 'react';
import { Link } from 'react-router-dom';

class Container extends React.Component {
  render() {
    if (this.props.type === 1) {
      return (
        <div className="container">
          <Link to="/events" className="container__item">
            Food
            <i className="icon fas fa-utensils" />{' '}
          </Link>
          <Link to="/events" className="container__item">
            Transport
            <i className="icon fas fa-bus-alt" />{' '}
          </Link>
          <Link to="/events" className="container__item">
            Events
            <i className="icon fas fa-vihara" />{' '}
          </Link>
          <Link to="/events" className="container__item">
            Hotels
            <i className="icon fas fa-hotel" />{' '}
          </Link>
        </div>
      );
    } else if (this.props.type === 2) {
      return (
        <div className="container">
          <Link to="/events" className="container__item">
            Culture
            <i className="icon fas fa-torii-gate" />{' '}
          </Link>
          <Link to="/events" className="container__item">
            Nature
            <i className="icon fas fa-hiking" />{' '}
          </Link>
          <Link to="/events" className="container__item">
            Jobs
            <i className="icon fas fa-briefcase" />{' '}
          </Link>
          <Link to="/events" className="container__item">
            Sports
            <i className="icon fas fa-basketball-ball" />{' '}
          </Link>
        </div>
      );
    }
  }
}

export default Container;
