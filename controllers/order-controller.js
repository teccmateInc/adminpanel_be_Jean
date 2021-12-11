const { status } = require("express/lib/response");
const { strictValidArrayWithMinLength, handleError, strictValidObjectWithKeys } = require("../helper/utils");
const Order = require("../models/order-model");

exports.getAllOrders=async(req,res,next)=>{
    try {
        const orders=await Order.find()
        if(strictValidArrayWithMinLength(orders,1))
        {
            res.status(204).json({
                success:true,
                orders
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"nothing in Orders"
            })
        }
    } catch (err) {
        handleError(res,"Orders not found")        
    }
}

exports.getOrder=async(req,res,next)=>{
    try {
        const order=await Order.findById(req.params.orderId)
        if(strictValidObjectWithKeys(order)){
            res.status(200).json({
                success:true,
                order
            })
        }
        else{
            res.status(204).json({
                suucess:false,
                message:"No Content"
            })
        }
    } catch (err) {
        handleError(res,"Something went Wrong")
    }
}

exports.createOrder=async(req,res,next)=>{
    try{
    const {vaccine,notes,position,status_lead,sent_profile,user}=req.body
    const order=await Order.create({email,vaccine,notes,position,status_lead,sent_profile,user})
    order.save((err)=>{
        if(err)
        status(400).json({
            success:false,
            message:"Bad Request"
        })
    })
    res.status(201).json({
        success:true,
        message:"Order Created successfully"
    })
}
    catch(err){
        handleError(res,"order not created")
    }
}

exports.updateOrder=async(req,res,next)=>{
    try {
        let order=await Order.findById(req.params.orderId)
        if(strictValidObjectWithKeys(order)){
            order=await Order.findByIdAndUpdate(req.params.orderId,req.body,{new:true,runValidators:true,useFindAndModify:false})
            order.save((err)=>{
            if(err){
              handleError(res,"Bad Request")  
            }})
            res.status(200).json({
                success:true,
                message:"order Updated successfully",
                order
            })
        }
        else{
            res.status(204).json({
                suucess:false,
                message:"No Content"
            })
        }
    } catch (err) {
        handleError(res,"Something went Wrong")
    }
}

exports.deleteOrder=async(req,res,next)=>{
    try{
        let order=await Order.findById(req.params.orderId)
        if(strictValidObjectWithKeys(order)){
            order=await Order.findByIdAndDelete(req.params.orderId)
        }
        else{
            res.status(204).json({
                suucess:false,
                message:"No Content"
        })
}}
    catch(err){
        handleError(res,"Error")
    }
}
