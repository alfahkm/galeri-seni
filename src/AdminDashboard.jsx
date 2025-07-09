import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import app from './firebase'
import './App.css'

const auth = getAuth(app)
const db = getFirestore(app)

function AdminDashboard() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null)
  const [editDescription, setEditDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchArtworks()
  }, [])

  const fetchArtworks = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, 'artworks'))
    const arts = []
    querySnapshot.forEach((doc) => {
      arts.push({ id: doc.id, ...doc.data() })
    })
    setArtworks(arts)
    setLoading(false)
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/admin/login')
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'artworks', id))
    fetchArtworks()
  }

  const startEdit = (id, description) => {
    setEditId(id)
    setEditDescription(description)
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditDescription('')
  }

  const saveEdit = async (id) => {
    const docRef = doc(db, 'artworks', id)
    await updateDoc(docRef, { description: editDescription })
    setEditId(null)
    setEditDescription('')
    fetchArtworks()
  }

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="upload-button" style={{ marginBottom: '1rem' }}>Logout</button>
      {artworks.length === 0 ? (
        <p>Tidak ada karya seni.</p>
      ) : (
        <div className="all-art-grid">
          {artworks.map((art) => (
            <div key={art.id} className="all-art-box">
              <img src={art.src} alt={art.alt} style={{ maxWidth: '100%', height: 'auto' }} />
              {editId === art.id ? (
                <>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  />
                  <button onClick={() => saveEdit(art.id)} className="upload-button" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>Simpan</button>
                  <button onClick={cancelEdit} className="upload-button" style={{ marginTop: '0.5rem' }}>Batal</button>
                </>
              ) : (
                <>
                  <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{art.description || 'Tidak ada keterangan'}</p>
                  <button onClick={() => startEdit(art.id, art.description)} className="upload-button" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(art.id)} className="upload-button" style={{ marginTop: '0.5rem' }}>Hapus</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
