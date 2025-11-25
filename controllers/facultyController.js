const Faculty = require("../models/Faculty/Faculty");
const University = require("../models/University/University");

const getFacultiesPage = async (req, res) => {
    const faculties = await Faculty.find().populate("university");
    res.render("faculties/index", { faculties });
};

const getCreatePage = async (req, res) => {
    const universities = await University.find();
    res.render("faculties/new", { universities });
};

const createFaculty = async (req, res) => {
    const { name, address, universityId } = req.body;

    const faculty = await Faculty.create({
        name,
        address,
        university: universityId
    });

    await University.findByIdAndUpdate(universityId, {
        $push: { faculties: faculty._id }
    });

    res.redirect("/faculties");
};

const getEditPage = async (req, res) => {
    const faculty = await Faculty.findById(req.params.id);
    const universities = await University.find();
    res.render("faculties/edit", { faculty, universities });
};

const updateFaculty = async (req, res) => {
    const { name, address, universityId } = req.body;

    const faculty = await Faculty.findById(req.params.id);
    if (faculty.university.toString() !== universityId) {
        await University.findByIdAndUpdate(faculty.university, {
            $pull: { faculties: faculty._id }
        });

        await University.findByIdAndUpdate(universityId, {
            $push: { faculties: faculty._id }
        });
    }

    await Faculty.findByIdAndUpdate(req.params.id, {
        name,
        address,
        university: universityId
    });

    res.redirect("/faculties");
};

const deleteFaculty = async (req, res) => {
    const faculty = await Faculty.findById(req.params.id);

    await University.findByIdAndUpdate(faculty.university, {
        $pull: { faculties: faculty._id }
    });

    await Faculty.findByIdAndDelete(req.params.id);

    res.redirect("/faculties");
};

module.exports = {
    getFacultiesPage,
    getCreatePage,
    createFaculty,
    getEditPage,
    updateFaculty,
    deleteFaculty
};
