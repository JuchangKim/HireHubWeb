import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

function SalaryEstimator() {
    const [roles, setRoles] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [locations, setLocations] = useState([]);
    const [experience, setExperience] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [salaryEstimate, setSalaryEstimate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch roles, industries, and locations
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const rolesResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/salary/roles`);
                const industriesResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/salary/industries`);
                const locationsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/salary/locations`);
                setRoles(rolesResponse.data);
                setIndustries(industriesResponse.data);
                setLocations(locationsResponse.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleEstimateSalary = async () => {
        setErrorMessage(''); // Clear previous error messages
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/salary/estimate`, {
                params: {
                    role: selectedRole,
                    industry: selectedIndustry,
                    location: selectedLocation,
                    experience: experience,
                },
            });
            setSalaryEstimate(response.data);
        } catch (error) {
            // Handle different types of errors
            if (error.response) {
                setErrorMessage(error.response.data.message || 'An unexpected error occurred. Please try again.');
            } else {
                setErrorMessage('Unable to connect to the server. Please check your network connection.');
            }
            setSalaryEstimate(null); // Clear previous salary estimates
        }
    };

    // Function to reset filters
    const resetFilters = () => {
        setSelectedRole('');
        setSelectedIndustry('');
        setSelectedLocation('');
        setExperience('');
        setSalaryEstimate(null); // Clear previous salary estimates
        setErrorMessage(''); // Clear previous error messages
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        handleEstimateSalary(); // Trigger the estimate salary function
    };

    return (
        <Container fluid className="p-4">
            <Row>
                <Col xs={12} md={6} className="mb-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="">Select role</option>
                                {roles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formIndustry" className="mb-3">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value)}
                            >
                                <option value="">Select industry</option>
                                {industries.map((industry) => (
                                    <option key={industry} value={industry}>{industry}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formLocation" className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">Select location</option>
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formExperience" className="mb-3">
                            <Form.Label>Experience (years)</Form.Label>
                            <Form.Control
                                type="number"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                min="0"
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit" variant="primary" className="me-2">
                                Estimate Salary
                            </Button>
                            <Button variant="secondary" onClick={resetFilters}>
                                Reset Filters
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={6}>
                    {errorMessage && (
                        <Alert variant="danger">
                            {errorMessage}
                        </Alert>
                    )}
                    {salaryEstimate && (
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>Salary Estimate for {selectedRole}</Card.Title>
                                <Card.Text>
                                    <strong>Location:</strong> {selectedLocation}<br />
                                    <strong>Industry:</strong> {selectedIndustry}<br />
                                    <strong>Experience:</strong> {experience} years<br />
                                    <strong>Minimum Salary:</strong> ${salaryEstimate.minSalary}<br />
                                    <strong>Maximum Salary:</strong> ${salaryEstimate.maxSalary}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default SalaryEstimator;
