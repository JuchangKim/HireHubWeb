import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetailsPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/${id}`);
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [id]);

    return (
        <Container fluid className="p-4">
            {job ? (
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card className="job-details-card">
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Location:</strong> {job.location}<br />
                                    <strong>Salary:</strong> {job.salary}<br />
                                    <strong>Sector:</strong> {job.sector}<br />
                                    <strong>Work Type:</strong> {job.workType}<br />
                                    <strong>Description:</strong> {job.description}  {/* Show full description */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <p>Loading job details...</p>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default JobDetailsPage;
