import React from 'react'
import { useNavigate } from 'react-router-dom';

const NamePopularityForm = () => {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const start = document.getElementById('start').value;
        const sex = document.querySelector('input[name="sex"]:checked').value
        console.log(sex);
        navigate(`/namepopularity/${name}/${start}/${sex}`);
    }

    return (
        <div className='interest-div' >
            <h3>Popularity of a Name</h3>
            <p>See How the Popularity of a Name has Changed Over Time!</p>
            <form name='babyname' className='interest-form' onSubmit={handleSubmit}>
                <p>
                    <input id='name' className='interest-input' title="Name: (Do not use spaces, hyphens, or other non-alphabetic characters)" required />
                    <label htmlFor='name'>Name</label>
                </p>
                <p>
                    <select id='start' name='start'>
                        <option value="2000" defaultValue="2000">2000 &amp; later</option>
                        <option value="1980">1960 &amp; later</option>
                        <option value="1960">1940 &amp; later</option>
                        <option value="1940">1920 &amp; later</option>
                        <option value="1900">1900 &amp; later</option>
                        <option value="1880">1880 &amp; later</option>
                    </select>
                    <label htmlFor='start'>Years</label>
                </p>
                <fieldset >
                    <legend>Sex associated with name</legend>
                    <input type="radio" name="sex" value="M" id="male" required />
                    <label>Male</label><br/>
                    <input type="radio" name="sex" value="F" id="female" />
                    <label>Female</label>
                </fieldset>
                <p>
                    <input type='submit' value='Go' />
                </p>
            </form>
        </div>
    )
}

export default NamePopularityForm