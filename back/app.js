const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-in", (request, response) => {
  const { username, password } = request.body;

  if (username === "magalu" && password === "m@galu123") {
    const user = { username, password };
    return response.json(user);
  } else {
    return response.status(404).json({ message: "Erro ao logar" });
  }
});

app.listen(8002, () => console.log("Servidor está rodando na porta 8002"));
