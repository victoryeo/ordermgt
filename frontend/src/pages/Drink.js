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
import PopUpFood from './PopupFood';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
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
    img: "https://www.unicef.org/malaysia/sites/unicef.org.malaysia/files/styles/press_release_feature/public/beverages-carbonated-carbonated-drink-1282273.jpg",
    title: "Soda",
    author: "dan fador"
  },
  {
    img: "https://images.theconversation.com/files/194291/original/file-20171113-27595-ox08qm.jpg",
    title: "Tequila",
    author: "jill",
    cols: 2,
    featured: true
  },
];

function DrinkList(props) {
  const { classes } = props;
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(1);
  const [itemName, setItemName] = useState("Drink")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick(e) {
    console.log(e)
    setShow(true)
    if (e === 'Soda') {
      setPrice(2)
      setItemName('Soda')
    }
    else {
      setPrice(15)
      setItemName('Tequila')
    }
  };

  return (
    <>
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
      <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
        <ListSubheader component="div">July</ListSubheader>
      </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`}
                className={classes.icon}
                onClick={(e)=>handleClick(tile.title)} >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    <PopUpFood show={show} price={price} name={itemName} toggle={handleClose}/>
    </>
  );
}

DrinkList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DrinkList);
