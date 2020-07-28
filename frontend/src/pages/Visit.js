import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
//import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

const styles = ({
  root: {
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 600,
    height: 850
  },
  subheader: {
    padding: "160px",
  },
  header: {
    backgroundColor: "#FFFFFF",
    color: "black",
    padding: "16px",
    fontSize: "1.5em"
  },
});

const mapStyles = {
  width: '70%',
  height: '70%'
};

class Visit extends Component {
  constructor(props) {
    super(props);
    this.state = {
     showingInfoWindow: true,  //Hides or the shows the infoWindow
     activeMarker: {},          //Shows the active marker upon click
     selectedPlace: 'The Eddy'          //Shows the infoWindow to the selected place upon a marker
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <>
      <TableContainer>
      <Table aria-label="the table">
        <TableBody >
        <TableRow style={styles.header}>
           <TableCell>
           <Typography color="inherit" variant="h6">
             This is where we are:
           </Typography>
           </TableCell>
        </TableRow>
        <TableRow style={styles.header}>
          <TableCell>
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
             lat: 41.8781,
             lng: -87.6298
           }}
           >
           <Marker
             onClick={this.onMarkerClick}
             name={'The Eddy'}
           />
           <InfoWindow
             marker={this.state.activeMarker}
             visible={this.state.showingInfoWindow}
             onClose={this.onClose} >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
          </Map>
          </TableCell>
        </TableRow>
        </TableBody>
       </Table>
       </TableContainer>

       <TableContainer>
       <Table aria-label="the table">
         <TableBody >
           <TableRow style={styles.subheader}>
           </TableRow>
           <TableRow style={styles.subheader}>
           </TableRow>
         </TableBody>
       </Table>
       </TableContainer>
      </>
    );
  }
}

export default (GoogleApiWrapper({
  apiKey: 'AIzaSyBD2z9YKlPukYEL4zPS_T5cBN0loscnbWE'
})) (Visit);
