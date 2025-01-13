import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Table, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ManageCompanyInfo() {
    const { companyId } = useParams();
    const [companyData, setCompanyData] = useState({
        name: '',
        phone: '',
        email: '',
        location: '',
        background: '',
        mission: '',
        benefits: '',
        culture: '',
        testimonials: '',
        image: '',
        video: ''
    });
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (companyId) {
            const fetchCompany = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${companyId}`);
                    setCompanyData(response.data);
                } catch (err) {
                    setError('Error fetching company details');
                }
            };
            fetchCompany();
        }

        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`);
                setCompanies(response.data);
            } catch (err) {
                setError('Error fetching companies');
            }
        };
        fetchCompanies();
    }, [companyId]);

    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (companyId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${companyId}`, companyData);
                setSuccess('Company information updated successfully!');
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/companies/add`, companyData);
                setSuccess('Company information added successfully!');
            }
            // Clear the form after submission
            setCompanyData({
                name: '',
                phone: '',
                email: '',
                location: '',
                background: '',
                mission: '',
                benefits: '',
                culture: '',
                testimonials: '',
                image: '',
                video: ''
            });
            window.scrollTo(0, 0);
            setTimeout(() => navigate('/editcompyinfo'), 2000);
        } catch (err) {
            setError('Error saving company information');
        }
    };

    const handleDelete = async (companyId) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${companyId}`);
                setCompanies(companies.filter(company => company._id !== companyId));
                setSuccess("Company deleted successfully.");
            } catch (err) {
                setError("Error deleting company");
            }
        }
    };

    return (
        <Container className="mt-5">
            <style>
                {`
                .border {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .shadow {
                    background-color: #fff;
                }
                .mt-5 {
                    margin-top: 3rem !important;
                }
                .table th, .table td {
                    vertical-align: middle; /* Center align cell content */
                }
                `}
            </style>
            <h2 className="text-center mb-4">{companyId ? 'Edit Company Information' : 'Add Company Info'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={companyData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={companyData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={companyData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={companyData.location}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Background</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="background"
                                value={companyData.background}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mission</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="mission"
                                value={companyData.mission}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Benefits</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="benefits"
                                value={companyData.benefits}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Culture</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="culture"
                                value={companyData.culture}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Testimonials</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="testimonials"
                                value={companyData.testimonials}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                name="image"
                                value={companyData.image}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control
                                type="url"
                                name="video"
                                value={companyData.video}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {companyId ? 'Save Changes' : 'Add Company'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            {/* Table for existing companies */}
            {!companyId && (
                <>
                    <h2 className="text-center mt-5">Existing Companies</h2>
                    <Table striped bordered hover responsive className="mt-3">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company._id}>
                                    <td>{company.name}</td>
                                    <td>{company.phone}</td>
                                    <td>{company.email}</td>
                                    <td>{company.location}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            onClick={() => navigate(`/editcompany/${company._id}`)}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(company._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

export default ManageCompanyInfo;
