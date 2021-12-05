const express = require("express");

const routes = express.Router();

const User = require("./controllers/userController");
const Company = require("./controllers/companyController");
const Calendar = require("./controllers/calendarController");
const Seller = require("./controllers/sellerController");

routes.get("/", User.index);

// USER ROUTES
routes.post("/api/users", User.create);
routes.post("/api/users/login", User.login);

routes.put("/api/users", User.update);

routes.get("/api/users", User.index);
routes.get("/api/users.details/:_id", User.details);
routes.get("/api/users/checktoken", User.checkToken);
routes.get("/api/users/destroytoken", User.destroyToken);

routes.delete("/api/users/:_id", User.delete);

// COMPANY ROUTES
routes.post("/api/companies", Company.create);

routes.put("/api/companies", Company.update);

routes.get("/api/companies", Company.index);
routes.get("/api/companies.details/:_id", Company.details);

routes.delete("/api/companies/:_id", Company.delete);

// CALENDAR ROUTES
routes.post("/api/calendars", Calendar.create);

routes.put("/api/calendars", Calendar.update);

routes.get("/api/calendars", Calendar.index);
routes.get("/api/calendars.details/:_id", Calendar.details);

routes.delete("/api/calendars/:_id", Calendar.delete);

// SELLER ROUTES

routes.post("/api/sellers", Seller.create);

routes.put("/api/sellers", Seller.update);

routes.get("/api/sellers", Seller.index);
routes.get("/api/sellers.details/:_id", Seller.details);

routes.delete("/api/sellers/:_id", Seller.delete);

module.exports = routes;
