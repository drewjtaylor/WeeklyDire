
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Read from './Pages/Read';
import Listen from './Pages/Listen';
import Watch from './Pages/Watch';
import FullArticle from './Pages/FullArticle';
import Write from './Pages/Write';
import TaggedArticlesResults from './Pages/TaggedArticlesResults';
import { UserContext } from './utils/UserContext';
import { useCookies } from "react-cookie";
import { useState, useEffect } from 'react';
import { dbUrl } from './utils/dbUrl';

function App() {
    const [user, setUser] = useState({});
    const [cookies] = useCookies();

    useEffect(() => {
        const checkUser = async () => {
            // Default options are marked with *
            const response = await fetch(dbUrl + '/users/current', {
              method: "GET",
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.jwt}`
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: null, // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
        const fetchUser = async () => {
            const initialUser = await checkUser();
            setUser(initialUser);
        };
        fetchUser();
    }, [])

    return (
    <div className="App">
        <UserContext.Provider value={[user, setUser]}>
            <Header />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/read' element={<Read />} />
                <Route path='/read/:articleId' element={<FullArticle />} />
                <Route path='read/tags/:tag' element={<TaggedArticlesResults />} />
                <Route path='/listen' element={<Listen />} />
                <Route path='/watch' element={<Watch />} />
                <Route path='/write' element={<Write />} />
            </Routes>
            <Footer />
        </UserContext.Provider>
    </div>
  );
}

export default App;
