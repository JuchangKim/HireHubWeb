const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JobListing = require('../models/JobListing');

dotenv.config();

const uri = 'mongodb+srv://brad193026:KXUcGk9aMKz_3!-@hirehubweb.pvnmg.mongodb.net/?retryWrites=true&w=majority&appName=HireHubWeb'; 
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

  const jobs = [
    {
        title: 'Software Engineer',
        company: 'Oceania Aerospace Ventures Limited',
        location: 'Christchurch',
        salary: '80-90k',
        sector: 'Engineering',
        workType: 'Full-Time',
        description: 'Fiso Engineering & Aerospace is seeking a skilled, experienced, and highly motivated Software Engineer to join our team. The position involves working collaboratively with an interdisciplinary engineering team to create, develop, and implement innovative engineering solutions across a range of industries & sectors. The software engineer is expected to solve problems within the software scope of our projects, both current, and future. These include projects in civil development and aerospace along with cross-industry technology development. These include projects in education, civil development, healthcare, alternative energy, and aerospace. Overall, the software engineer is expected to be a leader in software development at Fiso Engineering & Aerospace. Recognising the supported start-up environment that we operate in, the position demands the ability to rapidly prototype and collaborate with the hardware engineering team to deliver solutions efficiently.',
        datePosted: new Date('2024-09-01')
    },

    {
        title: 'Software Engineer - Payments',
        company: 'ASB Bank Limited',
        location: 'Auckland',
        salary: '90-100k',
        sector: 'Engineering',
        workType: 'Full-Time',
        description: 'We are looking for an individual who can work independently and provide guidance to growing developers. You are pragmatic and design effective solutions. You can document and present your technical designs to a wide range of audience. You have the ability and drive to deliver Card Payment change through to the production environment. You will be given opportunities to extend your sphere of influence beyond your squad to other squads and platforms, both to share your knowledge and experience and to extend it by drawing on the knowledge and experience of others. You will work collaboratively with our squads and stakeholders to be the voice of engineering and deliver products that delight our customers.',
        datePosted: new Date('2024-08-15')
    },
    {
        title: 'Financial Analyst',
        company: 'Northpower Ltd',
        location: 'Wellington',
        salary: '60-70k',
        sector: 'Finance',
        workType: 'Full-Time',
        description: 'We are seeking a proactive financial professional with ability to thrive in a fast-paced environment, supporting with gathering, analysing and reporting on large amounts of information. This role will support our Group Commercial team and Corporate budget holders with high quality financial analysis, modelling, reporting and management accounting services to aid managerial planning and commercial decision-making.',
        datePosted: new Date('2024-08-15')
    },

    {
        title: 'Business Partner',
        company: 'BNZ',
        location: 'Queenstown',
        salary: '90-100k',
        sector: 'Finance',
        workType: 'Full-Time',
        description: 'We are looking for someone with a great attitude and desire to contribute to a high performing team!Ideally you will have existing strong business acumen and business development skills. You may already have an established professional network, or a proven ability to grow a network, in order to acquire new business. You will also have excellent attention to detail and an overwhelming desire to serve our customers brilliantly.',
        datePosted: new Date('2024-08-20')
    },

    {
        title: 'NURSE PRACTITIONER',
        company: 'CICADA HEALTH LTD',
        location: 'Tauranga',
        salary: '40-50k',
        sector: 'Health',
        workType: 'Part-Time',
        description: 'NZ Registered Nurse Practitioner required for 2-4 days per week ( negotiable ).Providing clinics into Aged Residential Care facilities.  Weekends and evenings 1:5 on call. No overnight on call. Full drivers license required.  Other bonus funding streams also available for additional income.Clinics based from Te Puke through to Omokoroa.Collegial team with GP / NP support.  Full orientation provided. Aged Care / Palliative Care experience desirable.  ',
        datePosted: new Date('2024-08-20')
    },
    {
        title: 'Graphic Designer',
        company: 'New Zealand Taxpayers Union Inc.',
        location: 'Wellington',
        salary: '70-80k',
        sector: 'IT',
        workType: 'Full-Time',
        description: 'We are seeking a Graphic Designer. You will play a vital role as our in-house designer in visually conveying our organisation’s mission of Lower Taxes, Less Waste and More Accountability.',
        datePosted: new Date('2024-08-25')
    },
    {
        title: 'Marketing Coordinator - ANZ',
        company: 'ADInstruments',
        location: 'Dunedin',
        salary: '90-100k',
        sector: 'Marketing',
        workType: 'Full-Time',
        description: 'The position is based in Dunedin and works closely with the Global Marketing team and the ANZ Sales and Support teams, based in Sydney. As the ANZ Marketing Coordinator, you will coordinate and execute marketing plans and activities for the ANZ region that will grow awareness, generate inquiries, and create ongoing engagement with our products and people. A major element of the role is coordinating with our Sydney-based Sales and Support teams on their requirements for attending in-person events and conferences. This could involve organising logistics, sending emails to encourage visitors to engage with us at the event, and coordinating booth graphics and swag.You will need to be organised and able to multitask. Some travel domestically and to Australia to attend conferences and events will be required. You will also support the sales teams with their email and digital marketing. This includes creating invitations for workshops and webinars, and putting out an interesting and click-worthy monthly e-newsletter for the ANZ region. You will be self-motivated to own and drive digital marketing initiatives for the region, from making compelling social media campaigns to creating digital content like e-books or customer stories.',
        datePosted: new Date('2024-09-05')
    },
    {
        title: 'Electrician Required',
        company: 'Power Jointing (2018) Limited',
        location: 'Christchurch',
        salary: '50-60k',
        sector: 'Trades',
        workType: 'Full-Time',
        description: 'Power Jointing (2018) Limited is an electrical distribution and civil construction contractor carrying out projects across the Christchurch, Waimakariri, and Hurunui Districts. We are Currently seeking Electricians to join the team! ',
        datePosted: new Date('2024-08-30')
    },
    {
        title: 'Early Childhood Teacher',
        company: 'Childsteps Early Learning Centre',
        location: 'Napier',
        salary: '60-70k',
        sector: 'Education',
        workType: 'Full-Time',
        description: 'Your job description involves discharging the Standards for the Teaching Profession and the Code of Professional Responsibility as set down by the Teaching Council of Aotearoa New Zealand. Joining the journey as a Childsteps teacher will provide you with meaningful learning experiences and opportunities for professional and personal development along with collaborative team learning that will grow your teaching capacity. When combined with a passionate teacher, our aesthetic and purposeful environment creates a wonderful place for nurturing the development of young children.  We would love someone who enjoys setting up fun activities and messy play, who takes pride in their environment and is strong in planning, assessment and evaluation.',
        datePosted: new Date('2024-08-10')
    },
    {
        title: 'Kitchen Assistant',
        company: 'Arvida The Cascades ',
        location: 'Hamilton ',
        salary: '50-60k',
        sector: 'Hospitality',
        workType: 'Full-Time',
        description: 'We develop and operate communities that provide independent living and aged care services to older New Zealanders - with a resident-led approach. Each day, our interactions with our team and residents are guided by three values: Being There | In it Together | Look for a Way.',
        datePosted: new Date('2024-09-03')
    }
];

const seedJobs = async () => {
    try {
        await JobListing.deleteMany(); // Delete all existing jobs
        await JobListing.insertMany(jobs); // Insert the dummy jobs
        console.log('Job data seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding job data:', error);
        mongoose.connection.close();
    }
};

seedJobs();
