import React from 'react';
import { Link } from 'react-router-dom';

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container__item" onClick={() => this.props.toggleModal(true, 'hotels')}>
          Hotels
          <i className="icon fas fa-hotel" />{' '}
        </div>
        <div className="container__item" onClick={() => this.props.toggleModal(true, 'food')}>
          Food
          <i className="icon fas fa-utensils" />{' '}
        </div>
        <Link to="/events" className="container__item">
          Events
          <i className="icon fas fa-calendar-alt" />{' '}
        </Link>
        <div className="container__item" onClick={() => this.props.toggleModal(true, 'sights')}>
          Sights
          <i className="icon fas fa-vihara" />{' '}
        </div>
      </div>
    );
  }
}

export default Container;
