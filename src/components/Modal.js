import React from 'react';
import { Link } from 'react-router-dom';

class Modal extends React.Component {
  handleClickOutside = () => {};
  render() {
    return (
      <div className="modal" onClick={this.handleClickOutside}>
        <div className="modal__window">
          <div className="modal__header">
            The <mark> {this.props.modalSection} </mark> section is still under development, sorry.
          </div>
          <img src={`img/${this.props.modalSection}.jpg`} alt="food section" className="modal__img" />
          {/* <div className="modal__features">Apologies, the {this.state.modalSection} is still under development.</div> */}
          <div className="modal__events">
            <div className="modal__events--text">Take a look at the finished</div>
            <Link to="/events" className="modal__events--button">
              Events Page
            </Link>
          </div>
          <i className="material-icons x-icon" onClick={() => this.props.toggleModal(false)}>
            close
          </i>
        </div>
      </div>
    );
  }
}

export default Modal;
