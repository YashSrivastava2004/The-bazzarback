const CartItem = require("../models/ViewCart");



async function createCartItems(req,res){
    try{
        const productId=req.body.productId;
        const title=req.body.title;
        const price=req.body.price;
        const discount=req.body.discount;
        const discountedPrice=req.body.discountedPrice;
        const quantity=req.body.quantity;
        // const imageSrc=req.body.image.src;
        //use this if your format is this
        // "image":{
        //     "src": "https://images.pexels.com/photos/18489099/pexels-photo-18489099/free-photo-of-man-in-white-shirt-with-book-in-hands.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        // }
        const imageSrc=req.body.image;
        

        const addInCart=await CartItem.create({
            productId,
            title,
            price,
            discount,
            discountedPrice,
            image: imageSrc,
            quantity
        })

        res.status(200).json({
            success:true,
            msg:"Item added in cart successfully",
            data:addInCart,
            productDetails: {
                productId,
                title,
                price,
                discount,
                discountedPrice,
                image: imageSrc,
                quantity
            }
        })

    }
    catch(error){
        console.log("Error in view cart:")
        console.log(error)
    }
}



async function getAllCartItems(req,res){
    try{
        const allCartItems=await CartItem.find({

        })
        res.status(200).json({
            success: true,
            msg:"all cart items fetched successfully",
            allCartItems
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            msg:"Server error failed to get all cart items"
        })
    }
}


async function deleteCartItem(req,res){
    try{
        const itemId = req.body.id;
        const deleteCart=await CartItem.findByIdAndDelete({
            _id:itemId
        })

        res.status(200).json({
            success:true,
            msg:"Item deleted successfully",
            data:deleteCart
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            msg:"Server Error failed to delete the item"

        })
    }
}


module.exports={createCartItems,getAllCartItems,deleteCartItem}
//router.post requries a call back function
