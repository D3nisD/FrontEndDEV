import { useState, useEffect } from 'react';
import axios from '../config/api';

import Row from 'react-bootstrap/Row';
import { Dropdown, DropdownButton, Button, Container } from 'react-bootstrap';

import CountryCard from '../components/CountryCard';
import Loading from '../components/Loading';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Home = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [term, setTerm] = useState("");

    // const [region, setRegion] = useState("all");

    useEffect(() => {
        axios.get(`/all`)
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    let countryCards = filteredCountries.map((country, i) => {
        return <CountryCard bg="light" key={i} flag={country.flags.png} name={country.name.common} region={country.region} />;
    });


    const handleSelect = (event) => {

        if (event === "all") {
            setFilteredCountries(countries);
        }
        else {
            let filter = countries.filter((country) => {
                return country.region === event;
            });

            setFilteredCountries(filter);
        }

    };

    const handlePopSelect = (event) => {

        if (event === "all") {
            setFilteredCountries(countries);
        }
        else {
            let filter = filteredCountries.filter((country) => {
                return country.population <= event;
            });

            setFilteredCountries(filter);
        }

    };

    const handleSearch = (event) => {

        let value = event.target.value;

        setTerm(value);

        // if search term was changed to blank, show all countries
        if (value === "") {
            setFilteredCountries(countries);
        }
        // else if search term is less than or = 1, do nothing
        else if (value <= 1) {
            return;
        }
        else {
            let filter = countries.filter((country) => {
                return country.name.common.toLowerCase().includes(value.toLowerCase());
            });

            setFilteredCountries(filter);
        }

    };

    const handleSort = (event) => {
        let sorted = [...filteredCountries];

        sorted.sort((a, b) => {
            if (a.population > b.population) {
                return -1;
            }

            if (a.population < b.population) {
                return 1;
            }

            return 0;
        });

        setFilteredCountries(sorted);
    };

    return (
        <>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <NavDropdown title="Select Countries Only In..." onSelect={handleSelect}>
                    <Dropdown.Item eventKey="all">All</Dropdown.Item>
                    <NavDropdown.Item eventKey="Africa">Africa</NavDropdown.Item>
                    <NavDropdown.Item eventKey="Europe">Europe</NavDropdown.Item>
                    <NavDropdown.Item eventKey="Asia">Asia</NavDropdown.Item>
                    <NavDropdown.Item eventKey="Oceania">Oceania</NavDropdown.Item>
                    <NavDropdown.Item eventKey="Americas">Americas</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Select Countries With a Population....." onSelect={handlePopSelect}>
                    <NavDropdown.Item eventKey="all">All</NavDropdown.Item>
                    <NavDropdown.Item eventKey="100000">Less than 100 thousand</NavDropdown.Item>
                    <NavDropdown.Item eventKey="1000000">Less than 1 million</NavDropdown.Item>
                    <NavDropdown.Item eventKey="5000000">Less than 5 million</NavDropdown.Item>
                    <NavDropdown.Item eventKey="10000000">Less than 10 million</NavDropdown.Item>
                    <NavDropdown.Item eventKey="50000000">Less than 50 million</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
            <input placeholder='Search' className='my-5 w-100'  onChange={handleSearch} value={term} />
            </Nav>
            
            <Row xs={1} md={3} className='mx-5'>
                {(countries.length > 0) ? countryCards : <Loading />}
            </Row>
        </>

    );
};


export default Home;