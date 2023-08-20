import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
        <h1>Welcome <i className='text-success'>{user?.name.toUpperCase()}</i></h1>
        <div className="admin-image container">
           <img src="./assets/images/blood_donation.png" alt="admin" />
        </div>
            <h3>Manage Blood Bank App</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum optio quidem, vel mollitia quae, itaque magnam libero tempore iste nihil quod iusto placeat debitis inventore velit earum consectetur dolorum hic?</p>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome
