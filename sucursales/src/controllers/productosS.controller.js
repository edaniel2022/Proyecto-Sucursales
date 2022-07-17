"use strict";

const ProductoS = require("../models/productsS.model");
const ProductsC = require("../models/productsC.model");
const { validateData } = require("../utils/validate");

exports.createProduct = async (req, res) => {
  try {
    const idP = req.params.id;
    const params = req.body;
    const alreadyProduct = await ProductsC.findOne({ _id: idP });
    if(!alreadyProduct) return res.status(404).send({message:'Not found'});
    let data = {
      name: alreadyProduct.nameProduct,
      stock: params.stock,
      idSucursal: params.idSucursal,
    };
    let msg = validateData(data);
    if (msg) return res.send(msg);
    data.cantidadV = params.cantidadV;
    const already = await ProductoS.findOne({ name: data.name });
    let stockC = alreadyProduct.stock - parseInt(params.stock);
    let stockT;
    if(already == null) {
      stockT = 0 + parseInt(params.stock);
    }else{
      stockT = already.stock + parseInt(params.stock);
    }
    
    if (stockC < 0) {
      stockC = alreadyProduct.stock - (stockC + parseInt(params.stock));
      stockT = already.stock + alreadyProduct.stock;
    }
    

    await ProductsC.findOneAndUpdate(
      { _id: idP },
      { stock: stockC },
      { new: true }
    );
    if (already) {
      const product = await ProductoS.findOneAndUpdate(
        { _id: already._id },
        { stock: stockT },
        { new: true }
      );
      if (product) return res.send({ message: "Product saved" });
    } else {
      let productoS = new ProductoS(data);
      await productoS.save();
      return res.send({ message: "Product created", productoS });
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.getProduct = async(req, res) =>{
  try{
    const officeId = req.params.id;
    const productS = await ProductoS.find({idSucursal: officeId}).sort({stock: -1})
    const name = await ProductoS.find().select('-_id name');
    const stock = await ProductoS.find().select('-_id stock');
    return res.send({message: 'Products Found:', productS, name, stock});
  }catch(err){
    console.log(err);
        return err;
  }
}
