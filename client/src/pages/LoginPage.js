import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: 'user' // Default to 'user'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { setIsAuthenticated, setUserType } = useAuth(); // Include setUserType
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, formData);
            localStorage.setItem('token', response.data.token); // Save token to local storage
            localStorage.setItem('userType', formData.userType); // Save user type (user/company)
            setIsAuthenticated(true); // Update authentication status
            setUserType(formData.userType); // Set user type in auth context
            setSuccess('Login successful. Redirecting...');
            navigate('/'); // Redirect to home 
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="p-4 shadow" style={{ borderRadius: '12px' }}>
                        <h2 className="text-center mb-4">Login to Your Account</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    required
                                    style={{ height: '50px', fontSize: '16px' }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    style={{ height: '50px', fontSize: '16px' }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formUserType" className="mb-3">
                                <Form.Label>Login as</Form.Label>
                                <Form.Select
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    style={{ height: '50px', fontSize: '16px' }}
                                >
                                    <option value="user">User</option>
                                    <option value="company">Company</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" style={{ padding: '12px' }}>
                                Login
                            </Button>

                            <div className="text-center mt-3 d-flex justify-content-center">
                                <span>Don't have an account? </span>
                                <Button 
                                    variant="link" 
                                    onClick={() => navigate('/signup')} 
                                    style={{ padding: '0', marginLeft: '5px' }}
                                >
                                    Register here
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
