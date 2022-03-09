
const TableRow = ({ row }) => {
    return (
        <tr>
            {row.map((value, index) => <td key={index}>{value}</td>)}
        </tr>
    )
}

export default TableRow