import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './HomePage.css'; // Import custom CSS for additional styling

function HomePage() {
    const [latestJobs, setLatestJobs] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState('date'); // Default sort by date

    // Fetch latest jobs based on search and sort options
    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/jobs', {
                params: { keyword: searchKeyword, sort: sortOption }
            });
            setLatestJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Fetch jobs whenever sort option changes or search is triggered
    useEffect(() => {
        fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOption]); // Fetch jobs when the sort option changes

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        fetchJobs(); // Trigger search with current sort option
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(); // Trigger search on Enter key press
        }
    };

    const handleSort = (option) => {
        setSortOption(option); // Update sort option and trigger a new fetch
    };

    const highlightText = (text, keyword) => {
        if (!keyword) return text;
        const regex = new RegExp(`(${keyword})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <mark key={index}>{part}</mark> : part
        );
    };

    return (
        <Container fluid className="p-4">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <div className="text-center mt-4 mb-5">
                        <h1 className="display-4">Find Your Next Job</h1>
                        <Form>
                            <div className="d-flex align-items-center">
                                <Form.Group controlId="searchKeyword" className="mb-0 flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        value={searchKeyword}
                                        onChange={handleSearchChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Search jobs, companies, salaries..."
                                        className="search-bar"
                                    />
                                </Form.Group>
                                <Button variant="primary" size="lg" onClick={handleSearch} className="ml-3">Search</Button>
                                <Dropdown className="ml-3">
                                    <Dropdown.Toggle variant="primary" id="dropdown-sort">
                                        Sort by {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleSort('date')}>Date</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSort('salary')}>Salary</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSort('title')}>Title</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Form>
                    </div>
                    <Row>
                        {latestJobs.length > 0 ? (
                            latestJobs.map(job => (
                                <Col xs={12} md={6} lg={4} key={job._id} className="mb-4">
                                    <Card className="job-card">
                                        <Card.Body>
                                            <Card.Title>{highlightText(job.title, searchKeyword)}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {highlightText(job.company, searchKeyword)}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                <strong>Location:</strong> {job.location}<br />
                                                <strong>Salary:</strong> {job.salary}<br />
                                                <strong>Sector:</strong> {job.sector}<br />
                                                <strong>Work Type:</strong> {job.workType}<br />
                                                <strong>Description:</strong> {job.description.substring(0, 100)}...<br />
                                                <strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()} {/* Display datePosted */}
                                            </Card.Text>
                                            <Button variant="primary" href={`/job/${job._id}`}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center">
                                <p>No job postings match your search criteria. Please try a different keyword.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
