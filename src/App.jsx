import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Countdown from "./components/Countdown.jsx";
import Favorites from "./components/Favorites.jsx";
import SpotifyPlaylist from "./components/SpotifyPlaylist.jsx";
import Gallery from "./components/Gallery.jsx";
import Videos from "./components/Videos.jsx";
import Timeline from "./components/Timeline.jsx";
import MessageWall from "./components/MessageWall.jsx";
import Footer from "./components/Footer.jsx";

import SurpriseButton from "./components/SurpriseButton.jsx";
import MusicToggle from "./components/MusicToggle.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Countdown />
      <Favorites />
      <SpotifyPlaylist />
      <Gallery />
      <Videos />
      <Timeline />
      <MessageWall />
      <Footer />

      <SurpriseButton />
      <MusicToggle />
    </>
  );
}
