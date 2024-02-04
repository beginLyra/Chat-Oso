const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();


app.use(cors({
  origin: "*", // Reemplaza con la URL de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(express.json());
app.use("/api/auth", userRoutes)

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB", error);
  }
};

conectarDB();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

const Usuario=require("./Schemas/usuarios");




//////-----------------------------------------------------Registro de usuarios-----------------------------------------------------//////
app.post("/agregarUsuarios",async(req,res)=>{
  const bcrypt = require("bcrypt");
const {username,email,password}=req.body;

const hashedPassword = await bcrypt.hash(password, 10);
try {
  const usuarioExistente=await Usuario.findOne({username});
  if (usuarioExistente) {
    return res.status(400).json("Este usuario ya existe");

  }
  const nuevoUsuario=new Usuario({
    username,email,password:hashedPassword
  });
  await nuevoUsuario.save();
  delete nuevoUsuario.password;
  res.json(nuevoUsuario);
} catch (error) {
  
  res.status(500).send({ error: error.message });
}

});


//////-----------------------------------------------------Login de usuarios-----------------------------------------------------//////
app.post("/login",async(req,res)=>{
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const {username,password}=req.body;
  
  try {
    const loginUsuario=await Usuario.findOne({username});
    if (!loginUsuario) {
      return res.status(400).json("Contraseña o Usuario incorrecta");
  
    }
    const isPasswordValid = await bcrypt.compare(password, loginUsuario.password);
    if (!isPasswordValid) {
      return res.status(400).json("Contraseña o Usuario incorrecta");
    }
    
    res.json(loginUsuario);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  
  });

