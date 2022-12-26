var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelper =require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {

productHelper.getAllProducts().then((products)=>{
  console.log(products);

  res.render('admin/view-products',{admin:true,products})

})

 

});
 

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  console.log(req.body);
 console.log(req.files.Image);

  productHelper.addProduct (req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product')
        
      }else{
        console.log(err);
      }
    })

  })
   
  })

router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })

})

router.get('/edit-product/:id',async (req,res)=>{
  let product=await productHelper.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
   productHelper.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
    let image=req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')

    }
   })
})
module.exports = router;
