import React from 'react';
import PropTypes from 'prop-types';

const IntroSection = ({ child }) => {
	return (
		<section>
			<div className='wrapper'>
				{child}
			</div>
		</section>
	);
};

IntroSection.defaultProps = {
	child: <></>
};

IntroSection.propTypes = {
	child: PropTypes.instanceOf(Element)
};

export default IntroSection;