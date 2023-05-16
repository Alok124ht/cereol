//-------------------------------------------------------ADDRESSBOOK CRUD OPERATION ---------------------------------------------------

const addressModel = require('../models/addressModel');

const createAddress = async (req, res) => {
  try {
    let data = req.body
    let {title,addressLine1,addressLine2,country,state,city,pincode,}= data 

      let addressData = {title,
        addressLine1,
        addressLine2,
        country,
        state,
        city,
        pincode,}

        const address = await addressModel.create(addressData)
       return  res.status(201).send({status :true, message : "addresscreated", data : address})
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};



////    get all 

    const getAllAddress = async function getAllAddresses(req, res) {
  try {
    const alladdresses = await addressModel.find();
     return res.status(201).send({status: true , message:" All address get ", data :alladdresses})
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

//------------------------------------GET Single Address-----------------------------------------------------------------////


const getAddressById=async function getAddressById(req, res) {
  try {
    const address = await addressModel.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createAddress,getAllAddress,getAddressById
};
