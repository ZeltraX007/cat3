var express = require('express');
var router = express.Router();
const mysql=require("../connection").con

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Infosys SpringBoard' });
});

router.get("/register", (req,res, next) =>{
  res.render("register");
});

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/delete",(req,res,next) => {
  res.render("delete");
});

router.get("/addemp", (req,res,next) => {
  // fetching data from form
  const { empid,empname, empdesig, empdept, empsalary,emplocation } = req.query

  // Sanitization XSS...
  let qry = "select * from spring where empid=?";
  mysql.query(qry, [empid], (err, results) => {
      if (err)
          throw err
      else {

          if (results.length > 0) {
              res.render("register", { checkmesg: true })
          } else {

              // insert query
              let qry2 = "insert into spring values(?,?,?,?,?,?)";
              mysql.query(qry2, [empid,empname, empdesig, empdept, empsalary,emplocation], (err, results) => {
                  if (results.affectedRows > 0) {
                      res.render("register", { mesg: true })
                  }
              })
          }
      }
  })
});

router.get("/view", (req,res,next) =>{
  let qry = "select * from spring";
  mysql.query(qry, (err, results) => {
    if (err) throw err
    else {
        res.render("view", { data: results });
    }

});
});

router.get("/searchemp", (req, res,next) => {
  // fetch data from the form


  const { empdept,empsalary } = req.query;

  let qry = "select * from spring where empdept=? or empsalary>?";
  mysql.query(qry, [empdept,empsalary], (err, results) => {
      if (err) throw err
      else {
          if (results.length > 0) {
              res.render("search", { mesg1: true,data: results})
          } else {

              res.render("search", { mesg2: true})

          }

      }
  });
})

router.get("/removeemp", (req, res, next) => {

  // fetch data from the form


  const { empid } = req.query;

  let qry = "delete from spring where empid=?";
  mysql.query(qry, [empid], (err, results) => {
      if (err) throw err
      else {
          if (results.affectedRows > 0) {
              res.render("delete", { mesg1: true})
          } else {

              res.render("delete", { mesg2: true })

          }

      }
  });
});


module.exports = router;
