import express from 'express';
import cors from 'cors';
import { Client, Repository } from "redis-om";
import { userSchema } from "./schema/user.schema.js";
import { listingSchema } from "./schema/listing.schema.js";
import { commentSchema } from "./schema/comment.schema.js";
import { chatSchema } from './schema/chat.schema.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:8080',
    ]
}));

//Note: I will explain how you can get your endpoint below.Add your username,endpoint and password here
let username = "bilal";
let password = "B234234bda23!";
let endPoint = "redis-12863.c20097.us-central1-mz.gcp.cloud.rlrcp.com:12863";

const client = new Client();
await client.open(`redis://${username}:${password}@${endPoint}`);

// 1)_____________________USER Repository_______________________
// const userRepository = new Repository(userSchema, client);
const userRepository = client.fetchRepository(userSchema);
await userRepository.dropIndex();
await userRepository.createIndex();
// _______________________USER Repository_______________________

// 2)_____________________Listing Repository____________________
// const listingRepository = new Repository(listingSchema, client);
const listingRepository = client.fetchRepository(listingSchema);
await listingRepository.dropIndex();
await listingRepository.createIndex();
// _____________________Listing Repository______________________

// 3)_____________________Comment Repository____________________
// const commentRepository = new Repository(commentSchema, client);
const commentRepository = client.fetchRepository(commentSchema);
await commentRepository.dropIndex();
await commentRepository.createIndex();
// ______________________Comment Repository_____________________

// 3)_____________________Chat Repository____________________
// const chatRepository = new Repository(chatSchema, client);
const chatRepository = client.fetchRepository(chatSchema);
await chatRepository.dropIndex();
await chatRepository.createIndex();
// ______________________Chat Repository_____________________

////////////////////////////////////HERE THE API STARTS////////////////////////////////////

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ API for user login and registeration @@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@Developed By: Muhammad-Bilal-7896@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//The API to get all the users
app.get('/user', async (req, res) => {
    res.send(await userRepository.search().returnAll());
});

//The API to get a user by id
app.post('/user', async (req, res) => {
    const user = userRepository.createEntity();

    user.name = req.body.name;
    user.password = req.body.password;
    user.timeRegistered = req.body.timeRegistered;
    user.isSignedIn = req.body.isSignedIn;
    user.id = await userRepository.save(user);

    res.send(user);
});

//The API to update a user record by id i.e on logout and login it will work I will change isSignedIn accordingly
app.put('/user/:id', async (req, res) => {
    const user = await userRepository.fetch(req.params.id);

    //Update values
    user.name = req.body.name;
    user.password = req.body.password;
    user.isSignedIn = req.body.isSignedIn;
    user.timeRegistered = req.body.timeRegistered;

    await userRepository.save(user);

    res.send(user);
});

//The API to delete a user record by particular id
app.delete('/user/:id', async (req, res) => {
    await userRepository.remove(req.params.id);
    res.send("Deleted User Successful with id: " + req.params.id);
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ API for user login and registeration @@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@Developed By: Muhammad-Bilal-7896@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ----------------------------------------------------------------------------------------

// ########################################################################################
// ########################################################################################
// ##################################### API for listings #################################
// #############################Developed By: Muhammad-Bilal-7896##########################
// ########################################################################################

//The API to get all the listing
app.get('/listing', async (req, res) => {
    res.send(await listingRepository.search().returnAll());
});

//The API to get a listing by id
app.post('/listing', async (req, res) => {
    const listing = listingRepository.createEntity();

    listing.category = req.body.category;
    listing.title = req.body.title;
    listing.description = req.body.description;
    listing.isPublic = req.body.isPublic;
    listing.userWhoCreated = req.body.userWhoCreated;
    listing.timeCreated = req.body.timeCreated;

    listing.id = await listingRepository.save(listing);

    res.send(listing);
});

//The API to update a listing record by id 
app.put('/listing/:id', async (req, res) => {
    const listing = await listingRepository.fetch(req.params.id);

    //Update values
    listing.category = req.body.category;
    listing.title = req.body.title;
    listing.description = req.body.description;
    listing.isPublic = req.body.isPublic;
    listing.userWhoCreated = req.body.userWhoCreated;
    listing.timeCreated = req.body.timeCreated;

    await listingRepository.save(listing);

    res.send(listing);
});

//The API to delete a listing record by particular id
app.delete('/listing/:id', async (req, res) => {
    await listingRepository.remove(req.params.id);
    res.send("Deleted listing Successfully with id: " + req.params.id);
});

// ########################################################################################
// ########################################################################################
// ##################################### API for listings #################################
// #############################Developed By: Muhammad-Bilal-7896##########################
// ########################################################################################

// ----------------------------------------------------------------------------------------

// ########################################################################################
// ########################################################################################
// ##################################### API for comments #################################
// #############################Developed By: Muhammad-Bilal-7896##########################
// ########################################################################################

//The API to get all the comments
app.get('/comment', async (req, res) => {
    res.send(await commentRepository.search().returnAll());
});

//The API to get a comments by id
app.post('/comment', async (req, res) => {
    const comment = commentRepository.createEntity();

    comment.listingID = req.body.listingID;
    comment.comment = req.body.comment;
    comment.userWhoCommented = req.body.userWhoCommented;
    comment.timeCommented = req.body.timeCommented;

    comment.id = await commentRepository.save(comment);

    res.send(comment);
});

//The API to update a comment record by id 
app.put('/comment/:id', async (req, res) => {
    const comment = await commentRepository.fetch(req.params.id);

    //Update values
    comment.listingID = req.body.listingID;
    comment.comment = req.body.comment;
    comment.userWhoCommented = req.body.userWhoCommented;
    comment.timeCommented = req.body.timeCommented;

    await commentRepository.save(comment);

    res.send(comment);
});

//The API to delete a comment record by particular id
app.delete('/comment/:id', async (req, res) => {
    await commentRepository.remove(req.params.id);
    res.send("Deleted Comment Successfully with id: " + req.params.id);
});

// ########################################################################################
// ########################################################################################
// ##################################### API for comments #################################
// #############################Developed By: Muhammad-Bilal-7896##########################
// ########################################################################################

// ----------------------------------------------------------------------------------------

// ########################################################################################
// ########################################################################################
// ##################################### API for chat #################################
// #############################Developed By: Muhammad-Bilal-7896##########################
// ########################################################################################

//The API to get all the comments
app.get('/chat', async (req, res) => {
    res.send(await chatRepository.search().returnAll());
});

//The API to send a new message
app.post('/chat', async (req, res) => {
    const chat = chatRepository.createEntity();

    chat.userIDSender = req.body.userIDSender;
    chat.userNameSender = req.body.userNameSender;
    chat.userIDReceiver = req.body.userIDReceiver;
    chat.userNameReceiver = req.body.userNameReceiver;
    chat.message = req.body.message;
    chat.timeSent = req.body.timeSent;
    chat.isUserOnline = req.body.isUserOnline;

    chat.id = await chatRepository.save(chat);

    res.send(chat);
});

//The API to update a chat record by id 
app.put('/chat/:id', async (req, res) => {
    const chat = await chatRepository.fetch(req.params.id);

    //Update values
    chat.userIDSender = req.body.userIDSender;
    chat.userNameSender = req.body.userNameSender;
    chat.userIDReceiver = req.body.userIDReceiver;
    chat.userNameReceiver = req.body.userNameReceiver;
    chat.message = req.body.message;
    chat.timeSent = req.body.timeSent;
    chat.isUserOnline = req.body.isUserOnline;

    await chatRepository.save(chat);

    res.send(chat);
});

//The API to delete a chat record by particular id
app.delete('/chat/:id', async (req, res) => {
    await chatRepository.remove(req.params.id);
    res.send("Deleted Chat Successfully with id: " + req.params.id);
});

// ########################################################################################
// ########################################################################################
// ##################################### API for chat #################################
// #############################Developed By: Muhammad-Bilal-7896##########################
// ########################################################################################

////////////////////////////////////HERE THE API STARTS////////////////////////////////////

app.get('/', (req, res) => {
    res.status(200).send('Redis Backend Chat Application is being started.').end();
});

// Start the server
const PORT = parseInt(process.env.PORT) || 8000;
app.listen(PORT, () => {
    console.log(`Redis Backend started on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

export default app;
// app.listen(8000, () => {
//     console.log("Redis Backend started on port 8000...");
// });