/**
 * Создание токена.
 */
function getToken() {
    const clientId = 'e3647861a3ff42d3a5534a5023f209d4';
    const clientSecret = '02bc688a192d4e7a8dcfcadcd88234b8';
    fetch('https://accounts.spotify.com/api/token', {
       method: 'POST',
       headers: {
           'Content-Type' : 'application/x-www-form-urlencoded', 
       }, 
       body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
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
         localStorage.setItem('token', JSON.stringify(json.access_token));
       }
       catch
       {
         return Promise.reject(new Error(`State Error!: Data: , Connection:`));
       }
     })
}
