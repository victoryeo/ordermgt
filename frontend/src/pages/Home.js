import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from '@material-ui/core/Typography';
import mainLogo from '../assets/eddy01.jpg';
import Popup from './Popup';

const styles = ({
  root: {
    flexGrow: 1,
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 600,
    height: 650
  },
  subheader: {
    width: "50%"
  },
  textp: {
    color: "#cccccc"
  },
  full: {
    width: "100%",
    height: "100%"
  },
  home: {
    width: "100%",
    height: "100%",
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    this.state = {
      query: 'Eddy',
      seen: false,
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      console.log(this.state.query)
      this.setState({
        seen: true,
      })
    }
  }

  handleChange = (e) => {
    // If the search bar isn't empty
    if (e.target.value !== "") {
      this.setState({
          query: e.target.value,
      })
    }
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  componentDidMount() {

  }

  render() {
    return (
      <>
      <div align="right" style={{ backgroundColor: "black" }} >
        <Typography color="inherit" variant="h6">
          <input type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Search..." />
        </Typography>
      </div>
      <div align="center" style={{ backgroundColor: "black" }} >
        <img style={styles.home}  src={mainLogo} alt="home"/>
      </div>
      <style>{'body { background-color: black; }'}</style>

      {this.state.seen ? <Popup toggle={this.togglePop} string={this.state.query} /> : null}
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
