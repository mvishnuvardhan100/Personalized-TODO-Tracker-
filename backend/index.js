const { signinSchema, signupSchema, todoSchema } = require("./zodSchema");
const { User, Todo } = require("./db");
const {getJWT, verifyJWT } = require("./jwt");
const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const results = signupSchema.safeParse(req.body);
  if(!results.success) {
    return res.status(400).send({
      msg: "Bad Request"
    });
  }
  
  const isThere = await User.findOne({
    email: req.body.email
  });

  if(isThere != null) {
    return res.status(400).send({
      msg: "Bad Request"
    });
  }

  await User.insertOne(req.body);
  console.log("Data got inserted");

  const token = getJWT({
    email: req.body.email
  });
  return res.status(200).send({
    token
  });
});

app.post("/signin", async (req, res) => {
  const results = signinSchema.safeParse(req.body);
  if(!results.success) {
    return res.status(400).send({
      msg: "Bad Request"
    });
  } 

  const isThere = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if(isThere == null) {
    return res.status(400).send({
      msg: "Bad Request"
    });
  }

  const token = getJWT({
    email: req.body.email
  });
  return res.status(200).send({
    token
  });
});

app.post("/addtodo", async (req, res) => {

  const results = todoSchema.safeParse(req.body);
  if(!results.success) {
    return res.status(400).send({
      msg: "Bad Request"
    });
  }

  const token = req.headers['authorization'];
  try {
    const decodedBody = verifyJWT(token);
    await Todo.insertOne({
      email: decodedBody.email,
      title: req.body.title,
      description: req.body.description
    });
    console.log("TODO got inserted");
    return res.status(200).send({
      msg: "TODO updated successfully"
    });
  } catch(err) {
    return res.status(200).send({
      msg: "Wrong token, re-direct to singin page"
    });
  }
});

app.delete("/removetodo/:id", async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const id = req.params.id;
    const decodedBody = verifyJWT(token);
    await Todo.findOneAndDelete({
      _id: id,
    });
    console.log("TODO got deleted");
    return res.status(200).send({
      msg: "TODO deleted successfully"
    });
  } catch(err) {
    return res.status(200).send({
      msg: "Wrong token, remove the token from storage"
    });
  }
});

app.get("/fNLN", async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const decodedBody = verifyJWT(token);
    const userDetails = await User.findOne({
      email: decodedBody.email
    });

    return res.status(200).send({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName
    });
  } catch(err) {
    return res.status(400).send({
      msg: "Wrong token, remove the token from storage"
    });
  }
})

app.get("/verify", async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const decodedBody = verifyJWT(token);

    return res.status(200).send({
      msg: "Good"
    });
  } catch(err) {
    return res.status(400).send({
      msg: "Wrong token, remove the token from storage"
    });
  }
});

app.get("/todos", async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const decodedBody = verifyJWT(token);

    const todos = await Todo.find({
      email: decodedBody.email
    });

    return res.status(200).send({
      todos
    });
  } catch(err) {
    return res.status(400).send({
      msg: "Wrong token, remove the token from storage"
    });
  }
})


app.listen(port, () => {
  console.log("Server started listening");
});
