import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PosterPage from './PosterPage'
import GaleriSeni from './GaleriSeni'
import DetailKarya from './DetailKarya'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from './firebase'
import './App.css'
import img1 from './assets/1abstrak.png'
import img2 from './assets/2abstrak.png'
import img3 from './assets/3abstrak.png'
import img4 from './assets/4abstrak.png'

function Home() {
  return (
    <div className="container">
      <h1 className="title">GALERI<br />SENI</h1>
      <div className="grid">
        <div className="box image-box">
          <img src={img1} alt="Abstrak 1" />
        </div>
        <div className="box image-box">
          <img src={img3} alt="Abstrak 3" />
        </div>
        <div className="box image-box">
          <img src={img4} alt="Abstrak 4" />
        </div>
        <div className="box image-box">
          <img src={img2} alt="Abstrak 2" />
        </div>
      </div>
      <div className="description-box">
         Dari goresan tangan hingga piksel-piksel yang hidup, setiap karya adalah cerita, setiap warna adalah emosi. Seni digital bukan sekadar medium, tapi dunia tanpa batas di mana imajinasi menjadi nyata.
      </div>
      <div className="decorations">
        <div className="small-flower"></div>
        <div className="small-flower"></div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/galeri" style={{ textDecoration: 'none', color: '#1a237e', fontWeight: '700' }}>
          Lihat Galeri Seni
        </Link>
      </div>
    </div>
  )
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vw"
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: "-100vw"
  }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
}

function AppWrapper() {
  const location = useLocation()
  const [images, setImages] = React.useState([
    { id: 1, src: img1, alt: 'Abstrak 1' },
    { id: 2, src: img2, alt: 'Abstrak 2' },
    { id: 3, src: img3, alt: 'Abstrak 3' },
    { id: 4, src: img4, alt: 'Abstrak 4' },
  ])

  const [user, setUser] = React.useState(null)
  const auth = getAuth(app)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [auth])

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Home />
          </motion.div>
        } />
        <Route path="/poster" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <PosterPage />
          </motion.div>
        } />
        <Route path="/galeri" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <GaleriSeni images={images} setImages={setImages} />
          </motion.div>
        } />
        <Route path="/detail/:id" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DetailKarya images={images} setImages={setImages} />
          </motion.div>
        } />
        <Route path="/admin/login" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AdminLogin />
          </motion.div>
        } />
        <Route path="/admin/dashboard" element={
          user ? (
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AdminDashboard />
            </motion.div>
          ) : (
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AdminLogin />
            </motion.div>
          )
        } />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
