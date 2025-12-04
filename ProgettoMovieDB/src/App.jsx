import './App.css'
import TMDBFetcher from './components/TMDBFetcher/TMDBFetcher.jsx'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'

function App() {

  return (
    <>
      <Header />
      <TMDBFetcher />
      <Footer />
    </>
  )
}

export default App
