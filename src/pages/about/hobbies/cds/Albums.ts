export interface Track {
    title: string
    src?: string
}

export interface Album {
    title: string
    artist: string
    cover: string
    tracks: Track[]
}

// CD Collection. WIP.
// To-Do: Automatically create this list of albums using some independent script or something...
export const ALBUMS: Album[] = [
    // {
    //     title: 'I Watch The Moon',
    //     artist: 'Cafuné',
    //     cover: '../../../../../eva.jpg',
    //     tracks: [
    //         { title: 'Tek It', src: "../../../../../Cafuné - Tek It (I Watch The Moon) [Official Video] [7RWbq-lbBlk].mp3" },
    //     ],
    // },
    {
        title: 'Album',
        artist: 'Artist',
        cover: '',
        tracks: [
            {title: 'Song', src: ''}
        ]
    },
]