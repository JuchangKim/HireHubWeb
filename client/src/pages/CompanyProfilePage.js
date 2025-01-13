import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import './CompyProfilePage.css';

function CompanyProfilePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`);
                setCompanies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching company data:', error);
                setError('Failed to load company data');
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);


    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Company Profiles</h2>
            <Form className="mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search for companies..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ maxWidth: '500px', margin: '0 auto' }}
                    />
                </Form.Group>
            </Form>

            {filteredCompanies.length > 0 ? (
                <Row>
                    {filteredCompanies.map(company => (
                        <Col md={6} key={company.id} className="mb-4 d-flex align-items-stretch">
                            <Card className="w-100">
                                <Card.Img variant="top" src={company.image} />
                                <Card.Body>
                                    <Card.Title className="mb-3">{company.name}</Card.Title>
                                    <Card.Text>
                                       
                                            <strong>Contact Information:</strong>
                                            <br />
                                                Phone: {company.phone}<br />
                                                Email: {company.email}<br />
                                                Location: {company.location}
                                            
                                    </Card.Text>
                                    <Card.Text>
                                        
                                        <strong>Background:</strong><br />
                                        {company.background}<br /><br />
                                        
                                        <strong>Mission:</strong><br /> 
                                        {company.mission}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Employee Benefits:</strong><br />
                                        {company.benefits}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Company Culture:</strong><br />
                                        {company.culture}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Testimonials:</strong><br />
                                        {company.testimonials.map((test, index) => (
                                            <p key={index} style={{ marginBottom: '0.5rem' }}>{test}</p>
                                        ))}
                                    </Card.Text>
                                    {company.video && (
                                        <div className="mt-3">
                                            <strong>Watch our video:</strong>
                                            <iframe
                                                width="100%"
                                                height="200"
                                                src={company.video}
                                                title={`Video about ${company.name}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="warning">No companies found matching your search.</Alert>
            )}
        </Container>
    );
}

export default CompanyProfilePage;