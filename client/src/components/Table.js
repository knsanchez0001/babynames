import TableRow from './TableRow';
import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ heading, body }) => {
	if (body === null) {
		return <></>;
	}
	return (
		<table className="table-c">
			<thead>
				<tr>
					{heading.map((head, i) => <th key={i} bgcolor={head.color}>{head.label}</th>)}
				</tr>
			</thead>
			<tbody>
				{body.map((row, i) => <TableRow row={row} key={i} />)}
			</tbody>
		</table>
	);
};

Table.propTypes = {
	heading: PropTypes.array.isRequired,
	body: PropTypes.array.isRequired
};

export default Table;
