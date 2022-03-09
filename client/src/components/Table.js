import TableRow from "./TableRow"

const Table = ({heading, body}) => {
  return (
    <table style={{ width: 500 }} className="table-c">
        <thead>
          <tr>
            {heading.map((head, i) => <th key={i} bgcolor={head.color}>{head.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => <TableRow row={row} key={i} />)}
        </tbody>
      </table>
  )
}

export default Table
