
import './App.css';
import {Routes, Route} from 'react-router-dom';
import NavbarHeader from './Components/NavbarHeader';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Read from './Pages/Read';
import FullArticle from './Pages/FullArticle';
import Write from './Pages/Write';
import Admin from './Pages/Admin';
import EditUser from './Pages/EditUser';
import EditSelf from './Pages/EditSelf';
import TaggedArticlesResults from './Pages/TaggedArticlesResults';
import FailedLogin from './Pages/FailedLogin';
import NotFound from './Pages/NotFound';
import { UserContext } from './utils/UserContext';
import { useState, useEffect } from 'react';
import useCheckUser from './utils/useCheckUser';
import Welcome from './Components/infoModals/Welcome';
import MongoDBInfo from './Components/infoModals/MongoDBInfo';
import ExpressServer from './Components/infoModals/ExpressServer';
import ReactInfo from './Components/infoModals/ReactInfo';
import GoogleCloudInfo from './Components/infoModals/GoogleCloudInfo';


function App() {
    
    // Retrieve and set currently logged in user
    const [user, setUser] = useState({});
    useCheckUser(user, setUser);
    
    // Set up overarching modals for showing app details
    const [guideOpen, setGuideOpen] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(true);
    const [mongoDBInfoModal, setMongoDBInfoModal] = useState(false);
    const [expressServerModal, setExpressServerModal] = useState(false);
    const [reactInfoModal, setReactInfoModal] = useState(false);
    const [googleCloudInfoModal, setGoogleCloudInfoModal] = useState(false);

    // Resets guide
    const resetGuide = () => {
        setGuideOpen(true);
        setWelcomeModal(true);
        sessionStorage.setItem('hasVisitedBefore', true);
    }

    useEffect(() => {
        const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
        if (!hasVisitedBefore) {
          setGuideOpen(true);
          setWelcomeModal(true);
          sessionStorage.setItem('hasVisitedBefore', true);
        }
      }, []);

    return (
    <div>
        <UserContext.Provider value={[user, setUser]}>
            <NavbarHeader resetGuide={resetGuide}/>
            <div className='full-screen'>
                <Routes>
                    <Route path='/' element={<Homepage resetGuide={resetGuide}/>} />
                    <Route path='/read' element={<Read />} />
                    <Route path='/read/:articleId' element={<FullArticle />} />
                    <Route path='read/tags/:tag' element={<TaggedArticlesResults />} />
                    <Route path='/write' element={<Write />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/users/update/:userId' element={<EditSelf />} />
                    <Route path='/admin/users/:userId' element={<EditUser />} />
                    <Route path='/failedlogin' element={<FailedLogin />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            <Footer />

            {/* Modals. Each model takes in these props: it's on/off status, the function to turn the guide off, and the function to toggle the NEXT modal */}
            <Welcome 
                modalStatus={guideOpen && welcomeModal} 
                modalToggle={() => {setWelcomeModal(!welcomeModal)}} 
                toggleNextModal={setMongoDBInfoModal} />
            <MongoDBInfo 
                modalStatus={guideOpen && mongoDBInfoModal} 
                modalToggle={() => {setMongoDBInfoModal(!mongoDBInfoModal)}} 
                toggleNextModal={setExpressServerModal} />
            <ExpressServer 
                modalStatus={guideOpen && expressServerModal} 
                modalToggle={() => {setExpressServerModal(!expressServerModal)}} 
                toggleNextModal={setGoogleCloudInfoModal} />
            <GoogleCloudInfo 
                modalStatus={guideOpen && googleCloudInfoModal} 
                modalToggle={() => {setGoogleCloudInfoModal(!googleCloudInfoModal)}} 
                toggleNextModal={setReactInfoModal} />
            <ReactInfo 
                modalStatus={guideOpen && reactInfoModal} 
                modalToggle={() => {setReactInfoModal(!reactInfoModal)}} 
                toggleNextModal={() => null} />

        </UserContext.Provider>
    </div>
  );
}

export default App;
