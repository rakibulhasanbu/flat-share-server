import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { FlatsRoutes } from "../modules/flats/flats.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: FlatsRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
