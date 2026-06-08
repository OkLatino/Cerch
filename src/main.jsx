import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './app.css'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Buzon from './pages/Buzon.jsx'
import Resenas from './pages/Resenas.jsx'
import Admin from './pages/Admin.jsx'
import Blog from './pages/Blog.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buzon" element={<Buzon />} />
          <Route path="/resenas" element={<Resenas />} />
          <Route path="/blog" element={<Blog />} />
        </Route>
        {/* Admin sin header/footer público */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
