import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    items: {type:Array, required:true},
    amount: {type:Number, required:true},
    address: {type:Object, required:true},
    status: {type:String, required:true, default: 'Order Placed'},
    paymentMethod: {type:String, required:true},
    payment: {type:Boolean, required:true, default: false},
    paymentCode: {type:String, default: ''},
    paymentGateway: {type:String, default: ''},
    transactionId: {type:String, default: ''},
    gatewayReference: {type:String, default: ''},
    gatewayStatus: {type:String, default: 'pending'},
    gatewayResponse: {type:Object, default: {}},
    date: {type:String, required:true}
 
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
