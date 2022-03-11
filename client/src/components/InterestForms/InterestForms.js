import React from 'react'
import NamePopularityForm from './NamePopularityForm'
import NamesByBirthYearForm from './NamesByBirthYearForm'

const InterestForms = () => {
    return (
        <section>
            <div className='wrapper'>
                <h3 className='header-c'>
                    <span className='header-c-text'>Items of Interest</span>
                </h3>
                <div className='interest-wrapper'>
                    <NamesByBirthYearForm/>
                    <NamePopularityForm/>
                </div>
            </div>
        </section>
    )
}

export default InterestForms