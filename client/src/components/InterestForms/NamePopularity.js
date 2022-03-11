import React from 'react'
import { Link, useParams } from 'react-router-dom';
import IntroSection from '../IntroSection';

const NamePopularity = () => {
    const {name, start, sex} = useParams();
    const back = <Link className='a-top' to={'/'}>Back</Link>;
    console.log(name);
    console.log(start);
    console.log(sex);
    return (
      <>
        <IntroSection child={back} />
        <section>
        
        </section>
      </>
    )
}

export default NamePopularity