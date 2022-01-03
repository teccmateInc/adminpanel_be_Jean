import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, getAllClients,deleteClient } from './actions';
import { useAlert } from 'react-alert';
import {DataGrid} from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { DELETE_CLIENT_RESET } from './constants';
import ClientModel from "./ClientModal";

const Clients = ({history}) => {
const dispatch = useDispatch();
const [model, setModel] = useState({open:false,id:null})
const {loading,clients,error}=useSelector(state=>state.clients);
const{error:deleteError,isDeleted}=useSelector(state=>state.deleteClient);
const alert=useAlert();
// const navigate=useNavigate();

useEffect(() => {
    if(error){
        alert.error(error)
        dispatch(clearErrors());
    }
    if(deleteError){
        alert.error(error)
        dispatch(clearErrors());
    }
    if(isDeleted){
        alert.success("Client Deleted Successfully")
        history.push("/clients")
        dispatch({type:DELETE_CLIENT_RESET});
    }
    dispatch(getAllClients())
}, [dispatch,error,deleteError,alert,isDeleted])

    const deleteClientHandler=(id)=>{
        dispatch(deleteClient(id))
    }

const columns=[
    {
        field:"id",
        headerName:"CLientId",
        minWidth:300,
        flex:0.5,
        hide:true
    },{
        field:"userId",
        headerName:"UserId",
        minWidth:300,
        flex:0.5,
        hide:true
    },
    {
        field:'firstname',
        headerName:'FirstName',
        minWidth:170,
        flex:1,
        renderCell: (params) => {
            return  <span onClick={()=>{
            //   console.log(params.id)
              setModel({
              open:true,
              id:params.id
          })
        }}>{params.getValue(params.id,"firstname")}</span>
        }
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
                <span onClick={()=>history.push(
                    {pathname:`/client/${params.getValue(params.id,"userId")}`,state:{id:params.getValue(params.id,"id")}}
                )}>
                    <Edit />
                </span>
                {/* <Link to={`/client/${params.getValue(params.id,"userId")}`}> */}
                {/* <Edit /> */}
                {/* </Link> */}
                <Button onClick={()=>deleteClientHandler(params.getValue(params.id,"userId"))}>
                    <Delete />
                </Button>
                </>
            )
        }
    }
]
const rows=[];

clients && clients.forEach((client)=>{
    rows.push({
        id:client._id,
        userId:client.userId,
        firstname:client.firstname,
        lastname:client.lastname,
        email:client.email
    })
})
    
    return (
        <>
        <div className='MainContainer'>
                <h5 className='mainHeading'>All Clients</h5>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='GridTable'
                    autoHeight>

                </DataGrid>
                </div>
                <ClientModel isOpen={model.open} id={model.id} setModel={setModel} />
                </>      
    )
}

export default Clients;
