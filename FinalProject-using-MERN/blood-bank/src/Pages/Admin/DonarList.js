import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../Services/API';
import {BsFillTrash3Fill} from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import EditForm from './EditForm';

const DonarList = () => {
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter((record) =>
        record.name.toLowerCase().includes(searchText.toLowerCase()) ||
        record.email.toLowerCase().includes(searchText.toLowerCase())
    );


    //find donar records
    const getDonarsList = async () => {
        try {
            const {data} = await API.get('/admin/donar-list')
            // console.log(data);
            if(data?.success){
                setData(data?.donarData)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getDonarsList()
    },[])

    //delete function
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt('Are you sure want to delete donar', 'sure')
            if(!answer) return
            const {data} = await API.delete(`/admin/delete-donar/${id}`)
            alert(data?.message)
            getDonarsList(); //refreshes the page
            // window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id) => {
        setEditId(id);
    };

        // save edited donor
    const handleSave = async (editedData) => {
        try {
            const { data } = await API.put(`/admin/update-donar/${editId}`, editedData);
            alert(data?.message);
            setEditId(null);
            getDonarsList(); 
        } catch (error) {
            console.log(error);
        }
    };
    
  return (
    <Layout>
           <div className="search-input">
                <label className="bg-dark text-light p-2 ms-2">Search Donars</label>
                {/* style={{background:'black', color:'white'}} */}
                <input
                    type="text"
                    className='p-1 my-2'
                    placeholder="Search by name or email"
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
       <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Edit & Update</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map((record)=>(
                            <tr key={record._id}>
                            <td>{record.name || record.organisationName + ' (ORG)'}</td>
                            <td>{record.email}</td>
                            <td>{record.phone }</td>
                            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                           
                           <td>
                              {editId === record._id ? (
                                    <EditForm
                                        initialData={record}
                                        onSave={handleSave}
                                        onCancel={() => setEditId(null)}
                                    />
                                ) : (
                                    <div className="btn" onClick={() => handleEdit(record._id)}>
                                        <BiEdit className="ms-4" color="blue" />
                                    </div>
                                )}
                            </td>

                            <td>
                                <div className="btn" onClick={()=>handleDelete(record._id)}>
                                 <BsFillTrash3Fill className = 'ms-2' color='red'/>
                                </div>
                            </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
    </Layout>
  )
}

export default DonarList


