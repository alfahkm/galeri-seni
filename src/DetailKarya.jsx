import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './App.css'

function DetailKarya({ images }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const karya = images.find((img) => img.id === parseInt(id))

  if (!karya) {
    return (
      <div className="container">
        <h2>Karya seni tidak ditemukan</h2>
        <button onClick={() => navigate(-1)} className="back-button"></button>
      </div>
    )
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button"></button>
      <h2>Karya Seni Detail</h2>
      <img src={karya.src} alt={karya.alt} style={{ maxWidth: '100%', height: 'auto' }} />
      <p style={{ marginTop: '1rem', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
        {karya.description || 'Tidak ada keterangan'}
      </p>
    </div>
  )
}

export default DetailKarya
