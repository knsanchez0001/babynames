import React from 'react'
import { Link } from 'react-router-dom';
import IntroSection from '../IntroSection';

const Territories = () => {
  const back = <Link className='a-top' to={'/'}>Back</Link>;
  return (
    <>
      <IntroSection child={back} />
      <section>
        <h3 className='header-c'>
          <span className='header-c-text'>TODO</span>
        </h3>
      </section>
    </>
  )
}

export default Territories