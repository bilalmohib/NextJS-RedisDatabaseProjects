import express from 'express';
import cors from 'cors';
import { Client, Repository } from "redis-om";
import { taskSchema } from "./schema/task.schema.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000']
}));

const client = new Client();
await client.open("redis://bilal:123321123BiLaL!@redis-15666.c98.us-east-1-4.ec2.cloud.redislabs.com:15666");

// const taskRepository = new Repository(taskSchema, client);
const taskRepository = client.fetchRepository(taskSchema)

await taskRepository.dropIndex();
await taskRepository.createIndex();

app.get('/tasks', async (req, res) => {
    res.send(await taskRepository.search().returnAll());
});

app.post('/tasks', async (req, res) => {
    const task = taskRepository.createEntity();

    task.name = req.body.name;
    task.complete = false;
    task.id = await taskRepository.save(task);

    res.send(task);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await taskRepository.fetch(req.params.id);

    task.complete = req.body.complete;
    await taskRepository.save(task);

    res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await taskRepository.remove(req.params.id);

    res.send(null);
});

app.listen(8000, () => {
    console.log("Redis Backend started on port 8000...");
});