import React, { useState } from 'react'
import './Blog.css';

const Blog = ({ onBack }) => {
    const [showForm, setShowForm] = useState(false)
    return (
        <div className='blogs'>
            <div className="left">
                <img src="/src/assets/user.png" alt="img" />
            </div>
            <div className="right">
                {showForm ? (
                    <div className="right-form">
                        <h1>New Post</h1>
                        <form>
                            <div className="img-upload">
                                <label htmlFor="file-upload" className='file-upload'>
                                    <i class="fa-solid fa-cloud-arrow-up"></i> upload image
                                </label>
                                <input type="file" id='file-upload' />
                            </div>
                            <input type="text" placeholder='Add Title(Max 50 Characters)' className='title-input' />
                            <textarea className='text-input' placeholder='Add Text'></textarea>
                            <button className='submit-btn' type='submit'>Submit</button>
                        </form>
                    </div>
                ) : (
                    <button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button>
                )}


                <button className='close-btn' onClick={onBack}>
                    Back  <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div >
    )
}
export default Blog