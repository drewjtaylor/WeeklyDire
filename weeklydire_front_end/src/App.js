
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Read from './Pages/Read';
import Listen from './Pages/Listen';
import Watch from './Pages/Watch';
import FullArticle from './Pages/FullArticle';
import { articles } from './sampledb';

function App() {
    const test_id = 1;
  
    return (
    <div className="App">
        <Header />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/read' element={<Read />} />
                <Route path='/listen' element={<Listen />} />
                <Route path='/watch' element={<Watch />} />
                <Route path={`/articles/${test_id}`} element={<FullArticle article={articles.find(article => article.id=test_id)}/>} />
            </Routes>
        <Footer />
    </div>
  );
}

export default App;
