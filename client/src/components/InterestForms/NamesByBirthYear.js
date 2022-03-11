import React from 'react'
import { Link, useParams } from 'react-router-dom';
import IntroSection from '../IntroSection';

const NamesByBirthYear = () => {
    const {year, rank} = useParams();
    const back = <Link className='a-top' to={'/'}>Back</Link>;
    console.log(year);
    console.log(rank);
    return (
      <>
        <IntroSection child={back} />
        <section>
        
        </section>
      </>
    )
}

export default NamesByBirthYear