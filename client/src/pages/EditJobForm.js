import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditJobForm.css';

function EditJobForm() {
    const { jobId } = useParams(); 
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        sector: '',
        workType: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}`);
                setFormData(response.data); 
            } catch (err) {
                setError('Error fetching job data');
            }
        };
        fetchJob();
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        console.log(`Updating job with ID: ${jobId}`);
        console.log(`PUT request URL: ${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}`);
        
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}`, formData); 
            setSuccess('Job information updated successfully!');
            setTimeout(() => navigate('/editjob'), 2000); 
        } catch (err) {
            console.error('Error updating job information', err);
            setError('Error updating job information');
        }
    };
    
    

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="text-center mb-4">Edit Job</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter job title"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCompany" className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLocation" className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter job location"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSalary" className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                as="select"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select salary range</option>
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

                        <Form.Group controlId="formSector" className="mb-3">
                            <Form.Label>Sector</Form.Label>
                            <Form.Control
                                type="text"
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                placeholder="Enter job sector"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formWorkType" className="mb-3">
                            <Form.Label>Work Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="workType"
                                value={formData.workType}
                                onChange={handleChange}
                                placeholder="Enter work type"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter job description"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Save Changes
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditJobForm;
