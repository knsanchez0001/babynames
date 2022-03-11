import React from 'react';
import PropTypes from 'prop-types';


const TableRow = ({ row }) => {
	return (
		<tr>
			{row.map((value, index) => <td key={index}>{value}</td>)}
		</tr>
	);
};

TableRow.propTypes = {
	row: PropTypes.array.isRequired
};

export default TableRow;