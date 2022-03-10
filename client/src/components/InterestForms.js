import React from 'react'

const InterestForms = () => {
    return (
        <section>
            <div className='wrapper'>
                <h3 className='header-c'>
                    <span className='header-c-text'>Items of Interest</span>
                </h3>
                <div className='interest-div'>
                    <div className='interest-form'>
                        <h3>Popular Names by Birth Year</h3>
                        <p>Enter the Year and Popularity for a List of the Most Popular Names</p>
                        <p>Any year after 1879</p>

                    </div>
                    <div className='interest-form'>
                        <h3>Popularity of a Name</h3>
                        <p>See How the Popularity of a Name has Changed Over Time!</p>
                        

                    </div>
                </div>
            </div>
        </section>
    )
}

export default InterestForms