import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Layout/Header'
import API from '../../Services/API'
import moment from 'moment';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [inventoryData, setInventoryData] = useState([])
    const colors = ['#A2678A','#0B666A','#0E2954','#A78295','#749BC2','#FF78C4','#E4A5FF','#FF0060','#EBB02D','#30E3DF','#CEEDC7','#FFDEFA','#C449C2','#CC561E','#6155A6','#FFE6E6','#01C5C4','#D54062']

    //get bloodgroup data
    const getBloodGroupData = async () => {
        try {
            const {data} = await API.get('/analytics/bloodGroups-data')
            if(data?.success){
                setData(data?.bloodGroupData)
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //lifecycle method
    useEffect(() => {
        getBloodGroupData();
    },[])

    //get function
    const getBloodRecords = async ()=>{
        try {
            const {data} = await API.get('/inventory/get-recent-inventory')
            if(data?.success){
                setInventoryData(data?.inventory)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBloodRecords();
    },[]);

  return (
    <>
      <Header/>
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) =>(
            <div className="card m-2 p-1" key={i} style={{width: '18rem', backgroundColor:`${colors[i]}`}}>
            <div className="card-body">
                <h5 className="card-title bg-light text-dark text-center mb-3 p-3">{record.bloodGroup}</h5>
                <p className="card-text text-light">
                    Total In: <b>{record.totalIn}</b> (ml) 
                </p>
                <p className="card-text text-light">
                    Total Out: <b>{record.totalOut}</b> (ml)
                </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
                Total Available: <b>{record.availableBlood}</b> (ml)
            </div>
            </div>
        ))}
      </div>
      <div className="container text-center py-3">
        <h1>Top 3 recent blood transactions</h1>
      <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Blood Group</th>
                        <th scope="col">Inventory Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Donar Email</th>
                        <th scope="col">Time & Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData?.map((record)=>(
                            <tr key={record._id}>
                            <td>{record.bloodGroup}</td>
                            <td>{record.inventoryType}</td>
                            <td>{record.quantity} (ml)</td>
                            <td>{record.email}</td>
                            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
      </div>
    </>
  )
}

export default Analytics
