import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BugReportIcon from '@material-ui/icons/BugReport';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import Dashboard from './Dashboard';


export const mainListItems = (
    <BrowserRouter>
        {/*<Link to="/">*/}
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        {/*</Link>*/}
        {/*<Link to="/debug">*/}
            <ListItem button>
                <ListItemIcon>
                    <BugReportIcon />
                </ListItemIcon>
                <ListItemText primary="Debug" />
            </ListItem>
        {/*</Link>*/}
        <ListItem button>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
        {/*<Router>*/}
        {/*    <div>*/}
        {/*        <Router path='/' component={Dashboard}/>*/}
        {/*    </div>*/}
        {/*</Router>*/}
    </BrowserRouter>
);

