import React, { useEffect, useState } from 'react'
import Weather from './weather'
import Calender from './calendar'
import './news.css'
import axios from 'axios'
import img from '../assets/img.png'
import NewsModel from './newsModel'
import Bookmark from './bookmark'

const categories = ['general', 'world', 'bussiness', 'sport', 'technology', 'entertainment', 'science', 'health', 'nation']

const News = () => {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('general');
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModel] = useState(false);
    const [selectedArticle, setSelectedAreticle] = useState(null);
    const [bookmark, setBookmark] = useState([]);
    const [showBookmark, setShowBookmark] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=f93d713a97e1fc26ac2f9d8fe6162a37`;


            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=f93d713a97e1fc26ac2f9d8fe6162a37`
            }

            const response = await axios.get(url)
            const fetchedNews = response.data.articles

            fetchedNews.forEach((article) => {
                if (!article.image) {
                    article.image = img
                }
            })

            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))
        }
        fetchNews()
    }, [category, searchQuery])

    const handleCategory = (e, category) => {
        e.preventDefault()
        setCategory(category)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(search)
        setSearch('')
    }

    const handleArticleClick = (article) => {
        setSelectedAreticle(article)
        setShowModel(true)
    }

    const handleBookmarkClick = (article) => {
        setBookmark((prevBookmark) => {
            const updateBookmark = prevBookmark.find((bookmark) => bookmark.title === article.title) ? prevBookmark.filter((bookmark) => bookmark.title !== article.title) : [...prevBookmark, article]
            return updateBookmark
        })
    }

    return (
        <div className='news'>
            <header className='header'>
                <h1 className='logo'>News & Blog</h1>
                <div className="search">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder='Search News' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type='submit'>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className='content'>
                <div className="navbar">
                    <div className="user">
                        <img src="/src/assets/user.png" alt="" />
                        <p>Rohit's Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className='nav-heading'>Categories</h1>
                        <div className="links">
                            {categories.map((category) => (
                                <a key={category} href="#" className='link' onClick={(e) => handleCategory(e, category)}>{category}</a>
                            ))}
                            <a href="#" className='link' onClick={() =>setShowBookmark(true)}>Bookmarks
                                <i class="fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (
                        <div className="headline" onClick={() => handleArticleClick(headline)}>
                            <img src={headline.image || img} alt="" />
                            <h2 className='headline-title'>{headline.title}
                                <i onClick={(e) => {
                                    e.stopPropagation()
                                    handleBookmarkClick(headline)
                                }} class={`${bookmark.some((bookmark) => bookmark.title === headline.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}></i>
                            </h2>
                        </div>
                    )}

                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div className="news-grid-item" onClick={() => handleArticleClick(article)}>
                                <img key={index} src={article.image || img} alt="" />
                                <h3>{article.title} <i onClick={(e) => {
                                    e.stopPropagation()
                                    handleBookmarkClick(article)
                                }} class={`${bookmark.some((bookmark) => bookmark.title === article.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}></i></h3>
                            </div>
                        ))}
                    </div>
                </div>
                <NewsModel show={showModal} article={selectedArticle} onClose={() => setShowModel(false)} />
                <Bookmark show={ showBookmark} bookmark={bookmark} onClose={() => setShowBookmark(false)} onSelectArticle={handleBookmarkClick} onDeleteBookmark={handleBookmarkClick} />
                <div className="my-blogs">My Blogs</div>
                <div className="weather-calendar">
                    <Weather />
                    <Calender />
                </div>
            </div>
            <footer className='news-footer'>Footer</footer>
        </div>
    )
}

export default News
