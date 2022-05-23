/**
 * Инициирование запросов.
 * 
 * @param {string} URL Ссылка на запрос
 */
async function doFetch(URL) { 
    let result;
    try {
        const response = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type': 'application/json',
            }
        })
        result = await response.json();
        localStorage.setItem('info', JSON.stringify(result));
    } catch (err) {
        console.log('Ошибка: ', err);
        return err;
    }
}
