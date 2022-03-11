import React from 'react'
import NamePopularityForm from './NamePopularityForm'

const InterestForms = () => {
    return (
        <section>
            <div className='wrapper'>
                <h3 className='header-c'>
                    <span className='header-c-text'>Items of Interest</span>
                </h3>
                <div className='interest-wrapper'>
                    <div className='interest-div'>
                        <h3>Popular Names by Birth Year</h3>
                        <p>Enter the Year and Popularity for a List of the Most Popular Names</p>
                        <p>Any year after 1879</p>
                    </div>
                    <NamePopularityForm/>
                </div>
            </div>
        </section>
    )
}

export default InterestForms