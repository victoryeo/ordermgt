import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import DrawerLeft from './components/DrawerLeft.js'
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <DrawerLeft />
      </React.Fragment>
    )
  }
}

export default App
