import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SingleCountry = () => {

    let { name } = useParams();

    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
             .then((response) => {
                // console.log(response.data);
                setCountry(response.data[0]);
             })
             .catch((error) => {
                console.log(error);
             });
    }, []);

    return (
        <>
        <Row>
            <Col>
                <p><b>Common Name:</b> {(country) ? country.name.common : "Loading"}</p>
                <p><b>Official Name:</b> {(country) ? country.name.official : "Loading"}</p>
                <p><b>Currencies:</b> {(country) ? Object.values(country.currencies)[0].name : "Loading"}</p>
            </Col>
            <Col>
                <Image src={country?.flags.png}/>
            </Col>
        </Row>
        </>  
    );
};

export default SingleCountry;