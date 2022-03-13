import React from 'react';
import PropTypes from 'prop-types';

const femaleTableHeading = [
	{ label: 'State', color: 'pink' }, { label: '1', color: 'pink' },
	{ label: '2', color: 'pink' }, { label: '3', color: 'pink' },
	{ label: '4', color: 'pink' }, { label: '5', color: 'pink' }
];
const maleTableHeading = [
	{ label: 'State', color: '#99ccff' }, { label: '1', color: '#99ccff' },
	{ label: '2', color: '#99ccff' }, { label: '3', color: '#99ccff' },
	{ label: '4', color: '#99ccff' }, { label: '5', color: '#99ccff' }
];

const Top5NamesStateForm = ({ parentCallback }) => {

	function handleSubmit(e) {
		e.preventDefault();
		const birthYear = document.getElementById('birth-year2').value;
		parentCallback({ birthYear, femaleTableHeading, maleTableHeading });
	}

	return (
		<div className='interest-div'>
			<h3>Top 5 Baby Names by State for a selected Year of Birth</h3>
			<form name='popnamestate' className='interest-form' onSubmit={handleSubmit}>
				<p>
					<input id='birth-year2' type='number' min='1960' max='2020' className='interest-input' title="Birth year: Must be four numbers" required />
					<label htmlFor='birth-year2'>Birth Year</label>
				</p>
				<p>
					<input type='submit' value='Go' />
				</p>
			</form>
		</div>
	);
};

Top5NamesStateForm.propTypes = {
	parentCallback: PropTypes.func
};

export default Top5NamesStateForm;