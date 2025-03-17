import { useEffect, useState } from 'react';
import './App.css'
import Blog from './components/blog';
import News from './components/news';

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(savedBlogs)
  }, [])
  const handleCreateBloog = (newBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs, newBlog]
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
  }

  const handleShowBlogs = () => {
    setShowNews(false)
    setShowBlog(true)
  }

  const handleBackToNews = () => {
    setShowNews(true)
    setShowBlog(false)
  }


  return (
    <div className='container'>
      <div className='news-blog'>
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlog && <Blog onBack={handleBackToNews} onCreateBlog={handleCreateBloog} />}

      </div>

    </div>
  )
}

export default App
