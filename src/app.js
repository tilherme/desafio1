const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const reposit = {
    title,
    url,
    id: uuid(),
    techs,
    likes: 0,
  }
  repositories.push(reposit)
  return response.json(reposit);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;


  const { title, url, techs } = request.body;
  const repositIndex = repositories.findIndex(reposit => reposit.id === id);
  if (repositIndex < 0) {
    return response.status(400).json({ error: 'erro' })
  }
  const reposit = {
    title,
    url,
    techs,
    id,

  }

  repositories[repositIndex] = reposit;
  return response.json(reposit);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(reposit => reposit.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'erro' })
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;





  const repository = repositories.find(repository => repository.id === id);
  repository.likes += 1;
  return response.json(repository);
});

module.exports = app;