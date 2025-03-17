import React, { Suspense, useState } from 'react'
import './Blog.css';
import img from '../assets/img.png'

const Blog = ({ onBack, onCreateBlog }) => {
    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submit, setSubmit] = useState(false);
    const [titleValid, setTitleValid] = useState(true);
    const [contentValid, setContentValid] = useState(true)

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        setTitleValid(true)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value) 
        setContentValid(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !content) {
            if (!title) setTitleValid(false)
            if (!content) setContentValid(false)
            return
        }
        const newBlog = {
            image: image || img,
            title,
            content,
        }
        onCreateBlog(newBlog)
        setImage(null)
        setTitle('')
        setContent('')
        setShowForm(false)
        setSubmit(true)
        setTimeout(() => {
            setSubmit(false)
            onBack()
        }, 2000)
    }
    return (
        <div className='blogs'>
            <div className="left">
                <img src="/src/assets/user.png" alt="img" />
            </div>
            <div className="right">
                {!showForm && !submit && (
                    <button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button>
                )}
                {submit && <p className='submission-msg'>Post Submitted</p>}
                <div className={`right-form ${showForm ? 'visible' : 'hidden'}`}>
                    <h1>New Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="img-upload">
                            <label htmlFor="file-upload" className='file-upload'>
                                <i class="fa-solid fa-cloud-arrow-up"></i> upload image
                            </label>
                            <input type="file" id='file-upload' onChange={handleImageChange} />
                        </div>
                        <input type="text" placeholder='Add Title(Max 50 Characters)' className={`title-input ${!titleValid ? 'invalid' 
                              : ''}`} value={title} onChange={handleTitleChange} maxLength={60} />
                        <textarea className={`text-input ${!contentValid ? 'invalid' : ''
                        }`} placeholder='Add Text' value={content} onChange={handleContentChange}></textarea>
                        <button className='submit-btn' type='submit'>Submit</button>
                    </form>
                </div>
                <button className='close-btn' onClick={onBack}>
                    Back  <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div >
    )
}
export default Blog