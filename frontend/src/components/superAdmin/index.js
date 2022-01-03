import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, getSuperAdmin } from './actions';
import {DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import Sidebar from '../Sidebar.js/Sidebar';

const SuperAdmin = () => {
    const dispatch = useDispatch();
    const {loading,error,superadmin}=useSelector(state=>state.superadmin)
    const alert=useAlert();

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
        dispatch(getSuperAdmin())
    }, [])

    const columns=[
        {
            field:"id",
            headerName:"SuperAdminId",
            minWidth:300,
            flex:0.5
        },
        {
            field:'firstname',
            headerName:'FirstName',
            minWidth:170,
            flex:1
        },
        {
            field:'lastname',
            headerName:'LastName',
            minWidth:170,
            flex:1
        },
        {
            field:'email',
            headerName:'Email Id',
            minWidth:270,
            flex:1
        },
        {
            field:'actions',
            headerName:'Actions',
            minWidth:150,
            flex:0.3,
            type:'number',
            sortable:false,
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={`/superadmin/${params.getValue(params.id,"id")}`}>
                    <Edit />
                    </Link>
                    <Button>
                        <Delete />
                    </Button>
                    </>
                )
            }
        }
    ]
    const rows=[];
    
    superadmin && superadmin.forEach((item)=>{
        rows.push({
            id:item._id,
            firstname:item.firstname,
            lastname:item.lastname,
            email:item.email
        })
    })


    return (
        <>
        <div className='MainContainer'>
            {/* <Sidebar /> */}
                <h5 className='mainHeading'>Super Admin</h5>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='gridTable'
                    autoHeight>

                </DataGrid>
            </div>
            
        </>
    )
}

export default SuperAdmin
