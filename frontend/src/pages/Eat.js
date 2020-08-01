import React, { useState } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PopUpFood from './PopUpFood';

const styles = theme => ({
  root: {
    margin: 20,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 600,
    height: 660
  },
  subheader: {
    width: "100%"
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

const tileData = [
  {
    img: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
    title: "Breakfast",
    author: "jill111",
    cols: 2,
    featured: true,
    number: 1
  },
  {
    img: "https://material-ui.com/static/images/grid-list/burgers.jpg",
    title: "Tasty burger",
    author: "director90",
    subfeatured: true,
    number: 2
  },
  {
    img: "https://material-ui.com/static/images/grid-list/honey.jpg",
    title: "Honey",
    author: "fancycravel",
    number: 3,
  },
  {
    img: "https://material-ui.com/static/images/grid-list/vegetables.jpg",
    title: "Vegetables",
    author: "jill111",
    cols: 2,
    number: 4
  },
];

function EatList(props) {
  const { classes } = props;
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(1);
  const [itemName, setItemName] = useState("Food")

  const handleClose = (order) => {
    console.log(order)
    setShow(false)
  };
  const handleShow = () => setShow(true);

  function handleClick(e) {
    console.log(e)
    setShow(true)
    if (e === 'Breakfast') {
      setPrice(20)
      setItemName('Breakfast')
    }
    else if (e === 'Tasty burger') {
      setPrice(18)
      setItemName('Tasty burger')
    }
    else if (e === 'Honey') {
      setPrice(8)
      setItemName('Honey')
    }
    else if (e === 'Vegetables') {
      setPrice(7)
      setItemName('Vegetables')
    }
    else {
      setPrice(5)
      setItemName('Food')
    }
  };

  return (
    <>
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.featured ? 2 : 1}
           rows={tile.featured ? 2 : (tile.subfeatured ? 2 : 1)
                }>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              role = 'title'
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}
                data-testid={`${tile.title}`}
                className={classes.icon}
                onClick={(e)=>handleClick(tile.title)}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    <PopUpFood show={show} price={price} name={itemName} toggle={handleClose}/>
    </>
  );
}

EatList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EatList);
