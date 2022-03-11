import React from 'react'

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
                        <p>Any year after 1879</p>
                    </div>
                    <div className='interest-div'>
                        <h3>Popularity of a Name</h3>
                        <p>See How the Popularity of a Name has Changed Over Time!</p>
                        <form name='babyname' className='interest-form'>
                            <p>
                                <input id='name' className='interest-name' required/>
                                <label htmlFor='name'>Name</label>
                            </p>
                            <p>
                                <input id='startYear' type='number' min='1880' max='2020' maxLength='4' className='interest-name' required/>
                                <label htmlFor='startYear'>Start Year</label>
                            </p>
                            <p>
                                <input id='endYear' type='number' min='1880' max='2020' maxLength='4' className='interest-name' required/>
                                <label htmlFor='endYear'>End Year</label>
                            </p>
                            <fieldset >
                                <legend>Sex associated with name</legend>
                                <input type="radio" name="sex" value="M" id="male" required/>
                                <label>Male</label>
                                <input type="radio" name="sex" value="F" id="female" />
                                <label>Female</label>
                            </fieldset>
                            <p>
                                <input type='submit' value='Go'/>
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default InterestForms