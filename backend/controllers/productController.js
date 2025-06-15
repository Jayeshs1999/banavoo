import  Twilio  from "twilio";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModule.js";
import fisherYatesShuffle from "../routes/suffleBooks.js";



//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts =asyncHandler( async (req,res)=>{
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    const user = req.query.userId;
    const  keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'}} : {}

    // Add userId filter if it is available in the request
    const userIdFilter = user ? { user } : {};
      // Combine all filters
    const filters = { ...keyword, ...userIdFilter };

    const count = await Product.countDocuments(filters);
    if(user) {
        const products = await Product.find(filters)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ updatedAt: -1 });

        res.json({products, page, pages: Math.ceil(count/pageSize)  });
    }else {
        const products = await Product.find(filters)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ updatedAt: -1 })
        .lean() // Convert documents to plain JavaScript objects

    res.json({products:products, page, pages: Math.ceil(count/pageSize)  });
    }
});


//@desc Fetch products by id
//@route GET /api/products/:id
//@access Public
const getProductsById =asyncHandler( async (req,res)=>{
    const product =await Product.findById(req.params.id)
    if(product){
       return res.json(product);
    }else {
        res.status(404);
        throw new Error('Resoure not found')
    }

})

//@desc Create a products
//@route POST /api/products
//@access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const {
    name,
    email,
    phoneNumber,
    projectTitle,
    description,
    quantity,
    budget,
    deliveryDeadline,
    specialInstructions,
    image,
    address,
    status = "Pending",
  } = req.body;

  const product = new Product({
    name,
    email,
    projectTitle,
    description,
    quantity,
    budget,
    deliveryDeadline,
    specialInstructions,
    user: req.user._id,
    image: image || 'https://firebasestorage.googleapis.com/v0/b/bookbucket-5253e.appspot.com/o/images%2F26690.jpg?alt=media&token=91f701e4-4f9f-4552-9c40-fdc86f9e3f66&_gl=1*5qo2th*_ga*MzcyMzM2MzI5LjE2OTI0NTY4ODU.*_ga_CW55HF8NVT*MTY5NzYyOTIzMy4yNC4xLjE2OTc2MjkyNjguMjUuMC4w',
    address,
    phoneNumber,
    status,
  });

  console.log("projectTitle:", product.projectTitle);
  console.log("phoneNumber:", product.phoneNumber);
  console.log("status:", product.status);
  console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

  const messageBody = `Thank you for your order! Your project with title: "${product.projectTitle}" has been received. We will contact you soon at ${product.phoneNumber} to discuss further details.`;

  try {
    const smsResponse = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${product.phoneNumber}`,
    });

    console.log("Message sent successfully:", smsResponse.sid);
  } catch (err) {
    console.error("Failed to send SMS:", err.message);
  }

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update a products
//@route PUT /api/products/:id
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { status = "Pending" } = req.body;
const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const product = await Product.findById(req.params.id);

  if (product) {
    product.status = status;
    const updateProduct = await product.save();

    const messageBody = `Your project with title: "${updateProduct.projectTitle}" has been updated to "${updateProduct.status}". Thank you for choosing us!`;

    try {
      const m = await client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${updateProduct.phoneNumber}`,
      });

      console.log("Message sent successfully:", m);
    } catch (err) {
      console.error("Failed to send SMS:", err.message);
    }

    res.json(updateProduct);
  } else {
    console.log("not send");
    res.status(404);
    throw new Error("Resource not found");
  }
});


//@desc delete a product
//@route DELETE /api/products/:id
//@access Private/admin
const deleteProduct =asyncHandler( async (req,res)=>{

    const product = await Product.findById(req.params.id);

    if(product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: "Product deleted"})
    }else {
        res.status(404);
        throw new Error('Resoure not found')
    }
})

//@desc create new review
//@route POST /api/products/:id/reviews
//@access Private/admin
const createProductReview =asyncHandler( async (req,res)=>{

    const {rating, comment} = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        const alreadyReviewed = product.reviews.find(
            (review)=>review.user.toString()=== req.user._id.toString()
        );
        if(alreadyReviewed) {
            req.status(400);
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }   
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,review)=> acc + review.rating,0)/product.reviews.length;

        await product.save();
        await res.status(201).json({message: 'Review added'})
    }else {
        res.status(404);
        throw new Error('Resoure not found')
    }
})

//@desc GET TOp rated products
//@route GET /api/products/top
//@access Public
const getTopProducts =asyncHandler( async (req,res)=>{
    const products =await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(products)

})


export {getProducts,
    getProductsById, 
    deleteProduct,
    updateProduct, 
    createProductReview,
    getTopProducts,
    createProduct};