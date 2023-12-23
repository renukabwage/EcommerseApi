const Product = require('../models/product');

// function to show all the products
module.exports.products = function(req, res){
    Product.find({})
   .then(foundProducts =>{
    console.log('products details fetched successfully');
    res.send(foundProducts);
   }) 
   .catch(function(err){
        if(err){
            res.send(err);
        }
    });
};





// function to create a new product
module.exports.create = function(req, res){
    console.log(req.body);
    Product.create({
        name: req.body.name,
        quantity: req.body.quantity
    })
    .then(product => {
        console.log('******', product);
        res.send('New product added successfully.');
    })
    .catch(err => {
        console.error('Error in creating a product!', err);
        res.send(err);
    });
   
}

// function to delete a product using it's ID
module.exports.delete = function(req, res){
    Product.deleteOne(
        {_id: req.params.productID})
        .then(() => {
            res.send({
                message: "Product deleted"
            });
        })
        .catch(err=>{
            res.send(err);
        });
       
};

// function to update a product's quantity
module.exports.updateQunatity = function(req, res){
    const ID = req.params.productID;
    // find the product using id
    Product.findById(ID)
    .then(found =>{
        const newQty = parseInt(found.quantity) + parseInt(req.query.number);
        Product.findByIdAndUpdate(ID, {quantity: newQty})
        .then(updatedProduct =>{
            updatedProduct.quantity = newQty;
            res.send({
                product: updatedProduct,
                message: 'updated successfully'
            });
            
        })
    })
    .catch(err =>{
        res.send(err);

    }) ;
   
}