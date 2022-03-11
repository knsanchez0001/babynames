import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import IntroSection from '../IntroSection';
import Table from '../Table';

const NamesByBirthYear = () => {
    const { year, rank } = useParams();
    const back = <Link className='a-top' to={'/'}>Back</Link>;
    console.log(year);
    console.log(rank);

    let [tableBody, setTableBody] = useState(null);

    useEffect(() => {
        const getBabynames = async () => {
            const response = await fetch(`/api/top_names/${year}/${rank}`);
            if (response.ok) {
                const json = JSON.parse(await response.text());
                const females = json.females;
                const males = json.males;

                const body = [];
                for (let i = 0; i < rank; i++) {
                    body.push([(i + 1).toString(), males[i]._id, males[i].count.toLocaleString('en')  , females[i]._id, females[i].count.toLocaleString('en')  ]);
                }
                setTableBody(body);
            }
        };

        getBabynames();
    }, [rank, year]);

    const tableHeading = [
        { label: 'Rank', color: '#eeeeee' },
        { label: 'Male Name', color: '#99ccff' }, { label: 'Number of Males', color: '#99ccff' },
        { label: 'Female Name', color: 'pink' }, { label: 'Number of Females', color: 'pink' }];

    return (
        <>
            <IntroSection child={back} />
            <section>
                <h3 className='header-c'>
                    <span className='header-c-text'>Popular Names in {year}</span>
                </h3>
                <Table heading={tableHeading} body={tableBody} />
            </section>
        </>
    )
}

export default NamesByBirthYear