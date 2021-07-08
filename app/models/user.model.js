const sql = require("./db.js");

// constructor
const User = function(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.profile = user.profile;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  let reqSql = "INSERT INTO users (firstName, lastName, email, password ) VALUES ? ";
  let record = [[newUser.firstName, newUser.lastName, newUser.email, newUser.password]];
  sql.query(reqSql, [record] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.insertUserProfile = (userId, profileName, result) => {
  sql.query(`INSERT INTO user_profile (profile_id, user_id) VALUES (
    (SELECT id from profile WHERE profile_name = '${profileName}'),
     '${userId}'
     )`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Inserted user profile: ", { user_id: userId, profile: profileName });
    result(null, { user_id: userId, profile: profileName });
  });
};

User.login = (userTmp, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${userTmp.email}' AND password = '${userTmp.password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, password = ?, WHERE id = ?",
    [user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
