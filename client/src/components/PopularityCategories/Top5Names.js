import React from 'react'
import { Link } from 'react-router-dom';
import IntroSection from '../IntroSection';

const Top5Names = () => {
  const back = <Link className='a-top' to={'/'}>Back</Link>;
  return (
    <>
      <IntroSection child={back} />
      <section>
        
      </section>
    </>
  )
}

export default Top5Names