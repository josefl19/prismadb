const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { json } = require("express");

// Cors
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

/**
 * EXPLORERS
 */
// GET all explorers
app.get('/explorers', async (req, res) => {
  const allExplorers =  await prisma.explorer.findMany({});
  res.json(allExplorers);
});

// GET explorer by ID
app.get('/explorers/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

// POST
app.post('/explorers', async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission
   };
  const message = 'Explorer creado.';
  await prisma.explorer.create({data: explorer});
  return res.json({message});
});

// PUT (Update) explorer mission
app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

//DELETE explorer
app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

/**
 * MISSIONS
 */
// GET all missions
app.get('/missions', async (req, res) => {
  const allMissions = await prisma.mission.findMany({});
  return res.json(allMissions);
});

// GET mission by ID
app.get('/missions/:id', async (req, res) => {
  const id = req.params.id;
  const mission = await prisma.mission.findUnique({ where: {id: parseInt(id)}});
  res.json(mission);
});

app.post('/missions', async(req, res) => {
  const mission = {
    name: req.body.name,
    lang: req.body.lang,
    missionCommander: req.body.missionCommander,
    enrollments: req.body.enrollments
  };
  const message = 'Mission created';
  await prisma.mission.create({data: mission});
  return res.json({message});
});

app.put('/missions/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  await prisma.mission.update({
    where: {
      id: id
    },
    data: {
      name: req.body.name,
      missionCommander: req.body.missionCommander
    }
  });

  return res.json({ message: 'Mission updated' });
});

app.delete('/missions/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  await prisma.mission.delete({ where: {id: id}});
  return res.json({ message: 'Mission deleted' });
});

/**
 * MISSION COMANDERS
 */
app.get('/commander', async(req, res) => {
  const allMissions = await prisma.missionCommander.findMany({});
  return res.json(allMissions);
});

app.get('/commander/:id', async(req, res) => {
  const idCommander = parseInt(req.params.id);
  const commander = await prisma.missionCommander.findUnique({ where: {id: idCommander}});
  return res.json(commander);
})

app.post('/commander', async(req, res) => {
  const commander = {
    name: req.body.name,
    username: req.body.username,
    mainStack: req.body.mainStack
  };
  await prisma.missionCommander.create({data: commander});
  return res.json({ message: 'Mission commander created'});
});

app.put('/commander/:id', async(req, res) => {
  const idCommander = parseInt(req.params.id);
  await prisma.missionCommander.update({
    where: {
      id: idCommander
    },
    data: {
      name: req.body.name,
      username: req.body.username,
      mainStack: req.body.mainStack
    }
  });

  return res.json({ message: 'Mission commander updated'});
});

app.delete('/commander/:id', async(req, res) => {
  const idCommander = parseInt(req.params.id);
  await prisma.missionCommander.delete({ where: {id: idCommander }});
  res.json({ message: 'Mission commander deleted' });
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});