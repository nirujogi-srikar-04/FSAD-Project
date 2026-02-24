import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { educationalArticles } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function EducationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ [key: string]: 'up' | 'down' | null }>({});

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % educationalArticles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + educationalArticles.length) % educationalArticles.length);
  };

  const handleFeedback = (articleId: string, type: 'up' | 'down') => {
    setFeedback(prev => ({
      ...prev,
      [articleId]: prev[articleId] === type ? null : type
    }));
  };

  const currentArticle = educationalArticles[currentIndex];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Education & insights</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Articles and analysis to help you understand mutual fund strategies and decisions.
        </p>
      </div>

      <div className="relative">
          <div
            key={currentIndex}
            className="overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] dark:border-white/10 dark:bg-white/5"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden md:h-auto">
                <ImageWithFallback
                  src={`https://source.unsplash.com/800x600/?${encodeURIComponent(currentArticle.imageUrl)}`}
                  alt={currentArticle.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[var(--color-accent)]">
                  {currentArticle.category}
                </Badge>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm text-white/60">
                  <Clock className="h-4 w-4" />
                  {currentArticle.readTime}
                </div>

                <h3 className="mb-4 text-2xl font-bold">{currentArticle.title}</h3>
                
                <p className="mb-6 text-white/80">{currentArticle.content}</p>

                <div className="space-y-4 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 p-4 dark:border-[var(--color-accent)]/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
                    <span className="font-semibold text-[var(--color-accent)]">
                      AI-generated insight
                    </span>
                    <Badge variant="outline" className="ml-auto border-[var(--color-accent)]/50 text-[var(--color-text-secondary)]">
                      Transparent
                    </Badge>
                  </div>

                  <p className="text-sm text-white/90">{currentArticle.aiInsight}</p>

                  {/* Confidence Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Confidence Score</span>
                      <span>{(currentArticle.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={currentArticle.confidenceScore * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Feedback Section */}
                  <div className="flex items-center gap-2 border-t border-white/10 pt-3">
                    <span className="text-xs text-white/60">Was this insight helpful?</span>
                    <div className="ml-auto flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleFeedback(currentArticle.id, 'up')}
                        className={`rounded-full p-2 transition-colors ${
                          feedback[currentArticle.id] === 'up'
                            ? 'bg-[var(--color-success)] text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(currentArticle.id, 'down')}
                        className={`rounded-full p-2 transition-colors ${
                          feedback[currentArticle.id] === 'down'
                            ? 'bg-[var(--color-danger)] text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous article"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next article"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {educationalArticles.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-[var(--color-accent)]' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to article ${index + 1}`}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {educationalArticles.slice(0, 3).map((article) => (
          <button
            key={article.id}
            type="button"
            onClick={() => setCurrentIndex(educationalArticles.indexOf(article))}
            className="cursor-pointer overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-left transition-colors hover:border-[var(--color-accent)]/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-[var(--color-accent)]/50"
          >
            <div className="relative h-32 overflow-hidden">
              <ImageWithFallback
                src={`https://source.unsplash.com/400x300/?${encodeURIComponent(article.imageUrl)}`}
                alt={article.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <Badge className="absolute top-2 right-2 bg-[var(--color-accent)]">
                <Sparkles className="mr-1 h-3 w-3" />
                AI
              </Badge>
            </div>
            <div className="p-4">
              <h4 className="mb-2 line-clamp-2 font-semibold text-[var(--color-text-primary)]">{article.title}</h4>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] dark:text-white/60">
                <Clock className="h-3 w-3" />
                {article.readTime}
                <span className="ml-auto">{(article.confidenceScore * 100).toFixed(0)}% confidence</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
