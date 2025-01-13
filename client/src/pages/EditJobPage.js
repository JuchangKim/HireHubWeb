import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const initialFormData = {
    title: '',
    company: '',
    location: '',
    salary: '',
    sector: '',
    workType: '',
    description: ''
};

function EditJobPage() {
    const { jobId } = useParams(); // This will be null when creating a new job
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs`);
                setJobs(response.data);
            } catch (err) {
                setError('Error fetching jobs');
            }
        };
        fetchJobs();
        // If jobId exists, fetch job data for editing
        if (jobId) {
            const fetchJob = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}`);
                    setFormData(response.data);
                } catch (err) {
                    setError('Error fetching job data');
                }
            };
            fetchJob();
        }
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = jobId
            ? `${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}` // Update job
            : `${process.env.REACT_APP_API_BASE_URL}/api/jobs`; // Create new job

        try {
            if (jobId) {
                await axios.put(url, formData);
                setSuccess('Job information updated successfully!');
            } else {
                await axios.post(url, formData);
                setSuccess('Job created successfully!');
            }
            setTimeout(() => {
                navigate('/editjob'); // Redirect after success
            }, 2000);
        } catch (err) {
            console.error('Error saving job information', err);
            setError('Error saving job information');
        }
    };

    const handleEdit = (jobId) => {
        navigate(`/editjob/${jobId}`); 
    };

    const handleDelete = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) { 
            try {
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}`);
                setSuccess("Job deleted successfully.");
                setJobs(jobs.filter(job => job._id !== jobId)); 
            } catch (err) {
                setError("Error deleting job");
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row>
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
                <Col xs={12} md={4}>
                    <div style={{ textAlign: 'center', marginBottom: '20px', width: '200%' }}>
                        <h2 style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>Job Listings</h2>
                    </div>
                    {success && <Alert variant="success">{success}</Alert>}
                    <div style={{ width: '200%', marginTop: '20px' }}>
                        <Table striped bordered hover style={{ width: '100%', tableLayout: 'auto' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '30%' }}>Title</th>
                                    <th style={{ width: '20%' }}>Company</th>
                                    <th style={{ width: '20%' }}>Location</th>
                                    <th style={{ width: '15%' }}>Salary</th>
                                    <th style={{ width: '15%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job => (
                                    <tr key={job._id}>
                                        <td>{job.title}</td>
                                        <td>{job.company}</td>
                                        <td>{job.location}</td>
                                        <td>{job.salary}</td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleEdit(job._id)}
                                                    className="me-2"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDelete(job._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
            <style jsx>{`
                .table th, .table td {
                    vertical-align: middle;
                }
                .table {
                    font-size: 1rem;
                }
            `}</style>
        </Container>
    );
}

export default EditJobPage;
