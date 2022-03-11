import { useState, useEffect } from 'react';
import Table from './Table';

const TopNamesTable = () => {
    let [tableBody, setTableBody] = useState(null);
    let [year, setYear] = useState(null);

    useEffect(() => {
        const getBabynames = async () => {
            console.log(year);
            const response = await fetch(`/top_ten_names/${year ? year.toString() : '2020'}`);
            if (response.ok) {
                const json = JSON.parse(await response.text());
                const females = json.females;
                const males = json.males;

                const body = [];
                for (let i = 0; i < 10; i++) {
                    body.push([(i + 1).toString(), males[i]._id, females[i]._id]);
                }
                setTableBody(body);
            }
        };

        getBabynames();
    }, [year]);

    const tableHeading = [{ label: 'Rank', color: '#eeeeee' }, { label: 'Male Name', color: '#99ccff' }, { label: 'Female Name', color: 'pink' }];
    return (
        <section>
            <div className='wrapper'>
                <div>
                    <form onSubmit={(e) => { e.preventDefault(); setYear(document.getElementById('yearInput').value) }} >
                        <label>Top 10 Baby Names of
                            <input type='number' name='year' id='yearInput'
                                defaultValue={2020} min='1880' max='2020' maxLength='4' />
                        </label>
                    </form>
                </div>
                <Table heading={tableHeading} body={tableBody} />
            </div>
        </section>
    )
}

export default TopNamesTable