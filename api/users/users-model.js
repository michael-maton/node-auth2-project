const db = require("../../database/dbConfig.js");

module.exports = {
  find,
  findById,
  add,
  findBy,
};

function find() {
  return db("users").select("id", "username", "department");
}
function findBy(filter) {
  return db("users").where(filter);
}
function findById(id) {
  return db("users").where("id", id).select("username", "department").first();
}
async function add(user) {
  const newUserId = await db("users").insert(user);
  return findById(newUserId);
}
