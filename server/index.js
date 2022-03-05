const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const { MongoClient } = require('mongodb');
const baby_names = "baby_names";
const male_names = "male_names";
const female_names = "female_names";
const state_male_names = "state_male_names";
const state_female_names = "state_female_names";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ufxrh.mongodb.net/${baby_names}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/top_ten_names/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        const query = [
            {
                '$project': {
                    'years': {
                        '$filter': {
                            'input': '$years',
                            'as': 'val',
                            'cond': {
                                '$eq': [
                                    '$$val.year', year
                                ]
                            }
                        }
                    }
                }
            }, {
                '$unwind': {
                    'path': '$years'
                }
            }, {
                '$project': {
                    'count': '$years.count',
                    'rank': '$years.rank'
                }
            }, {
                '$sort': {
                    'rank': 1
                }
            }, {
                '$limit': 10
            }
        ];
        const result = await retrieveTwoCols(female_names, male_names, query);
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    } catch (err) {
        res.send(`Failed to retrieve data:\n${err.stack}`);
    }
});

app.get('/name_range/:sex/:name/:startYear/:endYear', async (req, res) => {
    try {
        const sex = req.params.sex;
        const name = req.params.name;
        const startYear = parseInt(req.params.startYear);
        const endYear = parseInt(req.params.endYear);
        const query = [
            {
                '$match': {
                    '_id': name
                }
            }, {
                '$unset': '_id'
            }, {
                '$unwind': {
                    'path': '$years'
                }
            }, {
                '$project': {
                    'year': '$years.year',
                    'rank': '$years.rank',
                    'count': '$years.count'
                }
            }, {
                '$match': {
                    'year': {
                        '$gte': startYear,
                        '$lte': endYear
                    }
                }
            }, {
                '$sort': {
                    'year': -1
                }
            }
        ]
        const result = await retrieveOneCol(sex === "F" ? female_names : male_names, query);
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    } catch (err) {
        res.send(`Failed to retrieve data:\n${err.stack}`);
    }
});

app.get('/top_ten_names_state/:state/:year', async (req, res) => {
    try {
        const state = req.params.state;
        const year = parseInt(req.params.year);
        const query = [
            {
                '$project': {
                    'state': `$state.${state}`
                }
            }, {
                '$project': {
                    'years': {
                        '$filter': {
                            'input': '$state',
                            'as': 'y',
                            'cond': {
                                '$eq': [
                                    '$$y.year', year
                                ]
                            }
                        }
                    }
                }
            }, {
                '$unwind': {
                    'path': '$years'
                }
            }, {
                '$project': {
                    'count': '$years.count',
                    'rank': '$years.rank'
                }
            }, {
                '$sort': {
                    'rank': 1
                }
            }, {
                '$limit': 10
            }
        ];
        const result = await retrieveTwoCols(state_female_names, state_male_names, query);
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    } catch (err) {
        res.send(`Failed to retrieve data:\n${err.stack}`);
    }
});

async function retrieveTwoCols(female_col, male_col, query) {
    const db = client.db(baby_names);
    const females = await db.collection(female_col).aggregate(query).toArray();
    const males = await db.collection(male_col).aggregate(query).toArray();
    return { females, males };
}

async function retrieveOneCol(col, query) {
    const db = client.db(baby_names);
    const names = await db.collection(col).aggregate(query).toArray();
    return names;
}

app.listen(port, async () => {
    console.log(`App now listening at port:${port}`);
    await client.connect().then(() => console.log('Connected to mongo server')).catch(err => console.log(`Failed to connect to mongo server:\n${err.stack}`));
});