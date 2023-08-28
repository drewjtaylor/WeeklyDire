
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';


function App() {
  return (
    <div className="App">
        <Header />
            <Routes>
                <Route path='/' element={<Homepage />} />
            </Routes>
        <Footer />
    </div>
  );
}

export default App;
