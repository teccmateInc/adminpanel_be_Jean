import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, deleteOrder, getAllOrders } from './actions';
import {DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { DELETE_ORDERS_RESET } from './constants';
// import AdminModel from "./Model";

const Orders = ({history}) => {
    const dispatch = useDispatch();
    // const navigate=useNavigate();
    // const [model, setModel] = useState({open:false,id:null})
    const {loading,error,orders}=useSelector(state=>state.orders);
    const{error:deleteError,isDeleted}=useSelector(state=>state.deleteOrder);
    const alert=useAlert();
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
            alert.success("Order Deleted Successfully")
            history.push("/orders")
            dispatch({type:DELETE_ORDERS_RESET});
        }
        dispatch(getAllOrders())
    }, [dispatch,error,deleteError,alert,isDeleted])

    
    const deleteAdminHandler=(id)=>{
        dispatch(deleteOrder(id))
    }

    const columns=[
        {
            field:"id",
            headerName:"OrderId",
            minWidth:300,
            flex:0.5,
            hide:true
        },{
            field:"EmailId",
            headerName:"EmailId",
            minWidth:250,
            flex:0.5,
            // renderCell: (params) => {
            //     return  <span onClick={()=>{
            //     //   console.log(params.id)
            // //       setModel({
            // //       open:true,
            // //       id:params.id
            // //   })
            // }}>{params.getValue(params.id,"firstname")}</span>
            // }
        },
        {
            field:'vaccine',
            headerName:'Vaccine',
            minWidth:170,
            flex:1,
            
        },
        {
            field:'notes',
            headerName:'Notes',
            minWidth:230,
            flex:1
        },
        {
            field:'position',
            headerName:'Position',
            minWidth:200,
            flex:1
        },
        {
            field:'statusLead',
            headerName:'Status Lead',
            minWidth:200,
            flex:1
        },
        {
            field:'sentProfile',
            headerName:'Profile Sent',
            minWidth:200,
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
                    <Link to={`/order/${params.getValue(params.id,"id")}`}>
                    <Edit />
                    </Link>
                    <Button onClick={()=>deleteAdminHandler(params.getValue(params.id,"id"))}>
                        <Delete />
                    </Button>
                    </>
                )
            }
        }
    ]
    const rows=[];
    
    orders && orders.forEach((order)=>{
        rows.push({
            id:order._id,
            EmailId:order.user.email,
            vaccine:order.vaccine,
            notes:order.notes,
            position:order.position,
            statusLead:order.statusLead,
            sentProfile:order.sentProfile
        })
    })


    return (
        <>
        <div className='MainContainer'>
                <h5 className='mainHeading'>All Orders</h5>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='gridTable'
                    autoHeight>

                </DataGrid>
            </div>
            {/* <AdminModel isOpen={model.open} id={model.id} /> */}
            
        </>
    )
}

export default Orders
