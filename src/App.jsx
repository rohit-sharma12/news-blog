import { useState } from 'react';
import './App.css'
import Blog from './components/blog';
import News from './components/news';

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);

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
        {showNews && <News onShowBlogs={handleShowBlogs} />}
        {showBlog&& <Blog onBack={handleBackToNews} />}
       
      </div>

    </div>
  )
}

export default App
