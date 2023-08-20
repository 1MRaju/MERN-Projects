import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { BsFillTrash3Fill } from 'react-icons/bs';
import moment from 'moment';
import API from '../../Services/API';
import EditForm from './EditForm';
import { BiEdit } from 'react-icons/bi';

const OrgList = () => {
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter((record) =>
    record.organisationName.toLowerCase().includes(searchText.toLowerCase()) ||
    record.email.toLowerCase().includes(searchText.toLowerCase()) 
    // record.name.toLowerCase().includes(searchText.toLowerCase()) 
    //name field is empty in database so it is getting error
);

    //find organisation records
    const getOrgList = async () => {
        try {
            const {data} = await API.get('/admin/organisation-list')
            // console.log(data);
            if(data?.success){
                setData(data?.orgData)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getOrgList()
    },[])

      //delete function
      const handleDelete = async (id) => {
        try {
            let answer = window.prompt('Are you sure want to delete organisation', 'sure')
            if(!answer) return
            const {data} = await API.delete(`/admin/delete-org/${id}`)
            alert(data?.message)
            getOrgList()
            // window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id) => {
        setEditId(id);
    };

        // save edited organisation
        const handleSave = async (editedData) => {
            try {
                const { data } = await API.put(`/admin/update-org/${editId}`, editedData);
                alert(data?.message);
                setEditId(null);
                getOrgList()
            } catch (error) {
                console.log(error);
            }
        };

  return (
    <Layout>
         <div className="search-input">
                <label className="bg-dark text-light p-2 ms-2">Search Organisations</label>
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
                            {/* <td>{record.name}</td> */}
                            <td>{record.organisationName}</td>
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
                                 <BsFillTrash3Fill color='red'/>
                                </div>
                            </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
    </Layout>
  )
}

export default OrgList
