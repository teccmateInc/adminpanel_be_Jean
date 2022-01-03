import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import useStyle from './styles';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Drawer, makeStyles } from '@material-ui/core';
import "./header.css";
import { TreeView,TreeItem } from "@mui/lab";
import { ExpandMore,ExpandLess,Add,ImportExport, PostAdd } from "@mui/icons-material";
import {useSelector,useDispatch} from 'react-redux'
import { logout } from '../User/actions';
import { useAlert } from 'react-alert';

let useStyles=makeStyles((theme)=>({
    header_root:{
      '& MuiBox-root':{
      // backgroundColor:"#fff !important",
      position:"absolute",
      width:"100vw !important",
      maxWidth:"100% !important"
  
  }
    },
    header:{
      marginRight:`${theme.spacing(3)}px !important`
  
    },
    drawer:{
      paddingTop:"50px !important",
      width:250,
      '& a':{
        textDecoration:"none",
        color:"black"
            }
  
    }
  })
  )
const AdminHeader = () => {
    const {user} = useSelector(state => state.login )
    let classes = useStyles();
    const dispatch = useDispatch();
    const alert=useAlert();
    const [drawer,setDrawer]=useState(false)
    const history=useHistory()
    const handleLogout=()=>{
      dispatch(logout());
      alert.success("Logout Successfully")
      history.push("/login")
    }
  return (
    <Box >
      <Drawer open={drawer} onClose={()=>setDrawer(false)}>
      <TreeView className={classes.drawer}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
            >
                <TreeItem nodeId="1" label="Clients">
                    <Link to="/clients">
                    <TreeItem 
                    nodeId="2" 
                    label="All"
                     icon={<PostAdd />}
                      />
                    </Link>
                    <Link to="/newClient" >
                    <TreeItem 
                    nodeId="3" 
                    label="Create" 
                    icon={<Add />} 
                    
                    />
                    </Link>
                    </TreeItem>
                    <TreeItem 
                    nodeId="4" 
                    label="Candidates"
                    >
                    <Link to="/candidates">
                    <TreeItem 
                    nodeId="5" 
                    label="All" 
                    icon={<PostAdd />}
                     />
                    </Link>
                    <Link to="/newCandidate" >
                    <TreeItem 
                    nodeId="6" 
                    label="Create" 
                    icon={<Add />} 
                    />
                    </Link>
                    </TreeItem>
                    

                <TreeItem 
                    nodeId="7" 
                    label="Orders">
                    <Link to="/orders">
                    <TreeItem 
                    nodeId="8" 
                    label="All" 
                    icon={<PostAdd />} 
                    />
                    </Link>
                                        
                </TreeItem>
                <TreeItem 
                    nodeId="9" 
                    label="Calendars">
                    <Link to="/calendars">
                    <TreeItem 
                    nodeId="10" 
                    label="All" 
                    icon={<PostAdd />} 
                    />
                    </Link>
                                        
                </TreeItem>
                

            </TreeView>          
      </Drawer>
    <AppBar position="static">
      <Toolbar >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>setDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        
        
        <Typography variant="h6" component="div" className={classes.header} style={{flexGrow:1}} >
          Admin
        </Typography>
        {user!==null ?(
        <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
       ):(
        <Link to="/login">
        <Button color="inherit">
          Login
        </Button>
        </Link>
         )
         }

      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default AdminHeader;
