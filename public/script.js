const PLAYLISTS_URL = 'https://api.spotify.com/v1/users/xojtgo4dup8xwal4vczxic7iz/playlists';
const RECOMMENDED_URL = 'https://api.spotify.com/v1/browse/featured-playlists';
const PROFILE_URL = 'https://api.spotify.com/v1/users/xojtgo4dup8xwal4vczxic7iz';
const pics = document.getElementsByClassName('playlist__pic');
const titles = document.getElementsByClassName('description__title');
const descs = document.getElementsByClassName('description__text');
let count = 0;

/**
 * Заменяет элементы на сайте, согласно полученному ответу.
 * 
 * @param {object} item Полученные с запроса данные.
 */
const set_items = (item) => {
    pics[count].src = item.images[0].url;
    titles[count].textContent = item.name;
    descs[count].textContent = item.description;
    count += 1;
}

/**
 * Возвращает список плейлистов конкретного пользователя (меня).
 * 
 * @param {string} URL Ссылка на запрос.
 */
 const get_playlists = async (URL) => {
    await doFetch(URL);
    const result = JSON.parse(localStorage.getItem('info'));
    (result.items).map((item) => {
        set_items(item);
    })
}

/**
 * Возвращает информацию о пользователе (ник и фотографию профиля).
 * 
 * @param {string} URL Ссылка на запрос.
 */
const get_user_info = async (URL) => {
    await doFetch(URL)
    const result = JSON.parse(localStorage.getItem('info'));
    let account_pic = document.getElementsByClassName('account__pic')[0];
    let account_name = document.getElementsByClassName('account__name')[0];
    account_pic.src = result.images[0].url;
    account_name.textContent = result.display_name;
}

/**
 * Возвращает список плейлистов, созданных Spotify.
 * 
 * @param {string} URL Ссылка на запрос.
 */
const get_recommended_playlists = async (URL) => {
    await doFetch(URL);
    const result = JSON.parse(localStorage.getItem('info'));
    (result.playlists.items).map((item) => {
        set_items(item);
    })
}


get_playlists(PLAYLISTS_URL);
get_user_info(PROFILE_URL);
get_recommended_playlists(RECOMMENDED_URL);

if(JSON.parse(localStorage.getItem('info')).error) {    //если в локальном хранилище появилась ошибка, то токен обновляется
    getToken();
    setTimeout(()=> {
        document.location.reload()
    }, 1000);
} 
