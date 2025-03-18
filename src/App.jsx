import { useEffect, useState } from 'react';
import './App.css'
import Blog from './components/blog';
import News from './components/news';

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSlectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(savedBlogs)
  }, [])
  
  const handleCreateBloog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog)) : [...prevBlogs, newBlog]
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
    setIsEditing(false)
    setSlectedPost(null)
  }

  const handleEditBlog = (blog) => {
    setSlectedPost(blog)
    setIsEditing(true)
    setShowNews(false)
    setShowBlog(true)
  }

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlog = prevBlogs.filter((blog) => blog !== blogToDelete)
      localStorage.setItem('blogs', JSON.stringify(updatedBlog))
      return updatedBlog
    })
  }

  const handleShowBlogs = () => {
    setShowNews(false)
    setShowBlog(true)
  }

  const handleBackToNews = () => {
    setShowNews(true)
    setShowBlog(false)
    setIsEditing(false)
    setSlectedPost(null)
  }

  return (
    <div className='container'>
      <div className='news-blog'>
        {showNews && (
          <News onShowBlogs={handleShowBlogs} blogs={blogs} onEditBlog={handleEditBlog} onDeleteBlog={handleDeleteBlog } />
        )}
        {showBlog && <Blog onBack={handleBackToNews} onCreateBlog={handleCreateBloog} editPost={selectedPost} isEditing={ isEditing} />}

      </div>
    </div>
  )
}

export default App
