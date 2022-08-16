import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://carolmb:oX6elAEyQwQg7qWm@cluster0.2ydnqy0.mongodb.net/alura-node")

let db = mongoose.connection;

export default db