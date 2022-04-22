import scarlex from "../..";
const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");

socket.on("hello", (arg) => {
    console.log(arg); // world
  });