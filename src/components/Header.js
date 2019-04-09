import React from 'react';

class Header extends React.Component {
  state = { second: false, active: null };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ second: true });
    }, 3500);
  }

  renderText = () => {
    if (this.state.second) {
      // second text
      return (
        <React.Fragment>
          Discover <span className={`span1 ${this.state.active === 1 ? 'active' : ''}`}>places</span>,
          <span className={`span2 ${this.state.active === 2 ? 'active' : ''}`}> ideas</span>,
          <span className={`span3 ${this.state.active === 3 ? 'active' : ''}`}> foods</span>...
        </React.Fragment>
      );
    } else {
      // default text
      return <React.Fragment>Welcome to Taipei!</React.Fragment>;
    }
  };
  render() {
    return (
      <div
        className={`header ${this.state.second ? 'header--second' : 'header--first'}`}
        onMouseOver={this.handleHover}
      >
        {this.renderText()}
      </div>
    );
  }
}

export default Header;
