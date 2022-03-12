import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RankChangeForm = ({ parentCallback }) => {
	let [startYear, setStartYear] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		const direction = document.querySelector('input[name="change"]:checked').value;
		const endYear = document.getElementById('end-year').value;
		parentCallback({ startYear, endYear, direction });
	}

	return (
		<div className='interest-div'>
			<h3>Select Initial and Ending Year and how Name Ranks Have Changed</h3>
			<form name='rankchange' className='interest-form' onSubmit={handleSubmit}>
				<fieldset >
					<input type="radio" name="change" value="increase" id="increase" required />
					<label htmlFor='increase'>Names that increased in popularity</label><br />
					<input type="radio" name="change" value="decrease" id="decrease" />
					<label htmlFor='decrease'>Names that decreases in popularity</label><br />
					<input type="radio" name="change" value="same" id="same" />
					<label htmlFor='same'>Names having about the same popularity</label>
				</fieldset>
				<p>
					<input id='start-year' type='number' min='1880' max='2019' onChange={(e) => setStartYear(e.target.value)}
						className='interest-input' title="start year: Must be four numbers" required />
					<label htmlFor='start-year'>Start Year</label>
				</p>
				<p>
					<input id='end-year' type='number' min={startYear ? Math.max(startYear, 1880) + 1 : 1881} max='2020' className='interest-input' title="end year: Must be four numbers" required />
					<label htmlFor='end-year'>End Year</label>
				</p>
				<p>
					<input type='submit' value='Go' />
				</p>
			</form>
		</div>
	);
};

RankChangeForm.propTypes = {
	parentCallback: PropTypes.func
};

export default RankChangeForm;