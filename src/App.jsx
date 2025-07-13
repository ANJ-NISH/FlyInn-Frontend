// css imports
import './App.css';
import './index.css';

// library imports
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

// component imports
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import store from './redux/store';

//page imports
import { StayHome } from './pages/StayHome';
import { Sign } from './pages/Sign';
import { HotelsPage } from './pages/HotelsPage';
import {HotelDesc} from './pages/HotelDesc';
import { ConfirmPage } from './pages/ConfirmPage';
import {About} from './pages/About';
import ContactPage from './pages/Contact';

import { createContext, useState } from 'react';
import { ListProperty } from './pages/ListProperty';
import { SearchResults } from './pages/SearchResults';
import { ResortsPage } from './pages/ResortsPage';
import { FillDetails } from './pages/FillDetails';
import { VillasPage } from './pages/VillasPage';
import { HostelsPage } from './pages/HostelsPage';

import ScrollTop from './components/ScrollTop';

import ProtectedRoute from './components/ProtectedRoute';


export const signContext=createContext();

function App() {

  let [signstate, setSignstate]=useState(false);

  if(localStorage.getItem("signstate"))
  {
    signstate=JSON.parse(localStorage.getItem("signstate"));
  }

  

  return (<>

  <Provider store={store}>
   <signContext.Provider value={{signstate, setSignstate}}>
    <BrowserRouter>
    <Header />
    <ScrollTop/>
    <Routes>
      <Route path="/" element={<StayHome/>}/>
      <Route path="/signin" element={<Sign/>}/>

      <Route path="/listproperty" element={
        <ProtectedRoute>
          <ListProperty/>
        </ProtectedRoute>
      }/>
      <Route path="/allhotels" element={<HotelsPage/>}/>
      <Route path="/indihotel/:hotelname" element={<HotelDesc/>}/>
      <Route path="/searchresult" element={<SearchResults/>}/>
      <Route path="/allresorts" element={<ResortsPage/>}/>
      <Route path="/confirmpage" element={<ConfirmPage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/filldetails" element={
        <ProtectedRoute>
          <FillDetails/>
        </ProtectedRoute>
        }/>
      <Route path="/allvillas" element={<VillasPage/>}/>
      <Route path="/allhostels" element={<HostelsPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </signContext.Provider>
    </Provider>
    </>
  )
}

export default App;
