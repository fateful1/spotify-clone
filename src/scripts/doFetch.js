/**
 * Инициирование запросов.
 * 
 * @param {string} URL Ссылка на запрос
 */
export async function doFetch(URL, TOKEN) { 
    try {
        const response = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        })
        return await response.json();
    } catch (err) {
        console.log('Ошибка: ', err);
        return err;
    }
}
