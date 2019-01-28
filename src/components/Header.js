import React from 'react';

class Header extends React.Component {
  state = { second: false, active: null };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ second: true });
      // setInterval(() => {
      //   console.log(this.state.active);
      //   let activeNumber;
      //   if (this.state.active === 1) {
      //     activeNumber = 2;
      //   } else if (this.state.active === 2) {
      //     activeNumber = 3;
      //   } else {
      //     activeNumber = 1;
      //   }
      //   this.setState({ active: activeNumber });
      // }, 1500);
    }, 3500);
  }

  renderText = () => {
    if (this.state.second) {
      return (
        <React.Fragment>
          Discover{' '}
          <span className={`span1 ${this.state.active === 1 ? 'active' : ''}`}>places</span>,
          <span className={`span2 ${this.state.active === 2 ? 'active' : ''}`}> ideas</span>,
          <span className={`span3 ${this.state.active === 3 ? 'active' : ''}`}> foods</span>...
        </React.Fragment>
      );
    } else {
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
