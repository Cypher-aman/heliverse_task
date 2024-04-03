import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team/:id" element={<Team />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
