import { Link } from "react-router-dom";

const PopularityCategory = ({ name, pic, link }) => {
    return (
        <Link to={link} className='icons-link'>
            <img alt="" src={pic} />
            <span className='icons-text'>{name}</span>
        </Link>

    )
}

export default PopularityCategory