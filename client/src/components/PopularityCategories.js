import React from 'react'

const PopularityCategories = () => {
    return (
        <section>
            <div className='wrapper icons-wrapper'>
                <h3>View Popularity of Names By:</h3>
                <div className='icons-div'>
                    <a className='icons-link' href='/' >
                        <img alt=""  src="https://www.ssa.gov/OACT/babynames/assets/images/popularity.svg"/>
                        <span className='icons-text'>Change in popularity</span>
                    </a>
                    <a className='icons-link' href='/' >
                        <img alt=""  src="https://www.ssa.gov/OACT/babynames/assets/images/top5.svg"/>
                        <span className='icons-text'>Top 5 names</span>
                    </a>
                    <a className='icons-link' href='/' >
                        <img alt=""  src="https://www.ssa.gov/OACT/babynames/assets/images/decade.svg"/>
                        <span className='icons-text'>Year span</span>
                    </a>
                    <a className='icons-link' href='/' >
                        <img alt=""  src="https://www.ssa.gov/OACT/babynames/assets/images/state.svg"/>
                        <span className='icons-text'>State</span>
                    </a>
                    <a className='icons-link' href='/' >
                        <img alt=""  src="https://www.ssa.gov/OACT/babynames/assets/images/territory.svg"/>
                        <span className='icons-text'>U.S. territories</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default PopularityCategories