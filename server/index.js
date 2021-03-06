/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const { MongoClient } = require('mongodb');
const baby_names = 'baby_names';
const male_names = 'male_names';
const female_names = 'female_names';
const state_male_names = 'state_male_names';
const state_female_names = 'state_female_names';
const territory_female_names = 'territory_female_names';
const territory_male_names = 'territory_male_names';
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ufxrh.mongodb.net/${baby_names}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.get('/api/top_ten_names/:year', async (req, res) => {
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
	res.header('Content-Type', 'application/json');
	res.set('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/top_names/:year/:limit', async (req, res) => {
	const year = parseInt(req.params.year);
	const limit = parseInt(req.params.limit);
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
			'$limit': limit
		}
	];
	const result = await retrieveTwoCols(female_names, male_names, query);
	res.header('Content-Type', 'application/json');
	res.set('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/name_range/:sex/:name/:startYear/:endYear', async (req, res) => {
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
	];
	const result = await retrieveOneCol(sex === 'F' ? female_names : male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/top_names_state/:state/:year/:limit', async (req, res) => {
	const state = req.params.state;
	const year = parseInt(req.params.year);
	const limit = parseInt(req.params.limit);
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
			'$limit': limit
		}
	];
	const result = await retrieveTwoCols(state_female_names, state_male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/top_names_range/:startYear/:endYear', async (req, res) => {
	const startYear = parseInt(req.params.startYear);
	const endYear = parseInt(req.params.endYear);
	const query = [
		{
			'$project': {
				'years': {
					'$filter': {
						'input': '$years',
						'as': 'y',
						'cond': {
							'$and': [
								{
									'$gte': [
										'$$y.year', startYear
									]
								}, {
									'$lte': [
										'$$y.year', endYear
									]
								}
							]
						}
					}
				}
			}
		}, {
			'$project': {
				'count': {
					'$sum': '$years.count'
				}
			}
		},
		{
			'$match': {
				'count': {
					'$gt': 0
				}
			}
		},
		{
			'$sort': {
				'count': -1
			}
		},
		{
			'$limit': 100
		}
	];
	const result = await retrieveTwoCols(female_names, male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/top_five_yearly', async (req, res) => {
	const query = [
		{
			'$unwind': {
				'path': '$years'
			}
		}, {
			'$project': {
				'year': '$years.year',
				'rank': '$years.rank'
			}
		}, {
			'$match': {
				'rank': {
					'$lte': 5
				}
			}
		}, {
			'$sort': {
				'rank': 1
			}
		}, {
			'$group': {
				'_id': '$year',
				'names': {
					'$push': '$_id'
				}
			}
		}, {
			'$sort': {
				'_id': -1
			}
		}
	];
	const result = await retrieveTwoCols(female_names, male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/top_names_territory/:territory/:year', async (req, res) => {
	const territory = req.params.territory;
	const year = parseInt(req.params.year);
	const query = [
		{
			'$project': {
				'territory': `$state.${territory}`
			}
		}, {
			'$match': {
				'territory': {
					'$exists': true
				}
			}
		}, {
			'$project': {
				'territory': {
					'$filter': {
						'input': '$territory',
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
			'$match': {
				'territory': {
					'$size': 1
				}
			}
		}, {
			'$unwind': {
				'path': '$territory'
			}
		}, {
			'$sort': {
				'territory.rank': 1
			}
		}, {
			'$project': {
				'count': '$territory.count'
			}
		}
	];
	const result = await retrieveTwoCols(territory_female_names, territory_male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/change_in_popularity/:direction/:startYear/:endYear', async (req, res) => {
	const direction = req.params.direction;
	const startYear = parseInt(req.params.startYear);
	const endYear = parseInt(req.params.endYear);
	const queryStages = {
		decrease: [
			{
				'startRank': {
					'$lte': 1000
				},
			},
			{
				'change': {
					'$lt': -4
				}
			},
			{
				'change': 1
			}
		],
		increase: [
			{
				'endRank': {
					'$lte': 1000
				}
			},
			{
				'change': {
					'$gt': 4
				}
			},
			{
				'change': -1
			}
		],
		same: [
			{

				'startRank': {
					'$lte': 1000
				}

			},
			{
				'$and': [
					{
						'change': {
							'$lte': 4
						}
					}, {
						'change': {
							'$gte': -4
						}
					}
				]
			},
			{
				'change': -1,
				'endRank': -1
			}
		]
	};

	const query = [
		{
			'$project': {
				'startYear': {
					'$filter': {
						'input': '$years',
						'as': 'val',
						'cond': {
							'$eq': [
								'$$val.year', startYear
							]
						}
					}
				},
				'endYear': {
					'$filter': {
						'input': '$years',
						'as': 'val',
						'cond': {
							'$eq': [
								'$$val.year', endYear
							]
						}
					}
				}
			}
		}, {
			'$unwind': {
				'path': '$startYear'
			}
		}, {
			'$unwind': {
				'path': '$endYear'
			}
		}, {
			'$project': {
				'startRank': '$startYear.rank',
				'startYear': '$startYear.year',
				'endRank': '$endYear.rank',
				'endYear': '$endYear.year'
			}
		}, {
			'$match': queryStages[direction][0]
		}, {
			'$addFields': {
				'change': {
					'$subtract': [
						'$startRank', '$endRank'
					]
				}
			}
		}, {
			'$match': queryStages[direction][1]
		}, {
			'$sort': queryStages[direction][2]
		}
	];
	const result = await retrieveTwoCols(female_names, male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.get('/api/top_five_per_state/:year', async (req, res) => {
	const year = parseInt(req.params.year);
	const query = [
		{
			'$project': {
				'state': {
					'$objectToArray': '$state'
				}
			}
		}, {
			'$unwind': {
				'path': '$state'
			}
		}, {
			'$project': {
				'data': {
					'$filter': {
						'input': '$state.v',
						'as': 'v',
						'cond': {
							'$eq': [
								'$$v.year', year
							]
						}
					}
				},
				'state': '$state.k'
			}
		}, {
			'$unwind': {
				'path': '$data'
			}
		}, {
			'$match': {
				'data.rank': {
					'$lte': 5
				}
			}
		}, {
			'$project': {
				'state': '$state',
				'rank': '$data.rank'
			}
		}, {
			'$sort': {
				'rank': 1
			}
		}, {
			'$group': {
				'_id': '$state',
				'names': {
					'$push': '$_id'
				}
			}
		}
	];
	const result = await retrieveTwoCols(state_female_names, state_male_names, query);
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(result, null, 4));
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

async function retrieveTwoCols(female_col, male_col, query) {
	try {
		const db = client.db(baby_names);
		const females = await db.collection(female_col).aggregate(query).toArray();
		const males = await db.collection(male_col).aggregate(query).toArray();
		return { females, males };
	} catch (error) {
		console.log(`Failed to retrieve data:\n${error.stack}`);
	}
}

async function retrieveOneCol(col, query) {
	try {
		const db = client.db(baby_names);
		const names = await db.collection(col).aggregate(query).toArray();
		return names;
	} catch (error) {
		console.log(`Failed to retrieve data:\n${error.stack}`);
	}
}

app.listen(port, async () => {
	console.log(`App now listening at port:${port}`);
	await client.connect().then(() => console.log('Connected to mongo server')).catch(err => console.log(`Failed to connect to mongo server:\n${err.stack}`));
});