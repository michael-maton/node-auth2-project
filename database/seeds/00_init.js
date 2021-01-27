exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const departments = [
    {
      name: "physics", // will get id 1
    },
    {
      name: "religious studies", // will get id 2
    },
  ];

  return knex("departments")
    .insert(departments)
    .then(() => console.log("\n== Seed data for departments table added. ==\n"));
};
