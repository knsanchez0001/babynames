import React from 'react'
import { Link } from 'react-router-dom'
import IntroSection from '../IntroSection'

const RankChange = () => {
  const back = <Link className='a-top' to={'/'}>Back</Link>;
  return (
    <>
      <IntroSection child={back} />
      <section>
        
      </section>
    </>
  )
}

export default RankChange