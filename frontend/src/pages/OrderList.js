import React, { useState } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from "react-redux";

const styles = ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 600
  },
  subheader: {
    width: "100%"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const tileData = [
  {
    img: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
    title: "Breakfast",
    author: "jill111",
    status: '',
  },
  {
    img: "https://material-ui.com/static/images/grid-list/burgers.jpg",
    title: "Tasty burger",
    author: "director90",
    status: '',
  },
  {
    img: "https://material-ui.com/static/images/grid-list/honey.jpg",
    title: "Honey",
    author: "fancycravel",
    status: '',
  },
  {
    img: "https://material-ui.com/static/images/grid-list/vegetables.jpg",
    title: "Vegetables",
    author: "jill111",
    status: '',
  },
  {
    img: "https://www.unicef.org/malaysia/sites/unicef.org.malaysia/files/styles/press_release_feature/public/beverages-carbonated-carbonated-drink-1282273.jpg",
    title: "Soda",
    author: "dan fador",
    status: '',
  },
  {
    img: "https://images.theconversation.com/files/194291/original/file-20171113-27595-ox08qm.jpg",
    title: "Tequila",
    author: "jill",
    status: '',
  },
];

function Subsection(props) {
  console.log(props.name)
  if (props.name.title == 'Breakfast') {
    return(
      <span>Order status:
        {`${props.status.breakfast}`}
        </span>
  )}
  else if (props.name.title == 'Tasty burger') {
    return(
      <span>Order status:
        {`${props.status.burger}`}
        </span>
  )}
  else if (props.name.title == 'Honey') {
    return(
      <span>Order status:
        {`${props.status.honey}`}
        </span>
  )}
  else if (props.name.title == 'Vegetables') {
    return(
      <span>Order status:
        {`${props.status.vegetables}`}
        </span>
  )}
  else if (props.name.title == 'Soda') {
    return(
      <span>Order status:
        {`${props.status.soda}`}
        </span>
  )}
  else if (props.name.title == 'Tequila') {
    return(
      <span>Order status:
        {`${props.status.tequila}`}
        </span>
  )}
  else {
    return(
      <span>status:
        NA
        </span>
  )}
}

function OrderList(props) {
  const { classes } = props;
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(1);
  const [itemName, setItemName] = useState("Drink");
  const [status, setStatus] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick(e) {
    console.log(e)
  };

  return (
    <>
    <div style={styles.root}>
      <GridList cellHeight={80} style={styles.gridList} cols={3}>
      <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
        <ListSubheader component="div">Order List</ListSubheader>
      </GridListTile>
        {tileData.map(tile => (
          <GridListTile cols={tile.cols || 1}>
            {tile.title}
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<Subsection name={tile} status={props} />}

            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </>
  );
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  breakfast: state.reducers.breakfast,
  burger: state.reducers.burger,
  honey: state.reducers.honey,
  vegetables: state.reducers.vegetables,
  soda: state.reducers.soda,
  tequila: state.reducers.tequila,
})

export default connect(
  mapStateToProps,
  withStyles(styles),
)(OrderList);
