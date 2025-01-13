import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';


function JobListingPage() {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        region: '',
        sector: '',
        payRange: '',
        workType: '',
    });

    // JC - User jobPreferences
    const [userPreferences, setUserPreferences] = useState({
        jobTitle: "",
        location: "",
        industry: "",
        salary: "",
    });

    // JC - Track which preferences are selected
    const [selectedPreferences, setSelectedPreferences] = useState({
        jobTitle: true,
        location: true,
        industry: true,
        salary: true,
    });

    // JC - Fetch user's job preferences
    useEffect(() => {
        const fetchUserPreferences = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    // JC - Set user preferences or default values if any preference is missing
                    setUserPreferences({
                        jobTitle: response.data.jobPreferences?.jobTitle || "",
                        location: response.data.jobPreferences?.location || "",
                        industry: response.data.jobPreferences?.industry || "",
                        salary: response.data.jobPreferences?.salary || "",
                    });
                } catch (error) {
                    console.error('Error fetching user preferences:', error);
                }
            }
        };
        fetchUserPreferences();
    }, []);
    
    // JC - Fetch jobs with filters and preferences
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const filterParams = { ...filters };

            // JC - Apply jobTitle if the job title preference is selected and not empty
            if (selectedPreferences.jobTitle && userPreferences.jobTitle) {
                filterParams.jobTitle = userPreferences.jobTitle;
            }

            // JC - Apply location if the location preference is selected and not empty
            if (selectedPreferences.location && userPreferences.location) {
                filterParams.region = userPreferences.location;
            }

            // JC - Apply industry if the industry preference is selected and not empty
            if (selectedPreferences.industry && userPreferences.industry) {
                filterParams.sector = userPreferences.industry;
            }

            // JC - Apply salary if the salary preference is selected and not empty
            if (selectedPreferences.salary && userPreferences.salary) {
                filterParams.payRange = userPreferences.salary;
            }

                const response = await axios.get('http://localhost:5000/api/jobs', {
                    params: filterParams
                });
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, [filters, selectedPreferences, userPreferences]);

    // JC - this filter interact with jobPreference and basic filter crieteria. 
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (name === "region") {
            // JC - If the user sets a region filter, uncheck the location preference
            setSelectedPreferences((prevSelected) => ({
                ...prevSelected,
                location: false,
            }));
        }

        if (name === "payRange") {
            // JC - If the user sets a pay range filter, uncheck the salary preference
            setSelectedPreferences((prevSelected) => ({
                ...prevSelected,
                salary: false,
            }));
        }

        if (name === "sector") {
            // JC - If the user sets a sector filter, uncheck the industry preference
            setSelectedPreferences((prevSelected) => ({
                ...prevSelected,
                industry: false,
            }));
        }

        setFilters({
            ...filters,
            [name]: value
        });
    };


    const handleClearFilters = () => {
        setFilters({
            region: '',
            sector: '',
            payRange: '',
            workType: '',
        });
    };

    // JC - Creating checkbox with jobPreference data.
    const handlePreferenceToggle = (e) => {
        const { name, checked } = e.target;

        if (name === "location" && checked) {
            // JC - If the user selects the location preference, clear the region filter
            setFilters((prevFilters) => ({
                ...prevFilters,
                region: "",
            }));
        }

        if (name === "salary" && checked) {
            // JC - If the user selects the salary preference, clear the payRange filter
            setFilters((prevFilters) => ({
                ...prevFilters,
                payRange: "",
            }));
        }

        if (name === "industry" && checked) {
            // JC -If the user selects the location preference, clear the sector filter
            setFilters((prevFilters) => ({
                ...prevFilters,
                sector: "",
            }));
        }

        setSelectedPreferences((prevSelected) => ({
            ...prevSelected,
            [name]: checked,
        }));
    };

    return (
        <Container fluid className="p-4">
            <Row>
                <Col xs={12} md={4} lg={3} className="mb-4">
                    <Form className="filter-form">
                        <Form.Group controlId="formRegion">
                            <Form.Label>Region</Form.Label>
                            <Form.Control
                                as="select"
                                name="region"
                                value={filters.region}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select region</option>
                                <option value="Auckland">Auckland</option>
                                <option value="Wellington">Wellington</option>
                                <option value="Christchurch">Christchurch</option>
                                <option value="Dunedin">Dunedin</option>
                                <option value="Napier">Napier</option>
                                <option value="Hamilton">Hamilton</option>
                                <option value="Tauranga">Tauranga</option>
                                <option value="Queenstown">Queenstown</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSector">
                            <Form.Label>Sector</Form.Label>
                            <Form.Control
                                as="select"
                                name="sector"
                                value={filters.sector}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select sector</option>
                                <option value="IT">IT</option>
                                <option value="Finance">Finance</option>
                                <option value="Health">Health</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Trades">Trades</option>
                                <option value="Engineering">Engineering</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPayRange">
                            <Form.Label>Pay Range</Form.Label>
                            <Form.Control
                                as="select"
                                name="payRange"
                                value={filters.payRange}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select pay range</option>
                                <option value="20-30k">20-30k</option>
                                <option value="30-40k">30-40k</option>
                                <option value="40-50k">40-50k</option>
                                <option value="50-60k">50-60k</option>
                                <option value="60-70k">60-70k</option>
                                <option value="70-80k">70-80k</option>
                                <option value="80-90k">80-90k</option>
                                <option value="90-100k">90-100k</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formWorkType">
                            <Form.Label>Work Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="workType"
                                value={filters.workType}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select work type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClearFilters} className="mt-3">Clear Filters</Button>
                    </Form>

                    <hr />
                    {/* JC - Creating checkbox in the page with jobPreference data */}
                    <h5>Suggested Jobs by Preferences</h5>
                        <Form.Check
                            type="checkbox"
                            id="jobTitleCheckbox" 
                            label={`Job Title (${userPreferences.jobTitle || 'N/A'})`}
                            name="jobTitle"
                            checked={selectedPreferences.jobTitle}
                            onChange={handlePreferenceToggle}
                        />
                        <Form.Check
                            type="checkbox"
                            id="LocationCheckbox"
                            label={`Location (${userPreferences.location || 'N/A'})`}
                            name="location"
                            checked={selectedPreferences.location}
                            onChange={handlePreferenceToggle}
                        />
                        <Form.Check
                            type="checkbox"
                            id="IndustryCheckbox"
                            label={`Industry (${userPreferences.industry || 'N/A'})`}
                            name="industry"
                            checked={selectedPreferences.industry}
                            onChange={handlePreferenceToggle}
                        />
                        <Form.Check
                            type="checkbox"
                            id="SalaryCheckbox"
                            label={`Salary (${userPreferences.salary || 'N/A'})`}
                            name="salary"
                            checked={selectedPreferences.salary}
                            onChange={handlePreferenceToggle}
                        />
                </Col>
                <Col xs={12} md={8} lg={9}>
                    <Row>
                        {jobs.length > 0 ? (
                            jobs.map(job => (
                                <Col xs={12} md={6} lg={4} key={job._id} className="mb-4">
                                    <Card className="job-card">
                                        <Card.Body>
                                            <Card.Title>{job.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                            <Card.Text>
                                                <strong>Location:</strong> {job.location}<br />
                                                <strong>Salary:</strong> {job.salary}<br />
                                                <strong>Sector:</strong> {job.sector}<br />
                                                <strong>Work Type:</strong> {job.workType}<br />
                                                <strong>Description:</strong> {job.description ? job.description.substring(0, 100) : "No description available"}...<br />
                                                <strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()} {/* Display datePosted */}
                                            </Card.Text>
                                            <Button variant="primary" href={`/job/${job._id}`}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center">
                                <p>No job listings match your criteria or preferences. Please adjust your filters or preferences.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default JobListingPage;