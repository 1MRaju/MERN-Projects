import React, { useState } from 'react';
import moment from 'moment';
import './admin.css'

const EditForm = ({ initialData, onSave, onCancel }) => {
    const [editedData, setEditedData] = useState({ ...initialData });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await onSave(editedData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="edit-form ">
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={editedData.name || editedData.organisationName || editedData.hospitalName }
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input
                    type="text"
                    name="createdAt"
                    value={moment(editedData.createdAt).format('YYYY-MM-DDTHH:mm')}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-actions">
                <button className="btn" onClick={handleSubmit}> Save </button>
                <button className="btn" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditForm;
