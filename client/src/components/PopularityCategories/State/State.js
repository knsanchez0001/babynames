import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';
import NamesYearStateForm from './NamesYearStateForm';
import Top5NamesStateForm from './Top5NamesStateForm';

const stateIndex = {
	AL : 0,
	AK : 1,
	AZ : 2,
	AR : 3,
	CA : 4,
	CO : 5,
	CT : 6,
	DE : 7,
	DC : 8,
	FL : 9,
	GA : 10,
	HI : 11,
	ID : 12,
	IL : 13,
	IN : 14,
	IA : 15,
	KS : 16,
	KY : 17,
	LA : 18,
	ME : 19,
	MD : 20,
	MA : 21,
	MI : 22,
	MN : 23,
	MS : 24,
	MO : 25,
	MT : 26,
	NE : 27,
	NV : 28,
	NH : 29,
	NJ : 30,
	NM : 31,
	NY : 32,
	NC : 33,
	ND : 34,
	OH : 35,
	OK : 36,
	OR : 37,
	PA : 38,
	RI : 39,
	SC : 40,
	SD : 41,
	TN : 42,
	TX : 43,
	UT : 44,
	VT : 45,
	VA : 46,
	WA : 47,
	WV : 48,
	WI : 49,
	WY : 50
};

const State = () => {
	let [input, setInput] = useState(null);
	let [input2, setInput2] = useState(null);
	let [tableBody, setTableBody] = useState(null);
	let [tableHeading, setTableHeading] = useState(null);
	let [femaleTableBody, setFemaleTableBody] = useState(null);
	let [maleTableBody, setMaleTableBody] = useState(null);
	let [femaleTableHeading, setFemaleTableHeading] = useState(null);
	let [maleTableHeading, setMaleTableHeading] = useState(null);

	const handleCallback = (childInput) => {
		setInput(childInput);
	};

	const handleCallback2 = (childInput) => {
		setInput2(childInput);
	};



	useEffect(() => {
		if (input) {
			setFemaleTableBody(null);
			setFemaleTableHeading(null);
			setMaleTableBody(null);
			setMaleTableHeading(null);
			getTopNamesByState(input, setTableBody, setTableHeading);
		}
	}, [input]);

	useEffect(() => {
		if (input2) {
			setTableBody(null);
			setTableHeading(null);
			getTopNamesPerYear(input2, setFemaleTableBody, setFemaleTableHeading, setMaleTableBody, setMaleTableHeading);
		}
	}, [input2]);

	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Popular Names by State</span>
				</h3>
				<div className='interest-wrapper'>
					<NamesYearStateForm parentCallback={handleCallback} />
					<Top5NamesStateForm parentCallback={handleCallback2} />
				</div>
				<Table heading={tableHeading} body={tableBody} />
				<Table heading={femaleTableHeading} body={femaleTableBody} />
				<Table heading={maleTableHeading} body={maleTableBody} />
			</section>
		</>
	);
};

/**
 * 
 * @param {object} input 
 * @param {function} setTableBody 
 */
async function getTopNamesByState(input, setTableBody, setTableHeading) {
	const response = await fetch(`/api/top_names_state/${input.state}/${input.birthYear}/100`);
	if (response.ok) {
		const json = JSON.parse(await response.text());
		const females = json.females;
		const males = json.males;

		const body = [];
		for (let i = 0; i < 100; i++) {
			body.push([(i + 1).toString(), males[i]._id, males[i].count.toLocaleString('en'), females[i]._id, females[i].count.toLocaleString('en')]);
		}
		setTableBody(body);
		setTableHeading(input.tableHeading);
	}
}

async function getTopNamesPerYear(input, setFemaleTableBody, setFemaleTableHeading, setMaleTableBody, setMaleTableHeading) {
	function setTable(state, funcTableBody) {
		const body = new Array(51);
		for (let i = 0; i < state.length; i++) {
			const id = state[i]._id;
			body[stateIndex[id]] = [id, ...state[i].names];
		}

		funcTableBody(body);
	}

	const response = await fetch(`/api/top_five_per_state/${input.birthYear}`);
	if (response.ok) {
		const json = JSON.parse(await response.text());
		const females = json.females;
		const males = json.males;
		
		setTable(females, setFemaleTableBody);
		setFemaleTableHeading(input.femaleTableHeading);
		setTable(males, setMaleTableBody);
		setMaleTableHeading(input.maleTableHeading);
	}
}

export default State;