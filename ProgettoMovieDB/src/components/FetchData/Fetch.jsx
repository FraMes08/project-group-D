// import { useState } from 'react'
import { useEffect } from 'react'

function Fetch() {
//   const [count, setCount] = useState(0)
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`)
      const data = await response.json()
      console.log("data:", data)
    }

    fetchPosts()
  })

  return (
    <>
    </>
  )
}

export default Fetch