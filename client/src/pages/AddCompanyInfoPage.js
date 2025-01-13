import React, { useState } from 'react';
import axios from 'axios';
import './AddCompanyInfoPage.css';

function AddCompanyInfoPage() {
  const [company, setCompany] = useState({
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

  const [errorMessage, setErrorMessage] = useState(null);


  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!company.name || !company.phone || !company.email || !company.location) {
      setErrorMessage('Please fill in all required fields: Company Name, Phone, Email, and Location.');
      return;
    }

    try {
 
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/companies/add`, company);


      if (window.confirm('Company information added successfully! Click OK to refresh.')) {
        window.location.reload(); 
      }
    } catch (error) {
      console.error('There was an error adding the company info', error);


      if (window.confirm('Failed to add company information. Click OK to try again.')) {
        window.location.reload(); 
      }
    }
  };

  return (
    <div className="add-company-container">
      <h1>Add Company Info</h1>
      <form className="add-company-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input
          name="name"
          value={company.name}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
        <input
          name="phone"
          value={company.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          name="email"
          value={company.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="location"
          value={company.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <textarea
          name="background"
          value={company.background}
          onChange={handleChange}
          placeholder="Company Background"
        />
        <textarea
          name="mission"
          value={company.mission}
          onChange={handleChange}
          placeholder="Company Mission"
        />
        <textarea
          name="benefits"
          value={company.benefits}
          onChange={handleChange}
          placeholder="Benefits"
        />
        <textarea
          name="culture"
          value={company.culture}
          onChange={handleChange}
          placeholder="Culture"
        />
        <textarea
          name="testimonials"
          value={company.testimonials}
          onChange={handleChange}
          placeholder="Testimonials"
        />
        <input
          name="image"
          value={company.image}
          onChange={handleChange}
          placeholder="Image URL"
          type="url"
        />
        <input
          name="video"
          value={company.video}
          onChange={handleChange}
          placeholder="Video URL"
          type="url"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCompanyInfoPage;
