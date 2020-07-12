const database = require("../models");
const Person = database.Person;
const Registration = database.Registration;
const Class = database.Class;

class PersonController {
  static async index(req, res) {
    try {
      const people = await Person.findAll();
      return res.status(200).json(people);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const person = await Person.findOne({ where: { id } });

      return res.status(200).json(person);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    try {
      const person = req.body;
      const personCreated = await Person.create(person);

      return res.status(201).json(personCreated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const person = req.body;
      const id = req.params.id;
      await Person.update(person, { where: { id } });

      const personUpdated = await Person.findOne({ where: { id } });

      return res.status(200).json(personUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    try {
      const id = req.params.id;
      await Person.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: `Pessoa ${id} deletada com sucesso.` });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async getRegistration(req, res) {
    try {
      const { student_id, registration_id } = req.params;
      const registration = await Registration.findOne({
        where: { id: registration_id, student_id },
      });

      return res.status(200).json(registration);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async createRegistration(req, res) {
    try {
      const student_id = Number(req.params.student_id);
      const registrationSend = { ...req.body, student_id };

      const classFound = await Class.findOne({
        where: { id: registrationSend.class_id },
      });

      const studentFound = await Person.findOne({
        where: { id: student_id, role: "estudante" },
      });

      const errors = PersonController._validations(studentFound, classFound);

      if (errors.length > 0) return res.status(400).json(errors);

      const registration = await Registration.create(registrationSend);

      return res.status(200).json(registration);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async updateRegistration(req, res) {
    try {
      const { student_id, registration_id } = req.params;
      const registration = req.body;
      await Registration.update(registration, {
        where: { id: Number(registration_id), student_id },
      });

      const registrationUpdated = await Registration.findOne({
        where: { id: Number(registration_id) },
      });

      return res.status(200).json(registrationUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroyRegistration(req, res) {
    try {
      const { registration_id } = req.params;
      await Registration.destroy({ where: { id: Number(registration_id) } });

      return res
        .status(200)
        .json({
          message: `Matrícula ${registration_id} deletada com sucesso.`,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static _validations(studentFound, classFound) {
    let errors = [];

    if (!studentFound) {
      errors.push({
        param: "student_id",
        message: "Não é um estudante ou não está cadastrado no sistema.",
      });
    }

    if (!classFound) {
      errors.push({
        param: "class_id",
        message: "Turma não está cadastrada no sistema.",
      });
    }

    return errors;
  }
}

module.exports = PersonController;
