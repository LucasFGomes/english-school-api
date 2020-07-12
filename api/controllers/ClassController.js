const database = require("../models");
const Class = database.Class;
const Person = database.Person;
const Level = database.Level;

class ClassController {
  static async index(req, res) {
    try {
      const classes = await Class.findAll();
      return res.status(200).json(classes);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const classFound = await Class.findOne({ where: { id } });

      return res.status(200).json(classFound);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    try {
      const classSent = req.body;

      const { teacher_id, level_id } = classSent;

      const teacherFound = await Person.findOne({
        where: { id: teacher_id, role: "docente" },
      });
      const levelFound = await Level.findOne({ where: { id: level_id } });

      const errors = ClassController._validations(teacherFound, levelFound);

      if (errors.length > 0) return res.status(404).json(errors);

      const classCreated = await Class.create(classSent);
      return res.status(201).json(classCreated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const classSend = req.body;
      const id = req.params.id;

      const { teacher_id, level_id } = classSend;

      if (teacher_id || level_id) {
        const teacherFound = await Person.findOne({
          where: { id: teacher_id, role: "docente" },
        });
        const levelFound = await Level.findOne({ where: { id: level_id } });
        ClassController._validations(teacherFound, levelFound);
      }

      await Class.update(classSend, { where: { id } });
      const classUpdated = await Class.findOne({ where: { id } });

      return res.status(200).json(classUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    try {
      const id = req.params.id;
      await Class.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: `Turma ${id} deletada com sucesso.` });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static _validations(teacherFound, levelFound) {
    let errors = [];

    if (!teacherFound) {
      errors.push({
        param: "teacher_id",
        message: "Não é um professor ou não está cadastrado no sistema.",
      });
    }

    if (!levelFound) {
      errors.push({
        param: "level_id",
        message: "Nível não está cadastrado no sistema.",
      });
    }

    return errors;
  }
}

module.exports = ClassController;
