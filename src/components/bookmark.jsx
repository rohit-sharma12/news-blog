import React from 'react'
import './bookmark.css'

const Bookmark = ({ show, bookmark, onClose, onSelectArticle, onDeleteBookmark }) => {
    if (!show) {
        return null
    }
    return (
        <div className='model'>
            <div className="model-content">
                <span className="btn" onClick={onClose}>
                    <i class="fa-solid fa-xmark"></i>
                </span>
                <h2 className="heading">Bookmarked News</h2>
                <div className="list">
                    {bookmark.map((article, index) => (
                    <div key={index} onClick={() => onSelectArticle(article)} className="item">
                        <img src={article.image} alt={article.title} />
                        <h3>{article.title}</h3>
                            <span className="delete-btn" onClick={(e) => {
                                e.stopPropagation()
                                onDeleteBookmark(article)
                        }}>
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Bookmark
