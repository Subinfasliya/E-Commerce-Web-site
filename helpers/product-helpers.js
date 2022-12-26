var db =require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectId
module.exports={
    

   addProduct:(product,callback)=>{
   

    db.get().collection('product').insertOne(product).then((data)=>{
        callback(data.insertedId)
    })
   },
   getAllProducts:()=>{
    return new Promise(async (resolve,reject)=>{
        let products= await db.get().collection(collection.PRODUCT_COLLCETION).find().toArray()
        resolve(products)
    })

   },
   deleteProduct:(prodId)=>{
       return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLCETION).deleteOne({_id:objectId(prodId)}).then((response)=>{
           
            resolve(response)
        })
       })
   },
   getProductDetails:(proId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLCETION).findOne({_id:objectId(proId)}).then((product)=>{
            resolve(product)
        })
    })
   },
   updateProduct:(proId,proDetails)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLCETION)
        .updateOne({_id:objectId(proId)},{
            $set:{
                Name:proDetails.Name,
                Description:proDetails.Description,
                Price:proDetails.Price,
                Category:proDetails.Category
            }
        }).then((response)=>{
            resolve()
        })
    })
   }


       

}
