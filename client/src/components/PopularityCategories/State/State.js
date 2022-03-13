import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';
import NamesYearStateForm from './NamesYearStateForm';
import { stateIndex, femaleTableHeading, maleTableHeading, tableHeading } from './StateUtils';
import Top5NamesStateForm from './Top5NamesStateForm';

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
		setTableHeading(tableHeading);
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
		setFemaleTableHeading(femaleTableHeading);
		setTable(males, setMaleTableBody);
		setMaleTableHeading(maleTableHeading);
	}
}

export default State;