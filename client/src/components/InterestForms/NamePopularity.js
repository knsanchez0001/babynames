import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import IntroSection from '../IntroSection';
import Table from '../Table';
import NamePopularityForm from './NamePopularityForm';

const NamePopularity = () => {
	const { name, start, sex } = useParams();
	const back = <Link className='a-top' to={'/'}>Back</Link>;

	let [tableBody, setTableBody] = useState(null);

	useEffect(() => {
		/**
		 * Fetches '/api/name_range/:sex/:name/:startYear/:endYear' to retrieve a json from MongoDB
		 * given paremeters of the given sex, name, and timespan.
		 */
		const getBabynames = async () => {
			const response = await fetch(`/api/name_range/${sex}/${name}/${start}/2020`);
			if (response.ok) {
				const json = JSON.parse(await response.text());

				const body = [];
				for (let i = 0; i < json.length; i++) {
					body.push([json[i].year.toString(), json[i].rank.toString(), json[i].count.toLocaleString('en')]);
				}
				setTableBody(body);
			}
		};

		getBabynames();
	}, [sex, name, start]);

	const tableHeading = [
		{ label: 'Year', color: '#eeeeee' },
		{ label: 'Rank', color: '#eeeeee' }, { label: 'Count', color: '#eeeeee' }];

	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Popularity of {sex === 'F' ? 'female' : 'male'} name {name}</span>
				</h3>
				<NamePopularityForm/>
				<Table heading={tableHeading} body={tableBody} />
			</section>
		</>
	);
};

export default NamePopularity;