import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, deleteAdmin, getAllAdmins } from './actions';
import {DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { DELETE_ADMIN_RESET } from './constants';
import AdminModel from "./Model";

const Admins = ({history}) => {
    const dispatch = useDispatch();
    // const navigate=useNavigate();
    const [model, setModel] = useState({open:false,id:null})
    const {loading,error,admins}=useSelector(state=>state.admins);
    const{error:deleteError,isDeleted}=useSelector(state=>state.deleteAdmin);
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
            alert.success("Admin Deleted Successfully")
            history.push("/admins")
            dispatch({type:DELETE_ADMIN_RESET});
        }
        dispatch(getAllAdmins())
    }, [dispatch,error,deleteError,alert,isDeleted])

    
    const deleteAdminHandler=(id)=>{
        dispatch(deleteAdmin(id))
    }

    const columns=[
        {
            field:"id",
            headerName:"AdminId",
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
                console.log(params.getValue(params.id, "id"))
                return(
                    <>
                    {/* <Link to={`/admin/${params.getValue(params.id,"userId")}`} params={params}> */}
                    <span onClick={()=>history.push(
                        {pathname:`/admin/${params.getValue(params.id,"userId")}`,state:{id:params.getValue(params.id, "id")}}
                    )}>
                    <Edit />
                    </span>
                    <Button onClick={()=>deleteAdminHandler(params.getValue(params.id,"userId"))}>
                        <Delete />
                    </Button>
                    </>
                )
            }
        }
    ]
    const rows=[];
    
    admins && admins.forEach((admin)=>{
        rows.push({
            id:admin._id,
            userId:admin.userId,
            firstname:admin.firstname,
            lastname:admin.lastname,
            email:admin.email
        })
    })

    return (
        <>
        <div className='MainContainer'>
                <h5 className='mainHeading'>All Admins</h5>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='gridTable'
                    autoHeight>

                </DataGrid>
            </div>
            <AdminModel isOpen={model.open} id={model.id}  setModel={setModel} />
            
        </>
    )
}

export default Admins
