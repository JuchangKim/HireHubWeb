import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCompyInfoPage.css';


function EditCompanyForm() {
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${companyId}`);
                setCompanyData(response.data);
            } catch (err) {
                setError('Error fetching company details');
            }
        };
        fetchCompany();
    }, [companyId]);

    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${companyId}`, companyData);
            setSuccess('Company information updated successfully!');
            window.scrollTo(0, 0);
            setTimeout(() => navigate('/editcompyinfo'), 2000);
        } catch (err) {
            setError('Error updating company information');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Edit Company Information</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default EditCompanyForm;
