import express from "express";
import setupJWTStrategy from "./controllers/auth/index.js";
import authRoutes from "./controllers/routes/authRoutes.js";
import passport from "passport";
import getHotelRoutes from "./controllers/routes/getHotelRoutes.js";
import postHotelRoutes from './controllers/routes/postHotelRoutes.js'
export default async function createServer() {
  const app = express();

  app.use(express.json());

  setupJWTStrategy(passport);

  app.use("/auth", authRoutes);
  app.use(
    "/hotel",

    // passport.authenticate("jwt", {
    //   session: false,
    // }),
    getHotelRoutes
  );
  app.use("/hotel", postHotelRoutes)

  return app;
}
