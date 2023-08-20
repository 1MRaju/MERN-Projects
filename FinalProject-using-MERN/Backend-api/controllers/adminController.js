const userModel = require("../models/userModel");

//get donar list
const getDonarsListController = async (req, res) => {
    try {
        const donarData = await userModel
        .find({role:'donar'})
        .sort({createdAt:-1})
        return res.status(200).send({
            success: true,
            Totalcount: donarData.length,
            message:'Donar list fetched successfully',
            donarData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error In Donar-List API'
        })
    }
};

//get hospital list
const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await userModel
        .find({role:'hospital'})
        .sort({createdAt:-1})
        return res.status(200).send({
            success: true,
            Totalcount: hospitalData.length,
            message:'Hospital list fetched successfully',
            hospitalData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error In Hospital-List API',
            error,
        });
    }
};


//get organisation list
const getOrgController = async (req, res) => {
    try {
        const orgData = await userModel
        .find({role:'organisation'})
        .sort({createdAt:-1})
        return res.status(200).send({
            success: true,
            Totalcount: orgData.length,
            message:'Organisation list fetched successfully',
            orgData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error In Organisation-List API',
            error,
        });
    }
};


//delete donar
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Donar record deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in deleting Donor',
            error,
        })
    }
};

//delete hospital
const deleteHospitalController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Hospital record deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in deleting hospital',
            error,
        })
    }
};


//delete organisation
const deleteOrgController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Organisation record deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in deleting Organisation',
            error,
        })
    }
};


//edit and updates
//update donar 
const updateDonarController = async (req, res) => {
    const donorId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedDonor = await userModel.findByIdAndUpdate(donorId, updatedData, {
            new: true, // Returns the updated document
            runValidators: true, // Runs Mongoose validation on the updated data
        });

        if (!updatedDonor) {
            return res.status(404).json({ success: false, message: 'Donor not found' });
        }


        return res.status(200).send({
            success: true,
            message: 'Donar updated successfully'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in updating donar',
            error,
        })
    }

}

//update hospital
const updateHospitalController = async (req, res) => {
    const hospitalId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedHospital = await userModel.findByIdAndUpdate(hospitalId, updatedData, {
            new: true, 
            runValidators: true,
        });

        if (!updatedHospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }

        return res.status(200).send({
            success: true,
            message: 'Hospital updated successfully'
        })
        
       } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in updating hospital',
            error,
        })
    }

}

//update organisation
const updateOrgController = async (req, res) => {
    const orgId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedOrg = await userModel.findByIdAndUpdate(orgId, updatedData, {
            new: true, 
            runValidators: true,
        });

        if (!updatedOrg) {
            return res.status(404).json({ success: false, message: 'Organisation not found' });
        }

        return res.status(200).send({
            success: true,
            message: 'Organisation updated successfully'
        })
        
       } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in updating organisation',
            error,
        })
    }

}

//export
module.exports = {
    getDonarsListController, 
    getHospitalListController, 
    getOrgController, 
    deleteDonarController,
    deleteHospitalController,
    deleteOrgController,
    updateDonarController,
    updateHospitalController,
    updateOrgController
};