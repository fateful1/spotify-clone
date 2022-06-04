import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Track from '../../components/Track';
import { TokenContext } from '../../context/tokenContext';
import { doFetch } from '../../scripts/doFetch';
import styles from './playlistPage.module.css'

export default function PlaylistPage({
    profile
}) {
    const { playlistId } = useParams();
    const PLAYLIST_URL = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const [info, setInfo] = useState([]);
    const token = useContext(TokenContext).token;
    const setToken = useContext(TokenContext).setToken; 

    useEffect(()=> {
        //в этой функции чтобы получить инфу о плейлисте мне пришлось использовать токен из локального хранилища, а не токен из контекста...
        //токен с контекста или не приходит по какой-то причине или не успевает(?) передать свое значение в функцию :(
        //как это исправить я не знаю 
        const getInfo = async () => {
            setInfo(await doFetch(PLAYLIST_URL, JSON.parse(localStorage.getItem('token')))); 
        }
        getInfo();
        //еще есть подозрение, что эта проверка на ошибку не работает правильно и токен не обновится
        if(info.error) setToken();
    }, [])
    
    let profileFlag = false;
    if (Object.keys(profile).length !== 0 && !profile.error) {
        profileFlag = true;
    }

    let infoFlag = false;
    if (Object.keys(info).length !== 0 && !info.error) {
        infoFlag = true;
    }
    console.log(info);
    console.log(infoFlag);
    
    return (
        <div className={styles.root__container}>
            <div className={styles.root__topbar}>
                <div className={styles.topbar__arrows}>
                    <Link to='/'>
                        <button className={styles.arrowActive}>
                            <svg height="24" width="24" viewBox="0 0 24 24" fill="rgb(255,255,255)">
                                <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
                            </svg>
                        </button>
                    </Link>
                    <button className={styles.arrow}>
                        <svg height="24" width="24" viewBox="0 0 24 24" fill="rgb(255,255,255,0.8)">
                            <path d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"></path>
                        </svg>
                    </button>
                </div>
                <div className={styles.topbar__login}>
                    <button className={styles.topbar__login__change}>СМЕНИТЬ ТАРИФ</button>
                    <button className={styles.topbar__login__account}>
                        <img className={styles.account__pic} src={profileFlag ? profile.images[0].url : ''} alt='Фото профиля'/>
                        <div className={styles.account__wrapper}>
                            <span className={styles.account__name}>{profile.display_name}</span>
                            <svg height="16" width="16" viewBox="0 0 16 16" fill="#fff">
                                <path d="M14 6l-6 6-6-6h12z"></path>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <aside className={styles.root__sidemenu}>
                <div className={styles.root__logo}>
                    <a className={styles.logo} href="/">
                        <svg viewBox="0 0 1134 340">
                            <title>Spotify</title>
                            <path fill="currentColor" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"></path>
                        </svg>
                    </a>
                </div>
                <ul className={styles.root__sidemenu__list}>
                    <li><a href='/' className={styles.button}>
                        <svg height="24" width="24" viewBox="0 0 24 24">
                            <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path>
                        </svg>
                        <span>Главная</span>
                    </a></li>
                    <li><a href='/' className={styles.button}>
                        <svg height="24" width="24" viewBox="0 0 24 24">
                            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                        </svg>
                        <span>Поиск</span>
                    </a></li>
                    <li><a href='/' className={styles.button}>
                        <svg height="24" width="24" viewBox="0 0 24 24">
                            <path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path>
                        </svg>
                        <span>Моя медиатека</span>
                    </a></li>
                </ul>
                <div className={styles.root__sidemenu__buttons}>
                    <div className={styles.sidemenu__buttons}>
                        <a href="/" className={styles.button}>
                            <svg height="12" width="12" viewBox="0 0 16 16">
                                <path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path>
                            </svg>
                            <span>Создать плейлист</span>
                        </a>
                    </div>
                    <div className={styles.sidemenu__buttons}>
                        <a href="/" className={styles.button}>
                            <svg height="12" width="12" viewBox="0 0 16 16">
                                <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                            </svg>
                            <span>Любимые треки</span>
                        </a>
                    </div>
                </div>
                <div className={styles.root__sidemenu__info}>
                    <a href="/" className={styles.info}>Файлы cookie</a>
                    <a href="/" className={styles.info}>Конфиденциальность</a>
                    <a href="/" className={styles.info}>Форма для Ваших обращений</a>
                </div>
            </aside>
            <div className={styles.root__mainmenu}>
                <div className={styles.mainmenu__playlist}>
                    <img className={styles.playlist__cover} src={infoFlag ? info.images[0].url : ''} alt='Обложка плейлиста' />
                    <div>
                        <div className={styles.playlist__info}> <span>ПЛЕЙЛИСТ</span>
                            <div className={styles.playlist__title}> {infoFlag ? info.name : ''} </div>
                            <div className={styles.playlist__description}> {infoFlag ? info.description : ''} </div>
                            <div className={styles.playlist__owner}>{infoFlag ? info.owner.display_name : ''} · {infoFlag ? info.tracks.total : ''} треков</div>
                        </div>
                    </div>
                </div>
                <div className={styles.playlist__tracks}>
                    <div className={styles.tracks__title}>
                        <div className={styles.title} style={{justifyContent:'center', paddingRight: '10px'}}>#</div>
                        <div className={styles.title}>Название</div>
                        <div></div>
                        <div className={styles.title}>Альбом</div>
                        <div className={styles.title}>Продолжительность</div>
                        <div className={styles.title}>Дата добавления</div>
                    </div>
                    {infoFlag ? info.tracks.items.map((track, index) => {
                        return <Track 
                            key={index}
                            added_at={info.tracks.items[index].added_at}
                            num={index + 1}
                            track={info.tracks.items[index].track}/>;
                    }) 
                    : ''}
                </div>
            </div>
        </div>
    )
}