const bucketModel = require("../models/basketModel")
const pantryModel = require("../models/pantryModel")
const crypto = require('crypto'); //built in library of node.js

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createPantry = async function (req, res){
    try{

        const requestbody = req.body;
        
        if (!isValidRequestBody(requestbody)) {
            return res.status(400).send({ status: false, message: 'Please provide details in request body' })
        }

        let {email, name} = requestbody;

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
        }

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'Pantry name is required' })
        }
          
        let pantryId = crypto.randomUUID();

        const pantrydata = {email, name, pantryId}

        let data = await pantryModel.create(pantrydata)

        res.status(201).send({status: true, pantryId: data.pantryId, message: `${name} sucessfully created, please save the above pantry ID` })

    }
    catch(err){
        res.status(500).send({status: false, message: err.message})
    }
}

const getAllPantryDetails = async function (req, res) {
    try {
        let pantryId = req.params.PANTRYID

        let pantryDetail = await pantryModel.findOne({ pantryId: pantryId }).select({ _id: 0, pantryId: 0, email: 0, createdAt: 0, updatedAt: 0, __v: 0})

        if (!pantryDetail) {
            return res.status(400).send({ status: false, message: "Pantry not found" })
        }

        pantryDetail = pantryDetail.toObject();

        let basketData = await bucketModel.find({ pantryId: pantryId }).select({ name: 1, ttl: 1, _id: 0 })

        pantryDetail.baskets = basketData

        res.status(200).send({ status: true, message: 'Pantry details', data: pantryDetail })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {createPantry, getAllPantryDetails}