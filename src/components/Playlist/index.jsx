import React from 'react'
import { Link } from 'react-router-dom'
import styles from './playlist.module.css'

export default function Playlist({
    image,
    name,
    description,
    playlistId
}) {
    return (
        <Link to={`/playlist/${playlistId}`} style={{ textDecoration: 'none' }}>
            <div className={styles.playlists__playlist}>
                    <img className={styles.playlist__pic} alt='Обложка плейлиста' src={image.url}/>
                    <div className={styles.playlist__description}>
                    <div className={styles.description__title}>{name}</div>
                    <div className={styles.description__text}>{description}</div>
                </div>
            </div>
        </Link>
    )
}