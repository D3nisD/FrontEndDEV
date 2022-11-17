import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const CountryCard = (props) => {
    return (
        <Card bg="light" style={{ width: '18rem' }}>
            <Card.Img variant='top' src={props.flag} />
            <Card.Body>
                <Card.Title><Link to={`/country/${props.name}`}>{props.name}</Link></Card.Title>
                <p>{props.region}</p>
            </Card.Body>
        </Card>
    );
};

export default CountryCard;