import React from 'react';
import BackgroundImageOnLoad from 'background-image-on-load';

import Header from './Header';
import Container from './Container';

// secret id predict hq events - sLrOPcxcePr3FfYIwbJ85Mn6SOudl3Ah9n8gU0gm
// access token - sLeAjQa7C9Vs7JJcieTVkcXmyGNcCE

//Eventful api key - LTXCgLrsCkpsNSWP
class Landing extends React.Component {
  state = { loaded: false };

  finishLoad = () => {
    this.setState({ loaded: true });
  };

  renderPage = () => {
    if (this.state.loaded) {
      return (
        <React.Fragment>
          <Container type={1} />
          <Header finishLoad={this.finishLoad} />
          <Container type={2} />
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
        <BackgroundImageOnLoad
          src={'https://unsplash.it/1200/310?random'}
          onLoadBg={() => {
            console.log('loaded');
            this.setState({
              loaded: true
            });
          }}
          onError={err => console.log('error', err)}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default Landing;
