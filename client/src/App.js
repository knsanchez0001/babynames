import React, { useState, useEffect, Component } from 'react';

function App() {
  let [tableBody, setTableBody] = useState(null);

  useEffect(() => getNames().then(text => JSON.parse(text))
    .then(json => {
      const females = json.females;
      const males = json.males;

      if (males) {
        const body = [];
        for (let i = 0; i < 10; i++) {
          body.push([(i + 1).toString(), males[i]._id, females[i]._id]);
        }

        setTableBody(body);
      }

    }), []);

  const tableHeading = [{label: 'Rank', color: '#eeeeee'}, {label: 'Male Name', color: '#99ccff'}, {label: 'Female Name', color:'pink'}];

  return (
    <div className="container">
      <div>
        <h3>Top 10 Baby Names of 2020</h3>
      </div>
      <Table heading={tableHeading} body={tableBody} />
    </div>
  );
}

export default App;

async function getNames() {
  const URL = "http://localhost:8080/top_ten_names/2020";
  const options = {
    method: 'GET',
    mode: 'cors'
  };

  try {
    const response = await fetch(URL, options);
    if (response.ok) {
      const txt = await response.text();
      return txt;
    }
  } catch (error) {
    console.log(error);
  }

}

class Table extends Component {
  render() {
    const heading = this.props.heading;
    const body = this.props.body;
    if (!body) return '';
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
    );
  }
}

class TableRow extends Component {
  render() {
    var row = this.props.row;
    return (
      <tr>
        {row.map((val, i) => <td key={i}>{val}</td>)}
      </tr>
    )
  }
}