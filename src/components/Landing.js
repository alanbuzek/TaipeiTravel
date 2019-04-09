import React from 'react';

import Header from './Header';
import Container from './Container';
import Modal from './Modal';

// secret id predict hq events - sLrOPcxcePr3FfYIwbJ85Mn6SOudl3Ah9n8gU0gm
// access token - sLeAjQa7C9Vs7JJcieTVkcXmyGNcCE

//Eventful api key - LTXCgLrsCkpsNSWP
class Landing extends React.Component {
  state = { loaded: false, modalSection: '', modalActive: false };

  componentDidMount() {
    let stateCheck = setInterval(() => {
      // check for image load -> initiate animation
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        this.setState({ loaded: true });
      }
    }, 100);
    document.querySelector('html').style.overflow = 'hidden';
  }

  toggleModal = (open, section) => {
    if (open) {
      this.setState({ modalActive: true, modalSection: section });
    } else {
      this.setState({ modalActive: false });
    }
  };

  renderModal() {
    if (this.state.modalActive) {
      return <Modal modalSection={this.state.modalSection} toggleModal={this.toggleModal} />;
    }
  }

  renderPage = () => {
    if (this.state.loaded) {
      return (
        <React.Fragment>
          <Header />
          <Container toggleModal={this.toggleModal} />
        </React.Fragment>
      );
    } else {
      return (
        <div className="loader__container">
          <div className="loader" />
          <div className="loader__text">Loading Taipei...</div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="landing">
        {this.renderPage()}
        {this.renderModal()}
      </div>
    );
  }
}

export default Landing;
