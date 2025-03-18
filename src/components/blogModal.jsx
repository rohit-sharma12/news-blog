import React from 'react'
import './BlogModal.css'

const BlogModal = ({ show, blog, onClose }) => {
  if (!show) {
    return null
  }
  return (
    <div className='model'>
      <div className='model-content'>
        <span className='btn' onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </span>
        {blog.image && <img src={blog.image} alt="" className='image' />}
       
        <h2 className='title'>{blog.title}</h2>
        <p className='post-content'>{blog.content}</p>
      </div>
    </div>
  )
}

export default BlogModal
