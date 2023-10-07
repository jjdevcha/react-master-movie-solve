import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Popular from "./Routes/Popular";
import ComingSoon from "./Routes/ComingSoon";
import NowPlaying from "./Routes/NowPlaying";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Popular />}>
          <Route path="movie/:id" element={<Popular />} />
        </Route>
        <Route path="/coming-soon" element={<ComingSoon />}>
          <Route path="movie/:id" element={<ComingSoon />} />
        </Route>
        <Route path="/now-playing" element={<NowPlaying />}>
          <Route path="movie/:id" element={<NowPlaying />} />
        </Route>
      </Routes>
    </Router>
  );
}
