import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditCompanyForm.css';


function EditCompyInfoPage() {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`);
                setCompanies(response.data);
            } catch (err) {
                setError('Error fetching companies');
            }
        };
        fetchCompanies();
    }, []);

    const handleEdit = (companyId) => {
        navigate(`/editcompany/${companyId}`); // 跳转到编辑页面
    };

    const handleDelete = async (companyId) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${companyId}`);
                setSuccess("Company deleted successfully.");
                setCompanies(companies.filter(company => company._id !== companyId));
            } catch (err) {
                setError("Error deleting company");
            }
        }
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Edit Company Information</h2>
            {success && <Alert variant="success">{success}</Alert>}
            <Table striped bordered hover>
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
                                    onClick={() => handleEdit(company._id)}
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
        </Container>
    );
}

export default EditCompyInfoPage;
