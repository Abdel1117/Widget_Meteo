import { useState, useEffect } from 'react'
import './App.css'
import ForeCast from './components/ForeCast/ForeCast'
import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home'
function App() {

  return (
    <>
      <Nav />
      <main className="App">
        <Home />
        <section className='Banner_foreCast'>
          <ForeCast day={1} />
          <ForeCast day={2} />
          <ForeCast day={3} />
          <ForeCast day={4} />
          <ForeCast day={5} />
          <ForeCast day={6} />
          <ForeCast day={7} />
        </section>
      </main>
    </>
  )
}
cd  
export default App
