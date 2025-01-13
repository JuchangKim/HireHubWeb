import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import JobPreferences from "./JobPreferences"; // Import the new component

function RegisterPage() {
  const [formData, setFormData] = useState({
    userType: "user", // Default user type
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    jobPreferences: {   // Initialize jobPreferences object
      jobTitle: "",
      location: "",
      industry: "",
      salary: ""
    }
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes for jobPreferences fields separately
    if (["jobTitle", "location", "industry", "salary"].includes(name)) {
      setFormData({
        ...formData,
        jobPreferences: {
          ...formData.jobPreferences,
          [name]: value, // Update the relevant jobPreferences field
        },
      });
    } else {
      // For other fields outside jobPreferences
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      confirmPassword,
    } = formData;

    if (!firstName || !lastName || !email || !phoneNumber || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
        userType: formData.userType, // Include userType in registration data
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        username: formData.username,
        password: formData.password,
        // Include jobPreferences in registration data
        jobPreferences: {
          jobTitle: formData.jobPreferences.jobTitle,
          location: formData.jobPreferences.location,
          industry: formData.jobPreferences.industry,
          salary: formData.jobPreferences.salary,
        }
      });
      setSuccess("Registration successful. You can now log in.");
      setFormData({
        userType: "user", // Reset userType to default after successful registration
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
        jobPreferences: {
          jobTitle: "",
          location: "",
          industry: "",
          salary: ""
        }
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserType" className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="user">User</option>
                <option value="company">Company</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                    className="input-field"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                    className="input-field"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a password"
                required
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="input-field"
              />
            </Form.Group>

            {/* Include the Job Preferences component */}
            <JobPreferences formData={formData} handleChange={handleChange} />

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <Link to="/login">Already have an account? Log in</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
