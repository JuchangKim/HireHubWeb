# HireHub

HireHub is the best place to find a job and grow your career. HireHub is committed to connecting job seekers with top businesses, and it provides a seamless and efficient platform aligned with your professional goals. Whether you're looking for your first job, want to advance your career, or are seeking a career change, HireHub offers comprehensive resources, professional guidance, and an intuitive user interface to help you succeed.

---

## Table of Contents
1. [Features](#features)
2. [Demo](#demo)
3. [Dependencies](#dependencies)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Technologies Used](#technologies-used)
7. [Authors](#authors)

---

## Features
- Posting and editing job postings via CRUD functionalities (REST API)
- Secure user authentication with JWT
- Real-time search filters with useState
- Mobile-responsive design
- Reading news and commenting
- Optimising job listing via preference
- Posting company reviews
  
---

## Demo
[Live Demo Link](https://hirehub-bbfsh4a5feexh3gt.newzealandnorth-01.azurewebsites.net/)

![image](https://github.com/user-attachments/assets/46b8d504-a153-4ad8-8ac7-c7d86e13f67c)

---

## Dependencies

| Dependency                       | Icon                                                                                  |
|---------------------------------|---------------------------------------------------------------------------------------|
| Recent version of Windows        | ![Windows Icon](https://img.icons8.com/?size=40&id=gXoJoyTtYXFg&format=png&color=000000) |
| [Node.js](https://nodejs.org/en/)| ![Node.js Icon](https://img.icons8.com/?size=40&id=54087&format=png&color=000000)    |
| React (via npm)                 | ![React Icon](https://img.icons8.com/?size=40&id=123603&format=png&color=000000)      |

---

## Installation

### Windows Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/JuchangKim/HireHubWeb.git

2. **Navigate to the server folder**
   ```bash
   cd Hirehub/server
   
3. **Navigate to the client folder in a new terminal**
   ```bash
   cd Hirehub/client

4. **Install npm packages in both directories**
   ```bash
   npm install

5. **In the Hirehub/client directory**
   ```bash
   npm run build

6. **Move the build folder from HireHub/client to HireHub/server**
   - Make sure your server is configured to serve static files from this build folder.

7. **Run the server in HireHub/server directory**
   ```bash
   node app.js

8. **Open the App**
   - Enter https://hirehub-bbfsh4a5feexh3gt.newzealandnorth-01.azurewebsites.net/ in your browser. Chrome is recommended.

---

## Technologies Used
- Front-end: React
- Back-end: Node.js, Express
- Database: MongoDB
- Deployment: Azure Web Apps

---

## Authors

| Name               | GitHub Link                                                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Abdulmalik Alnasra | [GitHub](https://github.com/Abdul-was-here) ![GitHub Icon](https://img.icons8.com/?size=25&id=16318&format=png&color=000000) |
| Akshay Silswal     | [GitHub](https://github.com/AkkiSilswal) ![GitHub Icon](https://img.icons8.com/?size=25&id=16318&format=png&color=000000) |
| David Li           | [GitHub](https://github.com/ljld12315) ![GitHub Icon](https://img.icons8.com/?size=25&id=16318&format=png&color=000000) |
| Jc Kim             | [GitHub](https://github.com/JuchangKim) ![GitHub Icon](https://img.icons8.com/?size=25&id=16318&format=png&color=000000) |
