// src/pages/Articles.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../data/articles-interactive.json';
import { FaBook } from "react-icons/fa";

export default function Articles() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2">
          <FaBook /> Artikel Musik
        </h2>
        <p className="text-base-content">Berbagai artikel edukatif seputar teori musik, teknik gitar, dan tips belajar mandiri.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map(article => (
          <Link key={article.id} to={`/articles/${article.id}`} className="card bg-base-100 shadow hover:shadow-lg transition">
            <div className="card-body">
              <h2 className="card-title text-lg">{article.title}</h2>
              <p className="text-sm text-base-content line-clamp-3">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
