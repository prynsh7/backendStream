import asyncHandler from "express-async-handler";
import express from 'express';
import AddOn from "../models/addOnsSchema.js";

const router = express.Router();



router.route('/add').post(async (req, res) => {
  const addOn = new AddOn({
    "name": req.body.name,
    "description": req.body.description,
    "price": req.body.price,
    "type": req.body.type,
    "coupons": req.body.coupons,
    "trial": req.body.trial,
    "active": req.body.active
  });

  const createdEntry = await addOn.save();
  res.json(createdEntry);
})



router.route('/').get(async (req, res) => {

  const addon = await AddOn.find();

  if (addon) {
    res.json({
      code: 200,
      success: true,
      data: addon
    });
  } else {
    res.status(404).json({
      code: 404,
      success: false,
      message: "no Addon",
    });
  }

})



// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.route('/delete/:id').delete(async (req, res) => {
  const addon = await AddOn.findById(req.params.id);
  if (addon) {
    await addon.remove();
    res.json({
      code: 200,
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});



// @desc    Update a addon
// @route   Update /api/addon/update/:id
// @access  Private/Admin
router.route('/update/:id').put(async (req, res) => {
  const { name, price, description, type, active } = req.body;

  const addon = await AddOn.findById(req.params.id);

  if (addon) {
    addon.active = active;

    const updatedAddon = await addon.save();
    res.json({
      code: 200,
      message: "addon updated succesfully",
      data: updatedAddon,
    });
  } else {
    res.status(404);
    throw new Error("addon not found");
  }
});







export default router;
