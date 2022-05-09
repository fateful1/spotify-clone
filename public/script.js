const PLAYLISTS_URL = 'https://api.spotify.com/v1/users/xojtgo4dup8xwal4vczxic7iz/playlists';
const RECOMMENDED_URL = 'https://api.spotify.com/v1/browse/featured-playlists';
const PROFILE_URL = 'https://api.spotify.com/v1/users/xojtgo4dup8xwal4vczxic7iz';
const clientId = 'e3647861a3ff42d3a5534a5023f209d4';
const clientSecret = '473f19bdad214944a38a5b7191cc2e41';
/**
 * Возвращает список плейлистов конкретного пользователя (меня).
 * 
 * @param {string} TOKEN Токен, необходимый для запросов.
 * @param {string} URL Ссылка на запрос.
 */
const get_playlists = async (TOKEN, URL) => {
    let result;
    try {
        const response = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        }); 
        result = await response.json();
    } catch (err) {
        console.log('Ошибка: ', err)
    }
    let count = 0;
    let pics = document.getElementsByClassName('playlist__pic');
    let titles = document.getElementsByClassName('description__title');
    let desc = document.getElementsByClassName('description__text');
    (result.items).map((item) => {
        pics[count].src = item.images[1].url
        titles[count].innerHTML = item.name;
        desc[count].innerHTML = item.description;
        count += 1;
    })
}

/**
 * Возвращает информацию о пользователе (ник и фотографию профиля).
 * 
 * @param {string} TOKEN Токен, необходимый для запросов.
 * @param {string} URL Ссылка на запрос.
 */

const get_user_info = async (TOKEN, URL) => {
    let result;
    try {
        const response = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        }); 
        result = await response.json();
    } catch (err) {
        console.log('Ошибка: ', err)
    }
    let account_pic = document.getElementsByClassName('account__pic')[0];
    let account_name = document.getElementsByClassName('account__name')[0];
    account_pic.src = result.images[0].url
    account_name.innerHTML = result.display_name;
}

/**
 * Возвращает список плейлистов, созданных Spotify.
 * 
 * @param {string} TOKEN Токен, необходимый для запросов.
 * @param {string} URL Ссылка на запрос.
 */

const get_recommended_playlists = async (TOKEN, URL) => {
    let result;
    try {
        const response = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        }); 
        result = await response.json();
    } catch (err) {
        console.log('Ошибка: ', err)
    }
    let count = 8;
    let pics = document.getElementsByClassName('playlist__pic');
    let titles = document.getElementsByClassName('description__title');
    let desc = document.getElementsByClassName('description__text');
    (result.playlists.items).map((item) => {
        pics[count].src = item.images[0].url
        titles[count].innerHTML = item.name;
        desc[count].innerHTML = item.description;
        count += 1;
    })
}

/**
 * Создание токена и инициирование запросов.
 * 
 * @param {string} id ID клиента 
 * @param {string} secret Секрет клиента
 */
const init = (id, secret) => {
     fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
        }, 
        body: 'grant_type=client_credentials&client_id=' + id + '&client_secret=' + secret,
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error('Spotify Token Request Error'));
        } else {
            return response.json();
        }
    })
    .catch((err) => {
        console.log('First Fetch ' + err);
    })
    .then((json) => {
        try {
          console.log("Current token: " + json.access_token);
          get_playlists(json.access_token, PLAYLISTS_URL);
          get_user_info(json.access_token, PROFILE_URL);
          get_recommended_playlists(json.access_token, RECOMMENDED_URL)
        }
        catch
        {
          return Promise.reject(new Error(`State Error!: Data: , Connection:`));
        }
      })
}


init(clientId, clientSecret);
