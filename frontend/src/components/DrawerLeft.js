import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Router, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Eat from "../pages/Eat";
import Drink from "../pages/Drink";
import Story from "../pages/Story";
import Visit from "../pages/Visit";
import { createBrowserHistory } from "history";

const drawerWidth = 150;
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
  },
  aboveDrawer: {
    width: `calc(${drawerWidth}px)`,
    marginRight: `calc(100% - ${drawerWidth}px)`,
    zIndex: theme.zIndex.drawer + 1
  },
  flex: {
    flex: 1
  },
}));

function DrawerLeft() {
  const classes = useStyles();

  const onItemClick = title => () => {

  };

  return (
    <div className={classes.root}>
      <Router history={history}>
      <AppBar  className={classes.aboveDrawer}>
        <Toolbar>
          <Typography variant="h5" className={classes.flex}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left" >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Home")} >
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Eat"
            onClick={onItemClick("Eat")} >
            <ListItemText>Eat</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Drink"
            onClick={onItemClick("Drink")} >
            <ListItemText>Drink</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/Story"
            onClick={onItemClick("Story")} >
            <ListItemText>Story</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Visit"
            onClick={onItemClick("Visit")} >
            <ListItemText>Visit</ListItemText>
          </ListItem>
      </List>
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={Home} />
        <Route path="/eat" component={Eat} />
        <Route path="/drink" component={Drink} />
        <Route path="/story" component={Story} />
        <Route path="/visit" component={Visit} />
      </main>
      </Router>

    </div>
  );
}

export default withStyles(useStyles)(DrawerLeft);
