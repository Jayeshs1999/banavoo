import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },

    rating: {
        type:Number,
        required: true
    },
    comment: {
        type:String,
        required: true
    },
},{
    timestamps:true
})

const productSchema =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    name: {
        type: String,
        required: false
    },
     email: {
        type:String,
        required: false,
    },
      phoneNumber: {
        type:String,
        required: false,
    },
     projectTitle: {
        type:String,
        required: false,
    },
    description: {
        type:String,
        required: false,
    },
    quantity: {
        type:Number,
        required: false,
    },  
    budget: {
        type:Number,
        required: false,
    },
    deliveryDeadline: {
        type:Date,
        required: false,
    },
    specialInstructions: {
        type:String,
        required: false,
    },
    image: {
        type:String,
        required: false
    },

    description: {
        type:String,
        required: false
    },

    address: {
        type: String,
        required: false,
    },

    status : {
        type: String,
        required: false,
    },
  

}, {
    timestamps:true
});

const Product = mongoose.model("Product", productSchema)

export default Product;