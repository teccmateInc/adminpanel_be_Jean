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


const SuperAdminHeader=()=> {
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
                    label="Admins">
                    <Link to="/admins">
                    <TreeItem 
                    nodeId="8" 
                    label="All" 
                    icon={<PostAdd />}
                     />
                    </Link>
                    <Link to="/newAdmin" >
                    <TreeItem 
                    nodeId="9" 
                    label="Create" 
                    icon={<Add />} 
                    />
                    </Link>
                    </TreeItem>
                    <TreeItem 
                    nodeId="10" 
                    label="SuperAdmins">
                    <Link to="/superAdmin">
                    <TreeItem 
                    nodeId="11" 
                    label="All" 
                    icon={<PostAdd />} 
                    />
                    </Link>
                                        
                </TreeItem>

                <TreeItem 
                    nodeId="12" 
                    label="Orders">
                    <Link to="/orders">
                    <TreeItem 
                    nodeId="13" 
                    label="All" 
                    icon={<PostAdd />} 
                    />
                    </Link>
                                        
                </TreeItem>
                <TreeItem 
                    nodeId="14" 
                    label="Calendars">
                    <Link to="/calendars">
                    <TreeItem 
                    nodeId="15" 
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
          Super Admin
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
  );
}
export default SuperAdminHeader;







// import React,{Fragment} from 'react'
// import './header.css' ;
// import MenuIcon from '@mui/icons-material/Menu';

// const Header = () => {
//     return (
//         <Fragment>
//             <div className ="top-header"> 
//             <div className='header-items'>
//             <span><MenuIcon /></span>
//             <h5>Candidates</h5>
//             <h5>Clients</h5>
//             <h5>Admin</h5>
//             <h5>Super Admin</h5>
//             </div>
//             </div> 
            
//         </Fragment>
//     )
// }

// export default Header
