import express from "express";
import { prisma } from "../../db/index.js";

const router = express.Router();

// #### Create a new hotel:
// #### POST /hotels
router.post("/", async (req, res) => {
  try {
    const data = await prisma.hotel.create({
      data: {
        name: req.body.name || '',
        address: req.body.address || '',
        city: req.body.city || '',
        state: req.body.state || '',
        country: req.body.country || '',
        phone: req.body.phone || '',
        email: req.body.email || '',
        website: req.body.name || "",
        description: req.body.description || '',
        star_rating: req.body.star_rating || 0,
        amenitites: req.body.amenitites || [],
      },
    });

   res.status(201).json({
    success:true
   })
  } catch (error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Something went wrong",
      
    })
  }
});

export default router;
