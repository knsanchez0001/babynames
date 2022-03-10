import React from 'react'

const InterestForms = () => {
    return (
        <section>
            <div className='wrapper'>
                <h3 className='header-c'>
                    <span className='header-c-text'>Items of Interest</span>
                </h3>
                <div>
                    <h3>Popular Names by Birth Year</h3>
                    <p>Enter the Year and Popularity for a List of the Most Popular Names</p>
                    <p>Any year after 1879</p>
                    <form name="popnames" >
                        {/* <p>
                  <input style="width:100px" type="text" pattern="\d{4}" name="year" size="5" maxlength="4" id="year" value="2020" title="Birth Year: Must be 4 numbers" required=""/>
                  <label style="display:inline;" for="year">&nbsp;&nbsp;Birth Year</label><br/>
                </p> */}

                    </form>
                </div>
            </div>
        </section>
    )
}

export default InterestForms