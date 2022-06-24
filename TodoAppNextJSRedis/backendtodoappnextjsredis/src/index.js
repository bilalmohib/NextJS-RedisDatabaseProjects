import express from 'express';
import cors from 'cors';
import { Client, Repository } from "redis-om";
import { taskSchema } from "./schema/task.schema.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['https://todoappnextjsredis.vercel.app/']
}));

//Note: I will explain how you can get your endpoint below.Add your username,endpoint and password here
let username = "bilal";
let password = "B234234bda23!"
let endPoint = "redis-15062.c20097.us-central1-mz.gcp.cloud.rlrcp.com:15062";

const client = new Client();
await client.open(`redis://${username}:${password}@${endPoint}`);

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