const express = require("express");
const router = express.Router();

const {
    getFacultiesPage,
    getCreatePage,
    createFaculty,
    getEditPage,
    updateFaculty,
    deleteFaculty
} = require("../controllers/facultyController");

router.get("/", getFacultiesPage);
router.get("/new", getCreatePage);
router.get("/:id/edit", getEditPage);

router.post("/", createFaculty);
router.post("/:id/update", updateFaculty);
router.post("/:id/delete", deleteFaculty);

module.exports = router;
