import React from 'react'
import styles from './track.module.css'

export default function Track({
    num,
    track,
    added_at
}) {

    let artists = '';
    track.artists.map((artist, index) => {
        if(index + 1 !== track.artists.length) {
            artists += `${artist.name}, `;
        } else artists += artist.name;
        return '';
    })

    let duration_s = track.duration_ms / 1000;
    let duration_mins = parseInt(duration_s / 60);
    duration_s -= duration_mins * 60;
    if (String(Math.floor(duration_s)).length === 1) {duration_s = `0${Math.floor(duration_s)}`}
    else duration_s = Math.floor(duration_s);
    let duration = `${duration_mins}:${duration_s}`;

    added_at = added_at.slice(0,10);
    let yyyy = added_at.slice(0,4);
    let mm = added_at.slice(5,7);
    let dd = added_at.slice(8,10);

    return (
        <div className={styles.track}>
            <div className={styles.track__number}>{num}</div>
            <img className={styles.track__image} src={track.album.images[0].url} alt='Фото альбома'></img>
            <div className={styles.track__names}>
                <div className={styles.track__name}> {track.name}</div>
                <div className={styles.track__artist}>{artists}</div>
            </div>
            <div className={styles.track__album}>{track.album.name}</div>
            <div className={styles.track__duration}>{duration}</div>
            <div className={styles.track__date}>{`${dd}.${mm}.${yyyy}`}</div>
        </div>
    )
}