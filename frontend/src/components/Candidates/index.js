import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, deleteCandidate, getAllCandidates } from './actions'
import {DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import './index.css'
import { DELETE_CANDIDATE_RESET } from './constants';
import Modal from "./CandidateModel"
const Candidates= ({history}) => {
    const dispatch = useDispatch();
        const alert=useAlert();
        // const navigate =useNavigate()
        const [model, setModel] = useState({open:false,id:null})
        const {loading,candidates,error}=useSelector(state=>state.candidates);
        const {isDeleted,error:deleteError}=useSelector(state=>state.deleteCandidate)
        useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError)
        }
        if(isDeleted){
            alert.success("Candidate Deleted Successfully");
            history.push('/candidates')
            dispatch({type:DELETE_CANDIDATE_RESET});
        }
        dispatch(getAllCandidates())
    }, [error,deleteError,alert,isDeleted,dispatch,history])

    const deleteCandidateHandler=(id)=>{
        dispatch(deleteCandidate(id))
    }

    const columns=[
        {
            field:"id",
            headerName:"CandidateId",
            minWidth:300,
            flex:0.5,
            hide:true,
        },{
            field:"userId",
            headerName:"userId",
            minWidth:300,
            flex:0.5,
            hide:true,
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
                    {pathname:`/candidate/${params.getValue(params.id,"userId")}`,state:{id:params.getValue(params.id,"id")}}
                )}>
                    <Edit />
                </span>
                    {/* <Link to={`/candidate/${params.getValue(params.id,"userId")}`}>
                    <Edit />
                    </Link> */}
                    <Button onClick={()=>deleteCandidateHandler(params.getValue(params.id,"userId"))}>
                        <Delete />
                    </Button>
                    </>
                )
            }
        }
    ]
    const rows=[];
    
    candidates && candidates.forEach((candidate)=>{
        rows.push({
            id:candidate._id,
            userId:candidate.userId,
            firstname:candidate.firstname,
            lastname:candidate.lastname,
            email:candidate.email
        })
    })
    
    return (
        <>
            <div className='MainContainer'>
                <h5 className='mainHeading'>All Candidates</h5>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='gridTable'
                    autoHeight>

                </DataGrid>
            </div>
            <Modal isOpen={model.open} id={model.id}  setModel={setModel} />
        </>
    )
}

export default Candidates
