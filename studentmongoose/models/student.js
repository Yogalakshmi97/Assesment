const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    productName:{type:String},
    productDesc:{type:String},
    productPrice:{type:String},
    manufacturerDate:{type:Date,default:Date.now},
    expirationDate:{type:Date,default:Date.now},
    barCode:{type:String}
})
module.exports=mongoose.model('Product',productSchema)