const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const { MongoClient } = require('mongodb');
const { resolveNaptr } = require('dns');
const baby_names = "baby_names";
const male_names = "male_names";
const female_names = "female_names";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ufxrh.mongodb.net/${baby_names}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/top_ten_names/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        const db = client.db(baby_names);
        const female_col = db.collection(female_names);
        const females = await female_col.aggregate([
            { $match: { year: year } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $unset: ["_id", "year"] }
        ]).toArray();
        const male_col = db.collection(male_names);
        const males = await male_col.aggregate([
            { $match: { year: year } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $unset: ["_id", "year"] }
        ]).toArray();
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify({females, males}, null, 4));
    } catch (err) {
        res.send(`Failed to retrieve data:\n${err.stack}`);
    }
});

app.get('/top_names_range/:sex/:name/:startYear/:endYear', async (req, res) => {
    try {
        const sex = req.params.sex;
        const name = req.params.name;
        const startYear = parseInt(req.params.startYear);
        const endYear = parseInt(req.params.endYear);
        const db = client.db(baby_names);
        const col = db.collection(sex === "F" ? female_names : male_names);
        const arr = await col.aggregate([
            {
                $match: {
                    year: { $gte: startYear, $lte: endYear },
                    name: name
                }
            },
            { $sort: { year: -1 } },
            { $unset: ["_id", "name"] }
        ]).toArray();
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(arr, null, 4));
    } catch (err) {
        res.send(`Failed to retrieve data:\n${err.stack}`);
    }
});



app.listen(port, async () => {
    console.log(`App now listening at port:${port}`);
    await client.connect().then(() => console.log('Connected to mongo server')).catch(err => console.log(`Failed to connect to mongo server:\n${err.stack}`));
});