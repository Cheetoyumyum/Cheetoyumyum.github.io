import React, { useState, useEffect } from "react";
import LiveBets from "./LiveBets";

const Home = () => {
  const [betsFilter, setBetsFilter] = useState("All Bets");
  const [carouselImages, setCarouselImages] = useState([]);
  const [gameTiles, setGameTiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const carouselData = await Promise.all(
        Array.from({ length: 5 }).map(() =>
          fetch("https://picsum.photos/600/300?random")
            .then((response) => response.url)
        )
      );
      setCarouselImages(carouselData);
    };

    fetchRandomImages();
  }, []);

  useEffect(() => {
    const fetchGameTileImages = async () => {
      const gameTileData = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          fetch("https://picsum.photos/145/192?random") 
            .then((response) => response.url)
        )
      );
      setGameTiles(gameTileData);
    };

    fetchGameTileImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className="home-view">
      <div className="carousel-container">
        <div className="carousel">
          {carouselImages.length > 0 && (
            <div className="carousel-item">
              <img
                src={carouselImages[currentIndex]}
                alt={`Promo ${currentIndex + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
        <div className="carousel-navigation">
          <button className="prev-button" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="next-button" onClick={handleNext}>
            &#10095;
          </button>
        </div>
        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <br/>

        <h2 className="games-title">Games</h2>
      <div className="game-tiles-container">
        <div className="game-tiles">
          {gameTiles.map((tileImage, index) => (
            <div className="game-tile" key={index}>
              <img src={tileImage} alt={`Game ${index + 1}`} />
              <span>Game {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="live-bets-container">
        <h2 className="games-title">Live Bets</h2>
        <LiveBets filter={betsFilter} setFilter={setBetsFilter} />
      </div>
    </div>
  );
};

export default Home;
