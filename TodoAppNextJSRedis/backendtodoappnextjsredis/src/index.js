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

app.get('/todo', async (req, res) => {
    res.send(await taskRepository.search().returnAll());
});

app.post('/todo', async (req, res) => {
    const todo = taskRepository.createEntity();

    todo.title = req.body.title;
    todo.timeSubmitted = req.body.timeSubmitted;
    todo.completed = req.body.completed;
    todo.id = await taskRepository.save(todo);

    res.send(todo);
});

app.put('/todo/:id', async (req, res) => {
    const todo = await taskRepository.fetch(req.params.id);

    //Update values
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.timeSubmitted = req.body.timeSubmitted;

    await taskRepository.save(todo);

    res.send(todo);
});

app.delete('/todo/:id', async (req, res) => {
    await taskRepository.remove(req.params.id);

    res.send(null);
});

app.listen(8000, () => {
    console.log("Redis Backend started on port 8000...");
});