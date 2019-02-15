import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <React.Fragment>
          <CssBaseline />
          <Auth />
        </React.Fragment>
      </JssProvider>
    );
  }
}

export default App;
