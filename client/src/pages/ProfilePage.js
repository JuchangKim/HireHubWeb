import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card, Row, Col } from "react-bootstrap";
import JobPreferences from "./JobPreferences"; // Import the JobPreferences card

// JC - The user has jobpreferences data
const Profile = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    resume: "",
    // JC - the job preferences is declared here.
    jobPreferences: {
      salary: "",
      location: "",
      industry: "",
      jobTitle: ""
    } // Updating job preference
  });
  const [resumeFileName, setResumeFileName] = useState("");
  const [message, setMessage] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [resumeSuccessMessage, setResumeSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // JC - the job preferences data also will be represented.
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          resume: response.data.resume || "",
          // JC - the job Preferences data are added.
          jobPreferences: {
            jobTitle: response.data.jobPreferences?.jobTitle || "",
            location: response.data.jobPreferences?.location || "",
            salary: response.data.jobPreferences?.salary || "",
            industry: response.data.jobPreferences?.industry || "",
          },

        });
        setResumeFileName(response.data.resumeFileName || "");
      } catch (err) {
        setError("Error fetching profile. Please try again.");
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      errors.firstName = "First Name must contain only alphabets and spaces.";
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      errors.lastName = "Last Name must contain only alphabets and spaces.";
    }
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain only digits.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // JC - the jobPreferences data is also added and show the previous jobPreferences data first.
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (['salary', 'location', 'industry', 'jobTitle'].includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        jobPreferences: {
          ...prevFormData.jobPreferences,
          [name]: value
        }
      }));
    } else {
      // JC - For other fields outside jobPreferences
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  // JC - when submit, the jobPreferences data is submitted together.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");


    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/profile`,
        {
          ...formData,
          // JC - Adding jobPreferences data when submit.
        jobPreferences: { 
          jobTitle: formData.jobPreferences.jobTitle || "", 
          location: formData.jobPreferences.location || "", 
          industry: formData.jobPreferences.industry || "", 
          salary: formData.jobPreferences.salary || ""
        }
      },
      {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Profile updated successfully!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error("Error updating profile:", err.response.data);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (file.size > 5 * 1024 * 1024) {
        setResumeError("File size exceeds 5MB.");
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = async () => {
        const resumeData = fileReader.result;
        setFormData({ ...formData, resume: resumeData });
        setResumeFileName(file.name);
        setResumeError("");
        setResumeSuccessMessage("Resume uploaded successfully!");

        setTimeout(() => {
          setResumeSuccessMessage("");
        }, 2000);

        const token = localStorage.getItem("token");

        try {
          await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/profile`,
            { resume: resumeData, resumeFileName: file.name },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (e) {
          setResumeError("Failed to save resume: Please try again.");
        }
      };
    } else {
      setResumeError("Only PDF files are allowed.");
    }
  };

  const handleViewResume = () => {
    if (formData.resume) {
      const newWindow = window.open();
      newWindow.document.write(
        `<iframe width="100%" height="100%" src="${formData.resume}"></iframe>`
      );
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 p-4">
      <Card className="login-card p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="mb-3"
                isInvalid={!!formErrors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="mb-3"
                isInvalid={!!formErrors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mb-3"
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="mb-3"
                isInvalid={!!formErrors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            {/* JobPreferences card is added between phone number and resume */}
            <JobPreferences formData={formData} handleChange={handleChange} />
            
            <Form.Group controlId="formResume">
              <Form.Label>Upload Resume (10MB PDF Only)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="mb-3"
              />
              {resumeError && <Alert variant="danger">{resumeError}</Alert>}
              {resumeSuccessMessage && (
                <Alert variant="success">{resumeSuccessMessage}</Alert>
              )}
              {resumeFileName && (
                <Form.Control
                  type="text"
                  value={`Uploaded: ${resumeFileName}`}
                  readOnly
                  className="mb-3"
                />
              )}
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Update Profile
                </Button>
              </Col>
              {formData.resume && (
                <Col>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleViewResume}
                  >
                    View Resume
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;