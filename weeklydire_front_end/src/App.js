
import './App.css';
import {Routes, Route} from 'react-router-dom';
import NavbarHeader from './Components/NavbarHeader';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Read from './Pages/Read';
import Listen from './Pages/Listen';
import Watch from './Pages/Watch';
import FullArticle from './Pages/FullArticle';
import Write from './Pages/Write';
import Admin from './Pages/Admin';
import EditUser from './Pages/EditUser';
import EditSelf from './Pages/EditSelf';
import TaggedArticlesResults from './Pages/TaggedArticlesResults';
import FailedLogin from './Pages/FailedLogin';
import { UserContext } from './utils/UserContext';
import { useState } from 'react';
import useCheckUser from './utils/useCheckUser';

function App() {
    const [user, setUser] = useState({});
    useCheckUser(user, setUser);

    return (
    <div>
        <UserContext.Provider value={[user, setUser]}>
            <NavbarHeader />
            <div className='full-screen'>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/read' element={<Read />} />
                    <Route path='/read/:articleId' element={<FullArticle />} />
                    <Route path='read/tags/:tag' element={<TaggedArticlesResults />} />
                    <Route path='/listen' element={<Listen />} />
                    <Route path='/watch' element={<Watch />} />
                    <Route path='/write' element={<Write />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/users/:userId/update' element={<EditSelf />} />
                    <Route path='/admin/users/:userId' element={<EditUser />} />
                    <Route path='/failedlogin' element={<FailedLogin />} />

                </Routes>
            </div>
            <Footer />
        </UserContext.Provider>
    </div>
  );
}

export default App;
