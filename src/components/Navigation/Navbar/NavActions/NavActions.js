import React from 'react';
import AddDevice from './AddDevice/AddDevice'
import Logout from './Logout/Logout'

const components = {
  Logout: Logout,
  AddDevice: AddDevice,
};


const navActions = (props) => props.list.map((action, index) => React.createElement(components[action], {key: index}))

export default navActions;