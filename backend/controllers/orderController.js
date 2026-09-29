
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';




// for formatting date 
const formatDateTime = (date) => {
    const d = new Date(date);

    // Date part
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();

    // Time part
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const time = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    return `${day}-${month}-${year} ${time}`;
};


// placing order using Iranian payment gateway
const placeOrder = async (req, res) => {
    try {
        const {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            paymentCode = "",
            paymentGateway = "",
            transactionId = "",
            gatewayReference = "",
            gatewayStatus = "pending",
            gatewayResponse = {}
        } = req.body;

        if (!paymentMethod) {
            return res.json({ success: false, message: "Payment method is required" });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod,
            payment: gatewayStatus === "paid" || gatewayStatus === "success",
            paymentCode,
            paymentGateway,
            transactionId,
            gatewayReference,
            gatewayStatus,
            gatewayResponse,
            date: formatDateTime(Date.now()) 
        };



        const newOrder = new orderModel(orderData)
        await newOrder.save();


        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order saved successfully", orderId: newOrder._id, paymentCode });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}








// all orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}





// user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}







// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { placeOrder, allOrders, userOrders, updateStatus, formatDateTime };


