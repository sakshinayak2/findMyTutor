const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
// app.set('views','./views')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/tutorDB", {useNewUrlParser: true});

const studentSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String
})

const Student = new mongoose.model("Student", studentSchema);

app.get("/register",function(req,res){
  res.render("register");
})

app.post("/student",function(req,res){
  const newStudent = new Student({
    name:req.body.name,
    lastname:req.body.lastname,
    email: req.body.username,
    password: req.body.password
  })
  newStudent.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("sign_u");
    }
  })
})

app.get("/login",function(req,res){
  res.render("login");
})

app.post("/login",function(req,res){
  const userName = req.body.userName;
  const password = req.body.password;

  Tutor.findOne({email:userName}, function(err,foundTutor){
    if(err){
      console.log(err);
    }else{
      if(foundTutor){
        if(foundTutor.password == password){
          res.render("sign_up");
        }
      }
    }
  });
});
const tutorSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  phone: String,
  hourly:String,
  password: String
})

const Tutor = new mongoose.model("Tutor", tutorSchema);

app.post("/teacher",function(req,res){
  const newTutor = new Tutor({
    name:req.body.name,
    lastname:req.body.lastname,
    email: req.body.username,
    phone:req.body.phoneno,
    hourly:req.body.hourlyrate,
    password: req.body.password
  })
  newTutor.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("sign_u");
    }
  })
})

app.get("/teacher",function(req,res){
  res.render("teacher");
});



// mongoose.connect("mongodb://localhost:27017/timDB", {useNewUrlParser: true});

const timSchema = new mongoose.Schema({
    emali: String,
    password: String
})
const Tim = new mongoose.model("Tim",timSchema);

app.post("/Contact",function(req,res){
  const newTim = new Tim({
      email: req.body.username,
      message: req.body.message
  })
  newTim.save();
});



app.get("/sign_up",function(req,res){
  res.render("sign_up");
})
app.get("/sign_u",function(req,res){
  res.render("sign_u");
})

   app.get("/home",function(req,res){
    res.render("home");
  });

  app.get("/click-me",function(req,res){
    res.render("click-me");
  });
  app.get("/student",function(req,res){
    res.render("student");
  });
  app.get("/student_login",function(req,res){
    res.render("student_login");
  });
  app.get("/teacher_login",function(req,res){
    res.render("teacher_login");
  });

 app.get("/Contact",function(req,res){
   res.render("Contact");
});
app.get("/level",function(req,res){
  res.render("level");
});
app.get("/customer",function(req,res){
  res.render("customer");
});
app.get("/customer_name",function(req,res){
  res.render("customer_name");
});
app.get("/DateOfBirth",function(req,res){
  res.render("DateOfBirth");
});
  
  app.get("/",function(req,res){
    res.sendFile(__dirname + "/customer_name");
  });
  app.post("/",function(req,res){
    const fullName = req.body.fname;
    console.log(fullName);
  });
  


   app.listen(3000,function(){
    console.log("server starting on port 3000");
  })