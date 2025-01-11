
const Company = require('../models/Company');

// Handle company information

exports.addCompanyInfo = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ message: 'Company info added successfully!', company });
  } catch (error) {
    res.status(500).json({ message: 'Error adding company info', error });
  }
};


exports.getCompanyInfo = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving company info', error });
  }
};


exports.getCompanyInfoById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving company info', error });
  }
};


exports.updateCompanyInfo = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company info updated successfully!', company: updatedCompany });
  } catch (error) {
    res.status(500).json({ message: 'Error updating company info', error });
  }
};



exports.deleteCompanyInfo = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company info', error });
  }
};
