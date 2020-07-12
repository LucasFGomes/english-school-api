const database = require("../models");
const Level = database.Level;

class LevelController {
  static async index(req, res) {
    try {
      const levels = await Level.findAll();
      return res.status(200).json(levels);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const level = await Level.findOne({ where: { id } });

      return res.status(200).json(level);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    try {
      const level = req.body;
      const levelCreated = await Level.create(level);

      return res.status(201).json(levelCreated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const level = req.body;
      const id = req.params.id;

      await Level.update(level, { where: { id } });
      const levelUpdated = await Level.findOne({ where: { id } });

      return res.status(200).json(levelUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    try {
      const id = req.params.id;
      await Level.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: `Level ${id} deletada com sucesso.` });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LevelController;
