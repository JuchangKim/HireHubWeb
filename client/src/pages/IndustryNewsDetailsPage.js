import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function IndustryNewsDetail() {
    const { id } = useParams();
    const [newsArticle, setNewsArticle] = useState(null);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');  // For logged-in user's name
    const [commentText, setCommentText] = useState('');  // For comment text input
    const [comments, setComments] = useState([]);  // For storing the comments
    
    // Function to format date in European style (DD/MM/YYYY HH:MM:SS)
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });
    };

    // Fetch news article and comments
    useEffect(() => {
        const fetchNewsArticle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/news/${id}`);
                console.log('Fetched News Article:', response.data);
                
                // Set the news article
                setNewsArticle(response.data);
        
                // Use the comments directly from the response
                setComments(response.data.comments);
            } catch (error) {
                setError('Error fetching the news article');
            }
        };
        fetchNewsArticle();
    }, [id]);


    // Fetch the logged-in user's profile to get the username
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsername(response.data.username); // Set the username from the user's profile
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Error fetching user profile');
            }
        };

        fetchUserProfile();
    }, []);

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        // Create the new comment object
        const newComment = {
            user: username,
            text: commentText,
            time: new Date().toISOString()  // Capture the current time in Date format to save in MongoDB
        };

        try {
            // Post the new comment to the server
            const response = await axios.post(`http://localhost:5000/api/news/${id}/comments`, newComment);

            // Format the updated comments list
            const formattedComments = response.data.comments.map(comment => ({
                ...comment,
                time: formatDate(comment.time)
            }));

            // Update the comments state with formatted comments
            setComments(formattedComments);
        
            // Clear the comment input field
            setCommentText('');
        } catch (error) {
            console.error('Error posting the comment:', error);
        }
    };


    if (error) {
        return <p>{error}</p>;
    }

    if (!newsArticle) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="mb-4">
                        <h1 className="display-5" style={{ fontWeight: 'bold' }}>{newsArticle.title}</h1>
                        <p className="text-muted">{newsArticle.datePosted}</p>
                        <img src={newsArticle.imageUrl} alt={newsArticle.title} className="img-fluid mb-4 rounded" />
                    </div>
                    <div className="content mb-5">
                    {newsArticle.content.split('\n').map((line, index) => (
                     <p key={index}>{line}</p>
                        ))}
                    </div>

                    {newsArticle.industry && newsArticle.industry.length > 0 && (
                    <div className="related-industry mb-5">
                        <h4>Industries</h4>
                        <div className="row">
                            <div className="col-12">
                                <ul className="list-inline">
                                    {newsArticle.industry.map((industry, index) => (
                                        <li key={index} className="list-inline-item mb-2">
                                            <span className="badge bg-primary p-2" style={{ fontSize: '1.1rem', padding: '0.75rem 1.25rem' }}>
                                                {industry}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                    {/* Relative Companies Section */}
                    {newsArticle.companies && newsArticle.companies.length > 0 && (
                        <div className="related-companies mb-5">
                            <h4>Related Companies</h4>
                            <ul className="list-inline">
                                {newsArticle.companies.map((company, index) => (
                                    <li key={index} className="list-inline-item">
                                        <a href={company.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                                            {company.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Comment Posting Section */}
                    <div className="comment-section mb-5">
                        <h3>Leave a Comment</h3>
                        <form onSubmit={handleCommentSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Your Name:</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={username}
                                    readOnly  // Set as read-only since username is fetched
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comment" className="form-label">Comment:</label>
                                <textarea
                                    id="comment"
                                    className="form-control"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit Comment</button>
                        </form>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                    <li key={index} className="media mb-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <strong>{comment.user}</strong> <span className="text-muted"> at {comment.time}</span>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{comment.text}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No comments yet. Be the first to comment!</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndustryNewsDetail;