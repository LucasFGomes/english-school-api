module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "levels",
      [
        {
          description: "BÁSICO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "INTERMEDIÁRIO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "AVANÇADO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("levels", null, {});
  },
};
