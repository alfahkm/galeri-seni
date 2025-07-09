import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function PosterPage() {
  return (
    <div className="poster-page-container">
      <Link to="/" className="back-button">Kembali</Link>
    </div>
  )
}

export default PosterPage
