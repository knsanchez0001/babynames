import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PopularityCategory = ({ name, pic, link }) => {
	return (
		<Link to={link} className='icons-link'>
			<img alt="" src={pic} />
			<span className='icons-text'>{name}</span>
		</Link>

	);
};

PopularityCategory.propTypes = {
	name: PropTypes.string.isRequired,
	pic: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
};

export default PopularityCategory;