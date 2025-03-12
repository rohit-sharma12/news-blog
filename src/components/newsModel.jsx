import React from 'react'
import './newsModel.css'
import './bookmark.css'

const NewsModel = ({ show, article, onClose }) => {
    if (!show) {
        return null
    }
    return (
        <div className="model">
            <div className="model-content">
                <span className='btn' onClick={onClose}>
                    <i class="fa-solid fa-xmark"></i>
                </span>
                {article && (
                    <>
                        <img className='image' src={article.image} alt="" />

                        <h2 className='title'>{article.title}</h2>
                        <p className='source'>Source:{article.source.name}</p>
                        <p className='date'>{new Date(article.publishedAt).toLocaleString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                        <p className='text'>{ article.content}</p>
                        <a href={article.url} target='_blank' rel='noopener noreferrer' className="read-more">Read more</a>
                    </>
                )}



            </div>
        </div>
    )
}

export default NewsModel