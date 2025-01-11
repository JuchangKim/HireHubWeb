const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('../models/Review');


dotenv.config();

const uri = 'mongodb+srv://brad193026:rla8230643@hirehubweb.pvnmg.mongodb.net/?retryWrites=true&w=majority&appName=HireHubWeb'; 
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const reviews = [
    {
        companyName: 'TechCorp',
        reviewerName: 'John Smith',
        rating: 5,
        reviewText: 'TechCorp is an amazing place to work. Great culture, opportunities for growth, and supportive management.',
        timestamp: new Date('2024-09-01')
    },
    {
        companyName: 'FinanceCo',
        reviewerName: 'Sarah Johnson',
        rating: 4,
        reviewText: 'FinanceCo offers a lot of career advancement, but the workload can be overwhelming at times.',
        timestamp: new Date('2024-08-28')
    },
    {
        companyName: 'HealthCare Plus',
        reviewerName: 'Michael Brown',
        rating: 3,
        reviewText: 'The work is fulfilling but the management could be better at communication.',
        timestamp: new Date('2024-08-15')
    },
    {
        companyName: 'BuildNZ',
        reviewerName: 'Emily Davis',
        rating: 4,
        reviewText: 'Great place to work with a lot of opportunities for hands-on experience. The work-life balance is good.',
        timestamp: new Date('2024-08-30')
    },
    {
        companyName: 'AdPro',
        reviewerName: 'Chris Martin',
        rating: 5,
        reviewText: 'AdPro is a fast-paced environment with a lot of creative freedom. Great management and benefits.',
        timestamp: new Date('2024-09-02')
    },
    {
        companyName: 'PowerUp Services',
        reviewerName: 'Lisa Wilson',
        rating: 4,
        reviewText: 'Good place to work with a supportive team. The benefits are great, but the workload can be heavy.',
        timestamp: new Date('2024-08-20')
    },
    {
        companyName: 'LearnNZ',
        reviewerName: 'David Clark',
        rating: 3,
        reviewText: 'The job is rewarding, but sometimes the administration can be difficult to deal with.',
        timestamp: new Date('2024-08-18')
    },
    {
        companyName: 'Taste of NZ',
        reviewerName: 'Sophia Lee',
        rating: 5,
        reviewText: 'An incredible place to work as a chef! The kitchen is well-organized and the team is fantastic.',
        timestamp: new Date('2024-09-03')
    }
];

const seedReviews = async () => {
    try {
        await Review.deleteMany(); // Delete all existing reviews
        await Review.insertMany(reviews); // Insert the dummy reviews
        console.log('Company review data seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding company review data:', error);
        mongoose.connection.close();
    }
};

seedReviews();
