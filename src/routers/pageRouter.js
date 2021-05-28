"use strict";
const { Router } = require("express");
const router = Router();

/**@Views 🎨*/
router.get("/", ( req, res ) => res.render("test"));
router.get("/maps", ( req, res ) => res.render("index"));
router.get("/maps/show-place", ( req, res ) => res.render("showPlaces"));
router.get("/maps/show-place-name", ( req, res ) => res.render("showPlacesName"));
router.get("/maps/show-list", ( req, res ) => res.render("showList"));

module.exports = router;

//http://localhost:8000/maps/show-place?type=allsearch&lat=35.0207316&lon=126.792788&placeName=restaurants