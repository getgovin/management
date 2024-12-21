import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteemploye, listemploye } from "../../redux/api";
import { useDispatch } from 'react-redux'; 
import {  toast } from 'react-toastify';
import { TablePagination } from '@mui/material';
const List = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [list , setList] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [search , setSearch] = useState("")




 
    const getList = () => {
        try {
             dispatch(listemploye()).then((res)=>{
                if(res?.payload){
                setList(res?.payload)
               
            
                } 
             })
        } catch (error) {
              console.log(error)
        }
    }
    useEffect(()=>{
        getList()
    },[])

    const deleteEmploye = (id) => {
        
        try {
             dispatch(deleteemploye(id)).then((res)=>{
                setList(list.filter((res) => res.id != id))
        toast.success("Deleted Successfully")

             })
        } catch (error) {
              console.log(error)
        }
    }

  
 
  
    // Handle search input
    const handleSearchChange = (event) => {
      setSearch(event.target.value.toLowerCase());
      setPage(0); 
    };
  
    // Handle page change
    const handlePageChange = (event, newPage) => setPage(newPage);
  
    // Handle rows per page change
    const handleRowsPerPageChange = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); 
    };
  
    
    const filteredRows = list.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
      );
  
    // Calculate the rows to display for the current page
    const displayedRows = filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  

  
    return (
        <div className="container my-5" >
            <div className="d-flex flex-column gap-2 flex-md-row gap-md-0 justify-content-between mb-3 flex-wrap ">
                <input  placeholder="search.."  className="form-control w-25 " type="search" value={search} onChange={(e) => handleSearchChange(e)}  />
                <button className="btn btn-primary" onClick={() => navigate("/employe/create")} > + Add</button>
            </div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody>
               {
                displayedRows?.map((res , i )=>(
                    <tr key={i} >
                    <th > {res?.name} </th>
                    <td >{res?.email}</td>
                    <td >{res?.department}</td>

                    <td>
                        <div className="d-flex gap-1  align-items-center "  >
                        <button className="btn btn-outline-info "  onClick={() => navigate(`/employe/view/${res?.id}`)}  >View</button>
                        <button className="btn btn-outline-primary" onClick={() => navigate(`/employe/edit/${res?.id}`)}>Edit</button>

                    <button className="btn btn-outline-danger " onClick={() => deleteEmploye(res?.id)}  >Delete</button>
                  
                   
                    </div>
                    </td>
    
                    </tr>
                ))
               }
                
              
            </tbody>
            </table>
           

      <TablePagination
      rowsPerPageOptions={[5, 10, 15]}
      component="div"
      count={filteredRows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
   


         
        </div>
    )
}

export default List;