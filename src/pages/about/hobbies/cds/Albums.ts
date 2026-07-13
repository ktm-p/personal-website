export interface Track {
    title: string
    artist: string
    duration: number
    src?: string
}

export interface Album {
    title: string
    artist: string
    cover: string
    tracks: Track[]
}

export const ALBUMS: Album[] = [
    {
    title: "BRAT",
    artist: "Charli xcx",
    cover: "https://assets.ktm-p.net/albums/charli-xcx-brat/cover.jpg",
    tracks: [
            { title: "360", artist: "Charli xcx", duration: 134, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/01-360.mp3" },
            { title: "Club classics", artist: "Charli xcx", duration: 154, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/02-club-classics.mp3" },
            { title: "Sympathy is a knife", artist: "Charli xcx", duration: 151, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/03-sympathy-is-a-knife.mp3" },
            { title: "I might say something stupid", artist: "Charli xcx", duration: 109, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/04-i-might-say-something-stupid.mp3" },
            { title: "Talk talk", artist: "Charli xcx", duration: 162, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/05-talk-talk.mp3" },
            { title: "Von dutch", artist: "Charli xcx", duration: 164, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/06-von-dutch.mp3" },
            { title: "Everything is romantic", artist: "Charli xcx", duration: 203, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/07-everything-is-romantic.mp3" },
            { title: "Rewind", artist: "Charli xcx", duration: 168, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/08-rewind.mp3" },
            { title: "So I", artist: "Charli xcx", duration: 211, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/09-so-i.mp3" },
            { title: "Girl, so confusing", artist: "Charli xcx", duration: 175, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/10-girl-so-confusing.mp3" },
            { title: "Apple", artist: "Charli xcx", duration: 152, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/11-apple.mp3" },
            { title: "B2b", artist: "Charli xcx", duration: 179, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/12-b2b.mp3" },
            { title: "Mean girls", artist: "Charli xcx", duration: 189, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/13-mean-girls.mp3" },
            { title: "I think about it all the time", artist: "Charli xcx", duration: 136, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/14-i-think-about-it-all-the-time.mp3" },
            { title: "365", artist: "Charli xcx", duration: 204, src: "https://assets.ktm-p.net/albums/charli-xcx-brat/15-365.mp3" },
        ],
    },
    {
        title: "KPop Demon Hunters",
        artist: "TWICE",
        cover: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/cover.jpg",
        tracks: [
            { title: "TAKEDOWN (JEONGYEON, JIHYO, CHAEYOUNG)", artist: "TWICE", duration: 181, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/01-takedown-jeongyeon-jihyo-chaeyoung.mp3" },
            { title: "How It’s Done", artist: "HUNTR/X, EJAE, AUDREY NUNA, REI AMI, KPop Demon Hunters Cast", duration: 176, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/02-how-it-s-done.mp3" },
            { title: "Soda Pop", artist: "Saja Boys, Andrew Choi, Neckwav, Danny Chung, Kevin Woo, samUIL Lee, KPop Demon Hunters Cast", duration: 151, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/03-soda-pop.mp3" },
            { title: "Golden", artist: "HUNTR/X, EJAE, AUDREY NUNA, REI AMI, KPop Demon Hunters Cast", duration: 195, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/04-golden.mp3" },
            { title: "Strategy", artist: "TWICE", duration: 169, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/05-strategy.mp3" },
            { title: "Takedown", artist: "HUNTR/X, EJAE, AUDREY NUNA, REI AMI, KPop Demon Hunters Cast", duration: 182, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/06-takedown.mp3" },
            { title: "Your Idol", artist: "Saja Boys, Andrew Choi, Neckwav, Danny Chung, Kevin Woo, samUIL Lee, KPop Demon Hunters Cast", duration: 192, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/07-your-idol.mp3" },
            { title: "Free", artist: "Rumi, Jinu, KPop Demon Hunters Cast, EJAE, Andrew Choi", duration: 188, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/08-free.mp3" },
            { title: "What It Sounds Like", artist: "HUNTR/X, EJAE, AUDREY NUNA, REI AMI, KPop Demon Hunters Cast", duration: 250, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/09-what-it-sounds-like.mp3" },
            { title: "사랑인가 봐 Love, Maybe", artist: "MeloMance", duration: 186, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/10-love-maybe.mp3" },
            { title: "오솔길 Path", artist: "Jokers", duration: 222, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/11-path.mp3" },
            { title: "Score Suite", artist: "Marcelo Zarvos", duration: 180, src: "https://assets.ktm-p.net/albums/twice-kpop-demon-hunters/12-score-suite.mp3" },
        ],
    },
    {
        title: "Trench",
        artist: "twenty one pilots",
        cover: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/cover.jpg",
        tracks: [
            { title: "Jumpsuit", artist: "twenty one pilots", duration: 239, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/01-jumpsuit.mp3" },
            { title: "Levitate", artist: "twenty one pilots", duration: 146, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/02-levitate.mp3" },
            { title: "Morph", artist: "twenty one pilots", duration: 259, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/03-morph.mp3" },
            { title: "My Blood", artist: "twenty one pilots", duration: 229, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/04-my-blood.mp3" },
            { title: "Chlorine", artist: "twenty one pilots", duration: 324, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/05-chlorine.mp3" },
            { title: "Smithereens", artist: "twenty one pilots", duration: 177, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/06-smithereens.mp3" },
            { title: "Neon Gravestones", artist: "twenty one pilots", duration: 240, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/07-neon-gravestones.mp3" },
            { title: "The Hype", artist: "twenty one pilots", duration: 265, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/08-the-hype.mp3" },
            { title: "Nico and the Niners", artist: "twenty one pilots", duration: 225, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/09-nico-and-the-niners.mp3" },
            { title: "Cut My Lip", artist: "twenty one pilots", duration: 283, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/10-cut-my-lip.mp3" },
            { title: "Bandito", artist: "twenty one pilots", duration: 331, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/11-bandito.mp3" },
            { title: "Pet Cheetah", artist: "twenty one pilots", duration: 198, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/12-pet-cheetah.mp3" },
            { title: "Legend", artist: "twenty one pilots", duration: 173, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/13-legend.mp3" },
            { title: "Leave the City", artist: "twenty one pilots", duration: 280, src: "https://assets.ktm-p.net/albums/twenty-one-pilots-trench/14-leave-the-city.mp3" },
        ],
    },
]