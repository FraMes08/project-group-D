import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="buttons">
        <h1 className="header-title">The Movie</h1>
        <button className="popular-button">Popular</button>
        <button className="top-rating-button">Top-rating</button>
        <button className="trending-button">Trending</button>
        <button className="upcoming-button">Upcoming</button>
        <button className="random-button">Random</button>
      </div>
      <div className="dpbutton">
        <button className="profile-button">Profile</button>
        <button className="darkmode-button">🌙</button>
      </div>

      <div className="search-row">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button className="search-row-button">Search</button>
      </div>
    </header>
  );
}
