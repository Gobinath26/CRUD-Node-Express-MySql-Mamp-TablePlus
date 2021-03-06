const mysql = require("mysql");

//MySql
// const con = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

//MySql
const connection = mysql.createConnection({
  host    : process.env.DB_HOST,
  user    : process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//Check Database Connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

// exports.view = (req, res) => {
//   con.getConnection((err, connection) => {
//     if (err) throw err;
//     // console.log("Connection Success");
//     connection.query("select * from users", (err, rows) => {
//       connection.release();
//       if (!err) {
//         // console.log("Good ");
//         res.render("home", { rows });
//       } else {
//         console.log("Error in Listing Data" + err);
//       }
//     });
//   });
// };

exports.view = (req, res) => {
    // console.log("Connection Success");
    connection.query("select * from users", (err, rows) => {
      if (!err) {
        // console.log("Good ");
        res.render("home", { rows });
      } else {
        console.log("Error in Listing Data" + err);
      }
    });
};

exports.adduser = (req, res) => {
  res.render("adduser");
};

// exports.save = (req, res) => {
//   con.getConnection((err, connection) => {
//     if (err) throw err;
//     const { name, age, city } = req.body;
//     // console.log("Connection Success");
//     connection.query(
//       "insert into users (NAME,AGE,CITY) values (?,?,?)",
//       [name, age, city],
//       (err, rows) => {
//         connection.release();
//         if (!err) {
//           // console.log("Good ");
//           res.render("adduser", { msg: "User Details Added Success" });
//         } else {
//           console.log("Error in Listing Data" + err);
//         }
//       }
//     );
//   });
// };

exports.save = (req, res) => {
    const { name, age, city } = req.body;
    // console.log("Connection Success");
    connection.query(
      "insert into users (NAME,AGE,CITY) values (?,?,?)",
      [name, age, city],
      (err, rows) => {
        if (!err) {
          // console.log("Good ");
          res.render("adduser", { msg: "User Details Added Success" });
        } else {
          console.log("Error in Listing Data" + err);
        }
      }
    );
};

// exports.edituser = (req, res) => {
//   con.getConnection((err, connection) => {
//     if (err) throw err;
//     //Get ID from url
//     let id = req.params.id;
//     // console.log("Connection Success");
//     connection.query("select * from users where id=?", [id], (err, rows) => {
//       connection.release();
//       if (!err) {
//         // console.log("Good ");
//         res.render("edituser", { rows });
//       } else {
//         console.log("Error in Listing Data" + err);
//       }
//     });
//   });
// };

exports.edituser = (req, res) => {
    //Get ID from url
    let id = req.params.id;
    // console.log("Connection Success");
    connection.query("select * from users where id=?", [id], (err, rows) => {
      if (!err) {
        // console.log("Good ");
        res.render("edituser", { rows });
      } else {
        console.log("Error in Listing Data" + err);
      }
    });
};

// exports.edit = (req, res) => {
//   con.getConnection((err, connection) => {
//     if (err) throw err;
//     const { name, age, city } = req.body;
//     //Get ID from url
//     let id = req.params.id;
//     // console.log("Connection Success");
//     connection.query(
//       "update users set NAME=?,AGE=?,CITY=? where ID=?",
//       [name, age, city, id],
//       (err, rows) => {
//         connection.release();
//         if (!err) {
//           con.getConnection((err, connection) => {
//             if (err) throw err;
//             //Get ID from url
//             let id = req.params.id;
//             // console.log("Connection Success");
//             connection.query(
//               "select * from users where id=?",
//               [id],
//               (err, rows) => {
//                 connection.release();
//                 if (!err) {
//                   // console.log("Good ");
//                   res.render("edituser", {
//                     rows,
//                     msg: "User Details Updated Success",
//                   });
//                 } else {
//                   console.log("Error in Listing Data" + err);
//                 }
//               }
//             );
//           });
//           // console.log("Good ");
//         } else {
//           console.log("Error in Listing Data" + err);
//         }
//       }
//     );
//   });
// };

exports.edit = (req, res) => {
    const { name, age, city } = req.body;
    //Get ID from url
    let id = req.params.id;
    // console.log("Connection Success");
    connection.query(
      "update users set NAME=?,AGE=?,CITY=? where ID=?",
      [name, age, city, id],
      (err, rows) => {
        if (!err) {
            //Get ID from url
            let id = req.params.id;
            // console.log("Connection Success");
            connection.query(
              "select * from users where id=?",
              [id],
              (err, rows) => {
                if (!err) {
                  // console.log("Good ");
                  res.render("edituser", {
                    rows,
                    msg: "User Details Updated Success",
                  });
                } else {
                  console.log("Error in Listing Data" + err);
                }
              }
            );
        } else {
          console.log("Error in Listing Data" + err);
        }
      }
    );
};

// exports.delete = (req, res) => {
//   con.getConnection((err, connection) => {
//     if (err) throw err;
//     //Get ID from url
//     let id = req.params.id;
//     // console.log("Connection Success");
//     connection.query("delete from users where id=?", [id], (err, rows) => {
//       connection.release();
//       if (!err) {
//         // console.log("Good ");
//         res.redirect("/");
//       } else {
//         console.log(err);
//       }
//     });
//   });
// };

exports.delete = (req, res) => {
    //Get ID from url
    let id = req.params.id;
    // console.log("Connection Success");
    connection.query("delete from users where id=?", [id], (err, rows) => {
      if (!err) {
        // console.log("Good ");
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
};