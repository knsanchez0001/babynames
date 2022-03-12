import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';
import TerritoriesForm from './TerritoriesForm';

const Territories = () => {
	let [input, setInput] = useState(null);
	let [tableBody, setTableBody] = useState(null);
	let [tableHeader, setTableHeader] = useState(null);

	const handleCallback = (childInput) => {
		setInput(childInput);
	};

	useEffect(() => {
		if (input) {
			getTopNamesByTerritory(input, setTableBody, setTableHeader);
		}
	}, [input]);


	const tableHeading = [
		{ label: 'Rank', color: '#eeeeee' },
		{ label: 'Male Name', color: '#99ccff' }, { label: 'Number of Males', color: '#99ccff' },
		{ label: 'Female Name', color: 'pink' }, { label: 'Number of Females', color: 'pink' }];

	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Popular Names by Territory</span>
				</h3>
				<TerritoriesForm parentCallback={handleCallback} />
				<Table heading={tableHeading} body={tableBody} tableHeader={tableHeader} />
			</section>
		</>
	);
};

/**
 * 
 * @param {object} input 
 * @param {function} setTableBody 
 */
async function getTopNamesByTerritory(input, setTableBody, setTableHeader) {
	const fillArray = (names, length) => {
		if (!names.length || names.length === length) {
			return;
		}
		const fillLength = length - names.length;
		const arr = new Array(fillLength);
		arr.fill({ id: '', count: 0 });
		names.push(...arr);
	};

	const response = await fetch(`/api/top_names_territory/${input.territory}/${input.birthYear}`);
	if (response.ok) {
		const json = JSON.parse(await response.text());
		const females = json.females;
		const males = json.males;

		const length = Math.max(males.length, females.length);
		fillArray(males, length);
		fillArray(females, length);

		const body = [];
		for (let i = 0; i < length; i++) {
			body.push([(i + 1).toString(), males[i]._id, males[i].count.toLocaleString('en'), females[i]._id, females[i].count.toLocaleString('en')]);
		}
		setTableBody(body);
		setTableHeader(<h4 className='table-h'>{input.birthYear.toString()} births in {input.territoryName}</h4>);
		console.log(input.territoryName);
	}
}

export default Territories;