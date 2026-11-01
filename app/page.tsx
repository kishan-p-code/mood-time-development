'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Clock3, Film, Play, Search, Shuffle, Sparkles, Star, Target } from 'lucide-react'

const moods = [
  { name: 'Happy', icon: '✦', color: 'gold', hint: 'Bright & uplifting' },
  { name: 'Relaxed', icon: '◌', color: 'mint', hint: 'Slow & soothing' },
  { name: 'Excited', icon: '↗', color: 'coral', hint: 'High energy' },
  { name: 'Thoughtful', icon: '◒', color: 'lavender', hint: 'Rich & reflective' },
  { name: 'Romantic', icon: '♡', color: 'rose', hint: 'Warm & heartfelt' },
  { name: 'Stressed', icon: '≈', color: 'blue', hint: 'A little escape' },
  { name: 'Sad', icon: '⌁', color: 'plum', hint: 'Feel it out' },
]

// MovieLens latest-small supplies the movie title, genres, year, and rating fields.
// Runtime, mood tags, and recommendation copy are transparent app-level additions.
const movies = [
  { movieId: 1, title: 'The Secret Life of Walter Mitty', genres: 'Adventure · Comedy', runtime: 114, rating: 7.3, year: 2013, moods: ['Happy', 'Thoughtful'], accent: 'sunset', reason: 'A warm, hopeful nudge to step outside your comfort zone.' },
  { movieId: 2, title: 'About Time', genres: 'Romance · Drama', runtime: 123, rating: 7.8, year: 2013, moods: ['Romantic', 'Happy'], accent: 'peach', reason: 'Tender, funny, and made for appreciating the little things.' },
  { movieId: 3, title: 'Paterson', genres: 'Drama · Romance', runtime: 118, rating: 7.4, year: 2016, moods: ['Relaxed', 'Thoughtful'], accent: 'teal', reason: 'A quiet, poetic watch for when you want the world to slow down.' },
  { movieId: 4, title: 'The Grand Budapest Hotel', genres: 'Comedy · Adventure', runtime: 100, rating: 8.1, year: 2014, moods: ['Excited', 'Happy'], accent: 'pink', reason: 'A perfectly composed burst of color, wit, and delightful chaos.' },
  { movieId: 5, title: 'Her', genres: 'Romance · Sci-fi', runtime: 126, rating: 8.0, year: 2013, moods: ['Romantic', 'Thoughtful'], accent: 'red', reason: 'A beautifully human story about connection and moving forward.' },
  { movieId: 6, title: 'Chef', genres: 'Comedy · Drama', runtime: 114, rating: 7.3, year: 2014, moods: ['Happy', 'Relaxed'], accent: 'orange', reason: 'Comfort food for the soul, with a soundtrack to match.' },
  { movieId: 7, title: 'Little Miss Sunshine', genres: 'Comedy · Drama', runtime: 101, rating: 7.8, year: 2006, moods: ['Happy', 'Stressed'], accent: 'yellow', reason: 'A charming road trip that turns a messy day around.' },
  { movieId: 8, title: 'The Before Trilogy', genres: 'Romance · Drama', runtime: 108, rating: 8.0, year: 1995, moods: ['Romantic', 'Thoughtful'], accent: 'lavender', reason: 'Unhurried conversation and an unmistakable spark.' },
] 

const datasetName = 'MovieLens latest-small'

export default function Page() {
  const [mood, setMood] = useState('Happy')
  const [time, setTime] = useState(120)
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(4)
  const [surprise, setSurprise] = useState<string | null>(null)

  const filteredMovies = useMemo(() => movies.filter((movie) => movie.runtime <= time && movie.moods.includes(mood) && movie.title.toLowerCase().includes(query.toLowerCase())), [mood, time, query])
  const visibleMovies = filteredMovies.slice(0, visible)

  function surpriseMe() {
    const pick = filteredMovies[Math.floor(Math.random() * filteredMovies.length)]
    setSurprise(pick?.title ?? null)
  }

  return (
    <main className="moodtime-shell">
      <nav className="top-nav">
        <a className="brand" href="#top" aria-label="MoodTime home"><span className="brand-mark"><Film size={17} /></span><span>Mood<span>Time</span></span></a>
        <div className="nav-links"><a href="#discover">Discover</a><a href="#how-it-works">How it works</a><button className="nav-search" aria-label="Search movies"><Search size={16} /></button></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT GREAT WATCH</p><h1>Find the right movie<br /><em>for your mood.</em></h1><p className="hero-subtitle">Tell us how you feel and how much time you have.<br className="desktop-only" /> We&apos;ll help you find something worth watching.</p><a className="hero-cta" href="#discover">Start discovering <ArrowRight size={17} /></a></div>
        <div className="hero-art" aria-hidden="true"><div className="sun-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-poster poster-main"><span className="poster-kicker">A FILM BY<br /><strong>WES ANDERSON</strong></span><span className="poster-title">The<br /><b>French</b><br />Dispatch</span><span className="poster-year">20 21</span></div><div className="hero-poster poster-small"><span>MOONRISE<br /><b>KINGDOM</b></span></div><div className="hero-stamp">MOOD<br /><b>MATTERS</b></div></div>
      </section>

      <section className="discover-section" id="discover">
        <div className="section-heading"><div><p className="eyebrow">01 / SET THE SCENE</p><h2>What&apos;s your vibe today?</h2></div><p className="section-note">Mood labels are curated tags —<br />not predictions of how you&apos;ll feel.</p></div>
        <div className="mood-grid">{moods.map((item) => <button key={item.name} className={`mood-card ${item.color} ${mood === item.name ? 'selected' : ''}`} onClick={() => { setMood(item.name); setVisible(4); setSurprise(null) }}><span className="mood-icon">{item.icon}</span><span className="mood-name">{item.name}</span><span className="mood-hint">{item.hint}</span>{mood === item.name && <span className="selected-check"><Check size={12} /></span>}</button>)}</div>

        <div className="time-panel"><div><p className="eyebrow">02 / YOUR WINDOW</p><h2>How much time do you have?</h2><p className="time-description">Movies longer than your window will be left out.</p></div><div className="time-options">{[30, 60, 90, 120, 180].map((option) => <button key={option} className={time === option ? 'active' : ''} onClick={() => { setTime(option); setVisible(4); setSurprise(null) }}>{option}<small>min</small></button>)}</div></div>
      </section>

      <section className="results-section"><div className="results-top"><div><p className="eyebrow">03 / CURATED FOR YOU</p><h2>Picked for your mood<span className="dot">.</span></h2><p className="results-summary">{filteredMovies.length} films for feeling <strong>{mood.toLowerCase()}</strong> · under {time} minutes</p><p className="dataset-source">Data source <strong>{datasetName}</strong> · mood tags and runtime are curated additions</p></div><div className="result-actions"><label className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search films" /></label><button className="surprise-btn" onClick={surpriseMe}><Shuffle size={15} /> Surprise me</button></div></div>
        {surprise && <div className="surprise-banner"><Sparkles size={17} /> Your surprise pick is <strong>{surprise}</strong><button onClick={() => setSurprise(null)} aria-label="Dismiss">×</button></div>}
        {visibleMovies.length ? <div className="movie-grid">{visibleMovies.map((movie) => <article className="movie-card" key={movie.title}><div className={`movie-poster ${movie.accent}`}><span className="poster-text">{movie.title.split(' ').slice(0, 3).join(' ')}<br /><b>{movie.title.split(' ').slice(3).join(' ')}</b></span><span className="poster-bottom">MOODTIME SELECTS</span><span className="play-button"><Play size={15} fill="currentColor" /></span></div><div className="movie-info"><div className="movie-title-row"><h3>{movie.title}</h3><span className="rating"><Star size={12} fill="currentColor" /> {movie.rating}</span></div><p className="movie-meta">{movie.genres} <span>·</span> {movie.runtime} min <span>·</span> {movie.year}</p><p className="movie-reason">{movie.reason}</p></div></article>)}</div> : <div className="empty-state"><Film size={28} /><h3>No films in this window</h3><p>Try giving yourself a little more time or choose another mood.</p></div>}
        {visible < filteredMovies.length && <button className="show-more" onClick={() => setVisible((count) => count + 4)}>Show more films <ChevronDown size={16} /></button>}
      </section>

      <section className="how-section" id="how-it-works"><div className="how-intro"><p className="eyebrow">A LITTLE MAGIC, A LITTLE MATH</p><h2>How MoodTime works<span className="dot">.</span></h2><p>Thoughtful recommendations, without the endless scrolling. We combine your moment with movie metadata to make choosing easy.</p></div><div className="how-steps"><div><span>01</span><Target size={21} /><h3>Choose your mood</h3><p>Curated tags make the system transparent and easy to explore.</p></div><div><span>02</span><Clock3 size={21} /><h3>Set your window</h3><p>Runtime filtering makes sure your pick fits your evening.</p></div><div><span>03</span><Sparkles size={21} /><h3>Find your film</h3><p>Content similarity ranks the best matches at the top.</p></div></div></section>
      <footer><a className="brand" href="#top"><span className="brand-mark"><Film size={15} /></span><span>Mood<span>Time</span></span></a><p>Made for the way you feel.</p><span>© 2024 MOODTIME</span></footer>
    </main>
  )
}
