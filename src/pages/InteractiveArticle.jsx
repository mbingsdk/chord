// src/pages/InteractiveArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/articles-interactive.json';

export default function InteractiveArticle() {
  const { id } = useParams();
  const article = data.find(a => a.id === id);

  const localKey = `quiz-${id}`;
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(localKey));
    if (saved) {
      setScore(saved.score);
      setAnswered(saved.answered);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify({ score, answered }));
  }, [score, answered, id]);

  if (!article) return <div className="p-6">Artikel tidak ditemukan.</div>;

  const totalQuestions = article.content.filter(b => b.type === 'quiz').length;
  const progress = totalQuestions > 0 ? (Object.keys(answered).length / totalQuestions) * 100 : 0;

  const handleAnswer = (idx, selected, correct) => {
    if (answered[idx]) return;
    setAnswered(prev => ({ ...prev, [idx]: true }));
    if (selected === correct) setScore(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2">
          {article.title}
        </h2>
      </div>

      <div className="w-full bg-base-200 rounded-full h-2 mb-4">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-base-content">Skor: {score} / {totalQuestions}</p>

      {article.content.map((block, idx) => (
        <div key={idx} className="space-y-4">
          {block.type === 'paragraph' && <p className="text-base-content text-lg">{block.text}</p>}

          {block.type === 'image' && (
            <img src={block.src} alt={block.alt} className="rounded-lg shadow max-w-full" />
          )}

          {block.type === 'quiz' && (
            <div className="bg-base-200 p-4 rounded-lg">
              <p className="font-medium mb-2">{block.question}</p>
              <div className="space-y-1">
                {block.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={answered[idx]}
                    onClick={() => handleAnswer(idx, opt, block.answer)}
                    className={`btn btn-sm w-full text-left ${
                      answered[idx]
                        ? opt === block.answer
                          ? 'btn-success'
                          : 'btn-disabled'
                        : 'btn-outline'
                    }`}
                  >
                    {opt}
                    {answered[idx] && opt === block.answer && ' ✅'}
                    {answered[idx] && opt !== block.answer && ' ❌'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}