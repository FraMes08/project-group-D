import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Favorites from '../pages/Favorites/Favorites';
import MovieDetails from '../pages/MovieDetails/MovieDetails';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
				<Route path="/trending" element={<Home />} />
				<Route path="/upcoming" element={<Home />} />
				<Route path="/top" element={<Home />} />
				<Route path="/random" element={<Home />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default AppRouter;

