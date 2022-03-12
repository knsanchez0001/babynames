import React from 'react';
import PropTypes from 'prop-types';

const TerritoriesForm = ({ parentCallback }) => {

	function handleSubmit(e) {
		e.preventDefault();
		const elem = document.querySelector('input[name="territory"]:checked');
		const territory = elem.value;
		const birthYear = document.getElementById('birth-year').value;
		const territoryName = document.querySelector(`label[for='${elem.id}']`).innerHTML;
		parentCallback({ territory, birthYear, territoryName });
	}

	return (
		<div className='interest-div'>
			<h3>Popular Names for Puerto Rico and all other territories for a selected year</h3>
			<form name='popnamestate' className='interest-form' onSubmit={handleSubmit}>
				<fieldset >
					<input type="radio" name="territory" value="PR" id="puerto-rico" required />
					<label htmlFor='puerto-rico'>Puerto Rico</label><br />
					<input type="radio" name="territory" value="TR" id="other-territories" />
					<label htmlFor='other-territories'>American Samoa, Guam, Northern Mariana Islands, and U.S. Virgin Islands</label>
				</fieldset>
				<p>
					<input id='birth-year' type='number' min='1998' max='2020' className='interest-input' title="Birth year: Must be four numbers" required />
					<label htmlFor='birth-year'>Birth Year</label>
				</p>
				<p>
					<input type='submit' value='Go' />
				</p>
			</form>
		</div>
	);
};

TerritoriesForm.propTypes = {
	parentCallback: PropTypes.func
};

export default TerritoriesForm;