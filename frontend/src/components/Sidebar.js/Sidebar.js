import { TreeView,TreeItem } from "@mui/lab";
import { ExpandMore,ExpandLess,Add,ImportExport, PostAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from 'react'
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <TreeView 
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

            </TreeView>          
        </div>
    )
}

export default Sidebar
