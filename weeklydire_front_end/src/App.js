
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Read from './Pages/Read';
import Listen from './Pages/Listen';
import Watch from './Pages/Watch';
import FullArticle from './Pages/FullArticle';
import TaggedArticles from './Pages/TaggedArticles';
import Write from './Pages/Write';

function App() {
  
    return (
    <div className="App">
        <Header />
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/read' element={<Read />} />
            <Route path='/read/:articleId' element={<FullArticle />} />
            <Route path='read/tags/:selectedTag' element={<TaggedArticles />} />
            <Route path='/listen' element={<Listen />} />
            <Route path='/watch' element={<Watch />} />
            <Route path='/write' element={<Write />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
