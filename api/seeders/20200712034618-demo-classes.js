module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "classes",
      [
        {
          date_initial: "2020-02-01",
          level_id: 1,
          teacher_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_initial: "2020-02-01",
          level_id: 2,
          teacher_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_initial: "2020-02-01",
          level_id: 3,
          teacher_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_initial: "2020-07-01",
          level_id: 3,
          teacher_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("classes", null, {});
  },
};
