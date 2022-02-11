const basketModel = require("../models/basketModel")
const pantryModel = require("../models/pantryModel")
var _ = require('lodash');

const createBasket = async function (req, res) {
    try {

        let pantryId = req.params.PANTRYID
        let basketName = req.params.BASKETNAME

        const basketData = req.body

        let data = {name: basketName, pantryId: pantryId, data: basketData}

        let validpantryId = await pantryModel.findOne({pantryId: pantryId});

        if (validpantryId) {
            let basketExists = await basketModel.findOne({ pantryId: pantryId, name: basketName})

            if(basketExists){
                let updatedBasket = await basketModel.findOneAndUpdate({pantryId: pantryId, name: basketName},{data: basketData},{ new: true }).select({ name: 1, data: 1, _id: 0 })
                
                res.status(201).send({status: true, message: `Your Pantry was updated with basket: ${basketName}!`, data: updatedBasket});
            } else {
            
           // checking wheather the pantry is 100% full
            if(validpantryId.percentFull === 100){
                return res.status(507).send({status: false, message: "your pantry has reached its maximum capacity, storage 100% full!"})
            }
            let savedData = await basketModel.create(data)

            await pantryModel.findOneAndUpdate({pantryId: pantryId}, {$inc : {percentFull: 1}})

            res.status(201).send({status: true, message: `Your Pantry was updated with basket: ${basketName}!`, data: {name: savedData.name, data: savedData.data}});
            }
        }
        else {
            res.status(400).send({ status: false, message: "Please input correct pantry ID" });
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message});
    }
}

const basketDetails = async function (req, res) {
    try {
        const pantryId = req.params.PANTRYID
        const basketName = req.params.BASKETNAME

        let validpantryId = await pantryModel.findOne({ pantryId: pantryId });

        if (validpantryId) {
            let basketFound = await basketModel.findOne({pantryId: pantryId, name: basketName})

            if (basketFound) {
                res.status(200).send({ status: true, message: 'Basket details', data: basketFound.data })
            } 
            else {
                return res.status(400).send({ status: false, message: `${basketName} Basket not found` })
            }

        } else {
            res.status(400).send({ status: false, message: "Please input correct pantry ID" });
        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const updateBasket = async function (req, res) {
    try {

        const pantryId = req.params.PANTRYID
        const basketName = req.params.BASKETNAME

        let validpantryId = await pantryModel.findOne({ pantryId: pantryId });

        if (validpantryId) {
            const basketDataToUpdate = req.body

            let basketData = await basketModel.findOne({pantryId: pantryId, name: basketName})

            if (basketData) {
                //customizer to check for array and concat.
                function customizer(objValue, srcValue) {
                    if (_.isArray(objValue)) {
                        return objValue.concat(srcValue);
                    }
                }
                    //using lodash to perform deep merge with a customizer
                  let mergedData = _.mergeWith(basketData.data, basketDataToUpdate, customizer);

                let updatedBasket = await basketModel.findOneAndUpdate({pantryId: pantryId, name: basketName}, { data: mergedData }, { new: true }).select({ name: 1, data: 1, _id: 0 })
                
                res.status(200).send({ status: true, message: `${basketName} updated successfully`, data: updatedBasket })
            } else {
                return res.status(400).send({ status: false, message: `${basketName} Basket not found` })
            }
        } else {
            res.status(400).send({ status: false, message: "Please input correct pantry ID" });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const deleteBasket = async function (req, res) {
    try {
        const pantryId = req.params.PANTRYID
        const basketName = req.params.BASKETNAME

        const validpantryId = await pantryModel.findOne({pantryId: pantryId});

        if (validpantryId) {
            let basketToDelete = await basketModel.findOne({ pantryId: pantryId, name: basketName })

            if (basketToDelete) {
                await basketModel.findOneAndDelete({ pantryId: pantryId, name: basketName })

                await pantryModel.findOneAndUpdate({ pantryId: pantryId}, { $inc: { percentFull: -1 } })

                res.status(200).send({ status: true, message: `${basketName} sucessfully deleted` })

            } else {
                return res.status(400).send({ status: false, message: `${basketName} Basket not found` })
            }
        } else {
            res.status(400).send({ status: false, message: "Please input correct pantry ID" });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports = {createBasket, basketDetails, updateBasket, deleteBasket}