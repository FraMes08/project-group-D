import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Favorites from '../pages/Favorites/Favorites';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import Upcoming from '../pages/Upcoming/Upcoming';
import Random from '../components/Random/Random';
import Popular from '../pages/Popular/Popular';
import TopRated from '../pages/TopRated/TopRated';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
				<Route path="/search" element={<Search />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
				<Route path="/upcoming" element={<Upcoming />} />
				<Route path="/top" element={<TopRated />} />
				<Route path="/random" element={<Random />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default AppRouter;

