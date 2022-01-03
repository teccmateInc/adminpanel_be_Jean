import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, deleteCalendar, getAllcalendars } from './actions';
import {DataGrid} from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import {  DELETE_CALENDAR_RESET } from './constants';
import moment from "moment"

const Calendars = ({history}) => {
    const dispatch = useDispatch();
    const {loading,error,calendars}=useSelector(state=>state.calendars);
    const{error:deleteError,isDeleted}=useSelector(state=>state.deleteCalendar);
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
            alert.success("Calendar Deleted Successfully")
            history.push("/calendars")
            dispatch({type:DELETE_CALENDAR_RESET});
        }
        dispatch(getAllcalendars())
    }, [dispatch,error,deleteError,alert,isDeleted])

    
    const deleteAdminHandler=(id)=>{
        dispatch(deleteCalendar(id))
    }

    const columns=[
        {
            field:"id",
            headerName:"AdminId",
            minWidth:300,
            flex:0.5,
            hide:true
        },{
            field:"userEmail",
            headerName:"User Email",
            minWidth:300,
            flex:0.5,
            // hide:true
        },

        {
            field:'date',
            headerName:'Date',
            minWidth:170,
            flex:1
        },
        {
            field:'from',
            headerName:'Starting Time',
            minWidth:270,
            flex:1
        },
        {
            field:'to',
            headerName:'Ending Time',
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
                    {/* <Link to={`/admin/${params.getValue(params.id,"userId")}`}>
                    <Edit />
                    </Link> */}
                    <Button onClick={()=>deleteAdminHandler(params.getValue(params.id,"id"))}>
                        <Delete />
                    </Button>
                    </>
                )
            }
        }
    ]
    const rows=[];
    
    calendars && calendars.forEach((calendar)=>{
        rows.push({
            id:calendar._id,
            userEmail:calendar.user.email,
            date:moment(calendar.date).format("MMM Do YYYY"),
            from:moment(calendar.from,["HH:mm"]).format("hh:mm A"),
            to:moment(calendar.to,["HH:mm"]).format("hh:mm A"),
        })
    })

    return (
        <>
        <div className='MainContainer'>
                <h5 className='mainHeading'>All Calendars</h5>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='gridTable'
                    autoHeight>

                </DataGrid>
            </div>
            {/* <AdminModel isOpen={model.open} id={model.id}  setModel={setModel} /> */}
            
        </>
    )
}

export default Calendars
