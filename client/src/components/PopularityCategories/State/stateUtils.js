const stateIndex = {
	AL: 0,
	AK: 1,
	AZ: 2,
	AR: 3,
	CA: 4,
	CO: 5,
	CT: 6,
	DE: 7,
	DC: 8,
	FL: 9,
	GA: 10,
	HI: 11,
	ID: 12,
	IL: 13,
	IN: 14,
	IA: 15,
	KS: 16,
	KY: 17,
	LA: 18,
	ME: 19,
	MD: 20,
	MA: 21,
	MI: 22,
	MN: 23,
	MS: 24,
	MO: 25,
	MT: 26,
	NE: 27,
	NV: 28,
	NH: 29,
	NJ: 30,
	NM: 31,
	NY: 32,
	NC: 33,
	ND: 34,
	OH: 35,
	OK: 36,
	OR: 37,
	PA: 38,
	RI: 39,
	SC: 40,
	SD: 41,
	TN: 42,
	TX: 43,
	UT: 44,
	VT: 45,
	VA: 46,
	WA: 47,
	WV: 48,
	WI: 49,
	WY: 50
};

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

const tableHeading = [
	{ label: 'Rank', color: '#eeeeee' },
	{ label: 'Male Name', color: '#99ccff' }, { label: 'Number of Males', color: '#99ccff' },
	{ label: 'Female Name', color: 'pink' }, { label: 'Number of Females', color: 'pink' }
];

export { stateIndex, femaleTableHeading, maleTableHeading, tableHeading };