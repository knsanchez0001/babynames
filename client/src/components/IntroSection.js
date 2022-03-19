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
	child: <a className='a-top' href='https://github.com/knsanchez0001/babynames'>GitHub Code</a>
};

IntroSection.propTypes = {
	child: PropTypes.instanceOf(Element)
};

export default IntroSection;