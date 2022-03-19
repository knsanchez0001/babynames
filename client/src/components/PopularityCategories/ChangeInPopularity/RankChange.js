import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';
import RankChangeForm from './RankChangeForm';

const RankChange = () => {
	let [input, setInput] = useState(null);
	let [femaleTableBody, setFemaleTableBody] = useState(null);
	let [maleTableBody, setMaleTableBody] = useState(null);
	let [femaleTableHeading, setFemaleTableHeading] = useState(null);
	let [maleTableHeading, setMaleTableHeading] = useState(null);

	const handleCallback = (childInput) => {
		setInput(childInput);
	};

	useEffect(() => {
		if (input) {
			getNamesByRankChange(input, setFemaleTableBody, setFemaleTableHeading, setMaleTableBody, setMaleTableHeading);
		}
	}, [input]);

	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Change in Name Popularity</span>
				</h3>
				<RankChangeForm parentCallback={handleCallback} />
				<Table heading={femaleTableHeading} body={femaleTableBody} />
				<Table heading={maleTableHeading} body={maleTableBody} />
			</section>
		</>
	);
};

/**
 * 
 * @param {object} input 
 * @param {string} input.direction
 * @param {string} input.startYear
 * @param {string} input.endYear
 * @param {function} setFemaleTableBody 
 * @param {function} setFemaleTableHeading 
 * @param {function} setMaleTableBody 
 * @param {function} setMaleTableHeading 
 */
async function getNamesByRankChange(input, setFemaleTableBody, setFemaleTableHeading, setMaleTableBody, setMaleTableHeading) {

	/**
	 * 
	 * @param {object[]} names - An array of name objects
	 * @param {string} names[].id - The id (person's name)
	 * @param {number} names[].count - The frequency of the given name counted 
	 * @param {Function}
	 */
	function setTable(names, funcTableBody) {
		const body = [];
		for (let i = 0; i < names.length; i++) {
			body.push([names[i]._id, names[i].change, names[i].endRank, names[i].startRank]);
		}
		funcTableBody(body);
	}

	const response = await fetch(`/api/change_in_popularity/${input.direction}/${input.startYear}/${input.endYear}`);
	if (response.ok) {
		const json = JSON.parse(await response.text());
		const females = json.females;
		const males = json.males;

		setTable(females, setFemaleTableBody);
		setTable(males, setMaleTableBody);

		setFemaleTableHeading([
			{ label: 'Name', color: 'pink' }, { label: 'Change', color: 'pink' },
			{ label: `${input.endYear}`, color: 'pink' }, { label: `${input.startYear}`, color: 'pink' }
		]);

		setMaleTableHeading([
			{ label: 'Name', color: '#99ccff' }, { label: 'Change', color: '#99ccff' },
			{ label: `${input.endYear}`, color: '#99ccff' }, { label: `${input.startYear}`, color: '#99ccff' }
		]);
	}
}

export default RankChange;