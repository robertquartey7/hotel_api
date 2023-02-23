import express from "express";
import { prisma } from "../../db/index.js";

const router = express.Router();

//GET /hotels
router.get("/", async (req, res) => {
  if (Object.keys(req.query) <= 0) {
    try {
      const data = await prisma.hotel.findMany({
        include: {
          room: true,
        },
      });

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    //GET /hotels?location=New%20York&price_range=100-200
    console.log(req.query);
    try {
      const location = req.query.location || null;
      const price_range = req.query.price_range || null;

      if (!location) {
        const data = await prisma.hotel.findMany({
          where: {
            address: {
              contains: location,
            },
          },
        });
        res.status(200).json({
          success: true,
          data,
        });
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  }
});

//Get details of a specific hotel:
//GET /hotels/:id
router.get("/:id", async (req, res) => {
  try {
    const data = await prisma.hotel.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        room: true,
      },
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "NOT FOUND",
    });
  }
});

export default router;
