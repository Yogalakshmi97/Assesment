const Product=require('../../models/product')
module.exports = function(router){
    router.get('/product',function(req,res){
        //res.send("hello");
        Product.find({},(err,product)=>{
            if(err){
                res.json({success:false,message:err});
            }else{
                //check if standup were found in db
                if(!product){
                    res.json({success:false,message:'No Product found.'});
                }else{
                    res.json({success:true,product:product});
                }
            }

        })
    })

    //POST:get new meeting note document
    router.post('/product',function(req,res){
        let note=new Product(req.body)
        note.save(function(err,note){
            if(err){
                return res.status(400).json(err)
            }res.status(200).json(note)
        })
    })
//PUT
router.put('/updateProduct',(req,res)=>{
    if(!req.body._id){
        res.json({success:false,message:'No product id provided'});
        }else{
            Product.findOne({_id:req.body._id},(err,product)=>{
                if(err){
                    res.json({success:false,message:'Not a valid product id'});
                }else{
                    product.productName=req.body.productName;
                    product.productDesc=req.body.productDesc;
                    product.productPrice=req.body.productPrice;
                    product.manufacturerDate=req.body.manufacturerDate;
                    product.expirationDate=req.body.expirationDate;
                    product.barCode=req.body.barCode;
                    product.save((err)=>{
                        if(err){
                            res.json({success:false,message:err});
                        }else{
                            res.json({success:true,message:'product Updated!'});
                        }
                    });
                }
            });
        }
});
//delete
router.delete('/deleteProduct/:id',(req,res)=>{
    //check if ID was provided in parameters
    if(!req.params.id){
        res.json({success:false,message:'No id provided'});//return error
        }else{
            //check if id is found in database
            Product.findOne({_id:req.params.id},(err,product)=>{
                //check if error was found
                if(err){
                    res.json({success:false,message:'Invalid id'});//return error
                }else{
                    //Remove the standup from Database
                    product.remove((err)=>{
                        if(err){
                            res.json({success:false,message:err});//return error message
                        }else{
                            res.json({success:true,message:'Product deleted!'});//Return success message
                        }
                    });
                }
            });
        }
});
}