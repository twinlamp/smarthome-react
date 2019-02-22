import React from 'react';
import AddDevice from './AddDevice/AddDevice'
import Logout from './Logout/Logout'
import EditDevice from './EditDevice/EditDevice'

const components = {
  Logout: Logout,
  AddDevice: AddDevice,
  EditDevice: EditDevice
};


const navActions = (props) => Object.keys(props.list).filter(key => key !== 'Back').map((action, index) => {
  return React.createElement(components[action], {key: index, ...props.list[action]})
})

export default navActions;