import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';
import NamesYearStateForm from './NamesYearStateForm';
import { stateIndex, femaleTableHeading, maleTableHeading, tableHeading } from './stateUtils';
import Top5NamesStateForm from './Top5NamesStateForm';

const State = () => {
	let [nameYearInput, setNameYearInput] = useState(null);
	let [top5Input, setTop5Input] = useState(null);
	let [tableBody, setTableBody] = useState(null);
	let [tableHeading, setTableHeading] = useState(null);
	let [femaleTableBody, setFemaleTableBody] = useState(null);
	let [maleTableBody, setMaleTableBody] = useState(null);
	let [femaleTableHeading, setFemaleTableHeading] = useState(null);
	let [maleTableHeading, setMaleTableHeading] = useState(null);

	const nameYearCallback = (childInput) => {
		setNameYearInput(childInput);
	};

	const top5Callback = (childInput) => {
		setTop5Input(childInput);
	};

	useEffect(() => {
		if (nameYearInput) {
			setFemaleTableBody(null);
			setFemaleTableHeading(null);
			setMaleTableBody(null);
			setMaleTableHeading(null);
			getTopNamesByState(nameYearInput, setTableBody, setTableHeading);
		}
	}, [nameYearInput]);

	useEffect(() => {
		if (top5Input) {
			setTableBody(null);
			setTableHeading(null);
			getTopNamesPerYear(top5Input, setFemaleTableBody, setFemaleTableHeading, setMaleTableBody, setMaleTableHeading);
		}
	}, [top5Input]);

	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Popular Names by State</span>
				</h3>
				<div className='interest-wrapper'>
					<NamesYearStateForm parentCallback={nameYearCallback} />
					<Top5NamesStateForm parentCallback={top5Callback} />
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
 * @param {string} input.state
 * @param {string} input.birthYear
 * @param {function} setTableBody 
 * @param {function} setTableHeading
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

/**
 * 
 * @param {object} input
 * @param {string} input.birthYear
 * @param {function} setFemaleTableBody 
 * @param {function} setFemaleTableHeading 
 * @param {function} setMaleTableBody 
 * @param {function} setMaleTableHeading 
 */
async function getTopNamesPerYear(input, setFemaleTableBody, setFemaleTableHeading, setMaleTableBody, setMaleTableHeading) {
	/**
	 * 
	 * @param {object[]} state 
	 * @param {string[]} state[].names
	 * @param {string} state[]._id
	 * @param {function} funcTableBody 
	 */
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