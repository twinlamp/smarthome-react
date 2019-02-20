import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar'
import { connect } from 'react-redux';

class Layout extends Component {

  render() {
    return <React.Fragment>
      <Navbar navActions={this.props.navActions}/>
      <main style={{padding: '20px'}}>
        {this.props.children}
      </main>
    </React.Fragment>
  }
}

const mapStateToProps = state => {
  return {
    navActions: state.nav.navActions,
    loading: state.auth.loading || state.devices.loading
  };
};

export default connect(mapStateToProps)(Layout);