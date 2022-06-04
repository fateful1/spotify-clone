import React, { useContext, useEffect, useState } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { TokenContext } from './context/tokenContext';
import { useToken } from './hooks/token.hook';
import MainPage from './pages/MainPage';
import PlaylistPage from './pages/PlaylistPage';
import { doFetch } from './scripts/doFetch';

function App() {
  let { token, setToken } = useToken();
  const PLAYLISTS_URL = 'https://api.spotify.com/v1/users/xojtgo4dup8xwal4vczxic7iz/playlists';
  const RECOMMENDED_URL = 'https://api.spotify.com/v1/browse/featured-playlists?limit=10';
  const PROFILE_URL = 'https://api.spotify.com/v1/users/xojtgo4dup8xwal4vczxic7iz';
  const [playlists, setPlaylists] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [profile, setProfile] = useState({});
  //еще не могу понять почему token пустой, а если брать из контекста, то там есть токен :(
  const TOKEN = useContext(TokenContext).token;
  useEffect(()=> {
    if (TOKEN === null) setToken();
      async function get() {
          setPlaylists(await doFetch(PLAYLISTS_URL, TOKEN));
          setRecommend(await doFetch(RECOMMENDED_URL, TOKEN));
          setProfile(await doFetch(PROFILE_URL, TOKEN));
          setTimeout(() => { 
            //есть подозрение, что эта проверка на ошибку не работает правильно и токен не обновится
            if(playlists.error || recommend.error || profile.error) setToken(); 
          }, 1500)
      }
      get()
  },[TOKEN])

  return (
    <TokenContext.Provider value={{token, setToken}}>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<MainPage playlists={playlists} profile={profile} recommend={recommend} />} />
              <Route path='/playlist/:playlistId' element={<PlaylistPage profile={profile} />} />
          </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
