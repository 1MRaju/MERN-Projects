const mongoose = require("mongoose");
// import Donar from './../../blood-bank/src/Pages/Dashboard/Donar';
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//Create Inventory
const createInventoryController = async (req,res) => {
    try {
        const {email} = req.body
        //validation
        const user = await userModel.findOne({email})
        if(!user){
             throw new Error('User Not Found')
        }
        // if(inventoryType === 'in' && user.role !== 'donar'){
        //      throw new Error('Not a donor account')
        // }
        // if(inventoryType === 'out' && user.role !== 'hospital'){
        //      throw new Error('Not a hospital')
        // }

        if (req.body.inventoryType == "out"){
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);

            //calculate blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                 {
                    $match: {
                    organisation,
                    inventoryType:'in',
                    bloodGroup:requestedBloodGroup,
                    },
                },
                {
                    $group: {
                    _id:"$bloodGroup",
                    total:{$sum: '$quantity'},
                     },
                 },
            ]);
        //   console.log('Total In', totalInOfRequestedBlood);
            const totalIn =  totalInOfRequestedBlood[0]?.total || 0

               //calculate out blood quantity
               const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match:{
                    organisation,
                    inventoryType:'out',
                    bloodGroup:requestedBloodGroup,
                    },
                },
                {
                    $group:{
                    _id:'$bloodGroup',
                    total: {$sum : '$quantity'},
                    },
                },
               ])
               const totalOut =  totalOutOfRequestedBloodGroup[0]?.total || 0;

               //calculation for in & out
               const availableQuantityOfBloodGroup = totalIn - totalOut;

               //quantity validation
               if(availableQuantityOfBloodGroup < requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message:`Only ${availableQuantityOfBloodGroup} ml of ${requestedBloodGroup.toUpperCase()} is available`
                });
               }
               req.body.hospital = user?._id;
        } else{
            req.body.donar = user?._id;
        }
    
        //save record
        const inventory  = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success : true,
            message :'New Blood Record Added'
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in create Inventory API',
            error
        })
        
    }
};

//get all blood records
const getInventoryController = async (req,res)=>{
    try {
        const inventory = await inventoryModel.find({organisation:req.body.userId}).populate("donar").populate("hospital").sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"get all records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error In Get Inventory",
            error
        })
    }
};

//get hospital blood records
const getInventoryHospitalController = async (req,res)=>{
    try {
        const inventory = await inventoryModel
        .find(req.body.filters)
        .populate("donar")
        .populate("hospital")
        .populate("organisation")
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"get hospital consumer records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error In Get consumer Inventory",
            error,
        })
    }
};

//get top 3 blood records
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation:req.body.userId
        }).limit(3).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:'Recent Inventory Data',
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error In Recent Inventory API',
            error
        })
    }
}

//get donar records
const getDonarsController = async (req, res) =>{
    try {
       const organisation = req.body.userId
       //find donars
       const donorId = await inventoryModel.distinct("donar", {
        organisation,
       }) ;
    //    console.log(donorId);
       const donars = await userModel.find({_id: {$in: donorId}})
       return res.status(200).send({
        success: true,
        message: 'Donar record fetched successfully',
        donars,
       })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Donar records',
            error
        })
    }
}

//get hospital records
const getHospitalController = async (req, res) =>{
    try {
        const organisation = req.body.userId

        //het hospital ID
        const hospitalID=await inventoryModel.distinct('hospital',{organisation})

        //find hospital
        const hospitals = await userModel.find({
            _id: {$in: hospitalID}
        })
        return res.status(200).send({
            success :true ,
            message:'Hospital data fetched successfully',
            hospitals,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in  get Hospital API',
            error
    })
}

}


//get organisation profiles
 const getOrganisationController = async (req, res) =>{
   try {
    const donar = req.body.userId
    const orgId = await inventoryModel.distinct('organisation', {donar})
    
    //find org
    const organisations =  await userModel.find({
        _id: {$in: orgId}
    })
    return res.status(200).send({
        success : true ,
        message:"Orgnization profile data fetched successfully",
        organisations,
    })
   } catch (error) {
    console.log(error);
    return res.status(500).send({
        success: false,
        message: 'Error in organisation API',
        error
   })
  }
 }

 //get organisation profiles for hospital
 const getOrganisationForHospitalController = async (req, res) =>{
    try {
     const hospital = req.body.userId
     const orgId = await inventoryModel.distinct('organisation', {hospital})
     
     //find org
     const organisations =  await userModel.find({
         _id: {$in: orgId}
     })
     return res.status(200).send({
         success : true ,
         message:"Orgnization profile for hospital data fetched successfully",
         organisations,
     })
    } catch (error) {
     console.log(error);
     return res.status(500).send({
         success: false,
         message: 'Error in organisation for hospital API',
         error
    })
   }
  }


module.exports = {
    createInventoryController, 
    getInventoryController, 
    getDonarsController,
    getHospitalController,
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
};