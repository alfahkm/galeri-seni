import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

import img1 from './assets/1abstrak.png'
import img2 from './assets/2abstrak.png'
import img3 from './assets/3abstrak.png'
import img4 from './assets/4abstrak.png'

function GaleriSeni({ images, setImages }) {
  const [page, setPage] = useState(1)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [descriptions, setDescriptions] = useState({})
  const imagesPerPage = 6
  const totalPages = Math.ceil(images.length / imagesPerPage)

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1)
    }
  }, [page, totalPages])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
    const newDescriptions = {}
    files.forEach((file, index) => {
      newDescriptions[index] = ''
    })
    setDescriptions(newDescriptions)
  }

  const displayedImages = images.slice(
    (page - 1) * imagesPerPage,
    page * imagesPerPage
  )

  const handleDescriptionChange = (index, value) => {
    setDescriptions((prev) => ({
      ...prev,
      [index]: value,
    }))
  }

  const handleSubmitDescriptions = () => {
    const newImages = selectedFiles.map((file, index) => ({
      id: images.length + index + 1,
      src: URL.createObjectURL(file),
      alt: file.name,
      description: descriptions[index] || '',
    }))
    setImages((prev) => {
      const updated = [...prev, ...newImages].slice(0, 100)
      setPage(Math.ceil(updated.length / imagesPerPage))
      return updated
    })
    setSelectedFiles([])
    setDescriptions({})
  }

  return (
    <div className="container">
      <h1 className="title">Galeri Seni</h1>
      <Link to="/" className="back-button"></Link>
      <label htmlFor="file-upload" className="upload-button">
        Dedikasikan Senimu
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      {selectedFiles.length > 0 && (
        <div className="description-form">
          <h3>Tambahkan Keterangan untuk Karya Seni Anda</h3>
          {selectedFiles.map((file, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <p>{file.name}</p>
              <textarea
                placeholder="Keterangan karya seni"
                value={descriptions[index] || ''}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                rows={3}
                style={{ width: '100%' }}
              />
            </div>
          ))}
          <button onClick={handleSubmitDescriptions} className="upload-button">
            Simpan Karya Seni
          </button>
        </div>
      )}
      <div className="grid">
        {displayedImages.map((img) => (
          <div key={img.id} className="box image-box">
            <Link to={`/detail/${img.id}`}>
              <img src={img.src} alt={img.alt} />
            </Link>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: '1rem' }}
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
        <span style={{ marginLeft: '1rem' }}>
          Halaman {page} dari {totalPages}
        </span>
      </div>
    </div>
  )
}

export default GaleriSeni
