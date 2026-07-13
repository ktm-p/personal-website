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
        title: "KPop Demon Hunters (Soundtrack from the Netflix Film)",
        artist: "KPop Demon Hunters Cast",
        cover: "https://cdn-images.dzcdn.net/images/cover/e54bda0628749119f7a9a05b71b40283/1000x1000-000000-80-0-0.jpg",
        tracks: [
            { title: "TAKEDOWN (JEONGYEON, JIHYO, CHAEYOUNG)", artist: "TWICE", duration: 180, src: "https://cdnt-preview.dzcdn.net/api/1/1/6/4/f/0/64fa55325849ffd73a50cb1723eb2641.mp3?hdnea=exp=1783958547~acl=/api/1/1/6/4/f/0/64fa55325849ffd73a50cb1723eb2641.mp3*~data=user_id=0,application_id=42~hmac=a585760dbdb603f74ed56f35ae12be993e73eaddecb40f954e41c5f6090cd061" },
            { title: "How It’s Done", artist: "HUNTR/X", duration: 176, src: "https://cdnt-preview.dzcdn.net/api/1/1/7/3/5/0/735284bd0bce17bd5a972d24ca4b2303.mp3?hdnea=exp=1783958547~acl=/api/1/1/7/3/5/0/735284bd0bce17bd5a972d24ca4b2303.mp3*~data=user_id=0,application_id=42~hmac=2fa2b815bb9b1d7b9d02275f31abedc45f14cbd3ee575754464811c30a82e388" },
            { title: "Soda Pop", artist: "Saja Boys", duration: 150, src: "https://cdnt-preview.dzcdn.net/api/1/1/f/5/8/0/f589f90d66f196a10adfb6c67f5400eb.mp3?hdnea=exp=1783958547~acl=/api/1/1/f/5/8/0/f589f90d66f196a10adfb6c67f5400eb.mp3*~data=user_id=0,application_id=42~hmac=a15482c0a07a7ecd6d611a6758fc32b71b4a5659861bb2bbc2266f99974e59f2" },
            { title: "Golden", artist: "HUNTR/X", duration: 192, src: "https://cdnt-preview.dzcdn.net/api/1/1/4/2/4/0/4248b99b2d0450e4cb0e4c811e422d1b.mp3?hdnea=exp=1783958547~acl=/api/1/1/4/2/4/0/4248b99b2d0450e4cb0e4c811e422d1b.mp3*~data=user_id=0,application_id=42~hmac=81badd22dacbd8094fe0b9785a6ad318719927240b9a939de76aaa4b8087878d" },
            { title: "Strategy", artist: "TWICE", duration: 166, src: "https://cdnt-preview.dzcdn.net/api/1/1/1/b/5/0/1b573abdc24ef0d3aadfc486f9563bee.mp3?hdnea=exp=1783958547~acl=/api/1/1/1/b/5/0/1b573abdc24ef0d3aadfc486f9563bee.mp3*~data=user_id=0,application_id=42~hmac=0a46b0065245da446df464d6903507af3f2e446356207ae790fb68eecdd3e95f" },
            { title: "Takedown", artist: "HUNTR/X", duration: 182, src: "https://cdnt-preview.dzcdn.net/api/1/1/d/9/7/0/d972e7cbb1347d1e34a57d4fcaf99c8b.mp3?hdnea=exp=1783958547~acl=/api/1/1/d/9/7/0/d972e7cbb1347d1e34a57d4fcaf99c8b.mp3*~data=user_id=0,application_id=42~hmac=5390f3fd357cc9f4e861b0b9657a843150bcdfac7f182fd38b5fc2143cb8e37d" },
            { title: "Your Idol", artist: "Saja Boys", duration: 191, src: "https://cdnt-preview.dzcdn.net/api/1/1/e/d/2/0/ed234040dbc27743451ee476b23df85b.mp3?hdnea=exp=1783958547~acl=/api/1/1/e/d/2/0/ed234040dbc27743451ee476b23df85b.mp3*~data=user_id=0,application_id=42~hmac=7e3cf5bed99dd175dacb3739f2749a87e411cc2e7e08b197516521a49475d606" },
            { title: "Free", artist: "Rumi", duration: 187, src: "https://cdnt-preview.dzcdn.net/api/1/1/c/c/9/0/cc9f7a2df799005a405dd9b49fc759ef.mp3?hdnea=exp=1783958547~acl=/api/1/1/c/c/9/0/cc9f7a2df799005a405dd9b49fc759ef.mp3*~data=user_id=0,application_id=42~hmac=de34844eda4e43f56298a3dcc21fe4248f0a6d7309c8a749f6a639a67f19b737" },
            { title: "What It Sounds Like", artist: "HUNTR/X", duration: 250, src: "https://cdnt-preview.dzcdn.net/api/1/1/6/9/6/0/696ad5ce7cdd962cbbc5480cdead1c73.mp3?hdnea=exp=1783958547~acl=/api/1/1/6/9/6/0/696ad5ce7cdd962cbbc5480cdead1c73.mp3*~data=user_id=0,application_id=42~hmac=0452d0739e18f5b9262be32f90275bdbb86906aa7829c475829ae13fd06a94b1" },
            { title: "사랑인가 봐 Love, Maybe", artist: "MeloMance", duration: 185, src: "https://cdnt-preview.dzcdn.net/api/1/1/d/c/0/0/dc054201c585b816f94a1d8c72ec473e.mp3?hdnea=exp=1783958547~acl=/api/1/1/d/c/0/0/dc054201c585b816f94a1d8c72ec473e.mp3*~data=user_id=0,application_id=42~hmac=ffa62ac790c581f201191cf82a2859c53c4bb5b14b304399fcc12fe8ebf39523" },
            { title: "오솔길 Path", artist: "Jokers", duration: 223, src: "https://cdnt-preview.dzcdn.net/api/1/1/2/3/7/0/237da26c7a5d2e2d44f71c3ecf6bdecd.mp3?hdnea=exp=1783958547~acl=/api/1/1/2/3/7/0/237da26c7a5d2e2d44f71c3ecf6bdecd.mp3*~data=user_id=0,application_id=42~hmac=814249b64823a263a75691b40fed149033369cba040b7b70b0ea366e4083c2a6" },
            { title: "Score Suite", artist: "Marcelo Zarvos", duration: 180, src: "https://cdnt-preview.dzcdn.net/api/1/1/8/6/2/0/862b54e551e0b57c7cdbb4549db0453b.mp3?hdnea=exp=1783958547~acl=/api/1/1/8/6/2/0/862b54e551e0b57c7cdbb4549db0453b.mp3*~data=user_id=0,application_id=42~hmac=1d04aa1cd95c1c01f90f6b8090cefbd733ffb7c34cb8e368c2cba8d87476d129" },
        ],
    },
    {
        title: "BRAT",
        artist: "Charli xcx",
        cover: "https://cdn-images.dzcdn.net/images/cover/de9e79511cda59914de9add50946e43c/1000x1000-000000-80-0-0.jpg",
        tracks: [
            { title: "360", artist: "Charli xcx", duration: 133, src: "https://cdnt-preview.dzcdn.net/api/1/1/6/d/f/0/6df461a2309db820e650158cee4f0b70.mp3?hdnea=exp=1783964020~acl=/api/1/1/6/d/f/0/6df461a2309db820e650158cee4f0b70.mp3*~data=user_id=0,application_id=42~hmac=da6026cef3197eb5525cf2eb48f5b77cde5d2e0edd4319a5810273693b9269d7" },
            { title: "Club classics", artist: "Charli xcx", duration: 153, src: "https://cdnt-preview.dzcdn.net/api/1/1/8/b/2/0/8b23a527a2d492b9bf99b548a8cd1f6e.mp3?hdnea=exp=1783933482~acl=/api/1/1/8/b/2/0/8b23a527a2d492b9bf99b548a8cd1f6e.mp3*~data=user_id=0,application_id=42~hmac=bfef7ec1a110182f7ffd66da37eb89ef94523b5ae55fc04edf42e4d02fc08431" },
            { title: "Sympathy is a knife", artist: "Charli xcx", duration: 151, src: "https://cdnt-preview.dzcdn.net/api/1/1/5/d/9/0/5d9ac003a4b42c62b46cf9af1d100b14.mp3?hdnea=exp=1783933482~acl=/api/1/1/5/d/9/0/5d9ac003a4b42c62b46cf9af1d100b14.mp3*~data=user_id=0,application_id=42~hmac=64ab95f232d615f8c47268a4110015752e073025468ecfab25abb057c0dad01d" },
            { title: "I might say something stupid", artist: "Charli xcx", duration: 109, src: "https://cdnt-preview.dzcdn.net/api/1/1/4/f/3/0/4f310bb564d3ad2d308b5737edf1693d.mp3?hdnea=exp=1783933482~acl=/api/1/1/4/f/3/0/4f310bb564d3ad2d308b5737edf1693d.mp3*~data=user_id=0,application_id=42~hmac=4f67917694be9e02e65281c6aec79c8d3912d7e59a0b4fd8fc4dac65f634d4f0" },
            { title: "Talk talk", artist: "Charli xcx", duration: 161, src: "https://cdnt-preview.dzcdn.net/api/1/1/9/4/d/0/94db203f6e5fb7c11d59f956992a6297.mp3?hdnea=exp=1783933482~acl=/api/1/1/9/4/d/0/94db203f6e5fb7c11d59f956992a6297.mp3*~data=user_id=0,application_id=42~hmac=7ef45aa7b69078ee8a5f139db3c7edb7977e16d05381854d3a2b72a8f41f48e2" },
            { title: "Von dutch", artist: "Charli xcx", duration: 164, src: "https://cdnt-preview.dzcdn.net/api/1/1/5/7/a/0/57adc1a4c05fa745f9939adcc9c892b2.mp3?hdnea=exp=1783933482~acl=/api/1/1/5/7/a/0/57adc1a4c05fa745f9939adcc9c892b2.mp3*~data=user_id=0,application_id=42~hmac=69e6886f9b1132c67a0cc45fca5c41d9c1aa825eaef701905045c1e1c6414413" },
            { title: "Everything is romantic", artist: "Charli xcx", duration: 203, src: "https://cdnt-preview.dzcdn.net/api/1/1/5/a/2/0/5a28bbb2b30ae70d63217ee4bccbe103.mp3?hdnea=exp=1783933482~acl=/api/1/1/5/a/2/0/5a28bbb2b30ae70d63217ee4bccbe103.mp3*~data=user_id=0,application_id=42~hmac=595c1ff5d3b4342c93fac44bda49fe73180d5ec1c16a9368d8ed6640c7183372" },
            { title: "Rewind", artist: "Charli xcx", duration: 168, src: "https://cdnt-preview.dzcdn.net/api/1/1/a/2/4/0/a24ba26f5e79f4a57b037140db8b656e.mp3?hdnea=exp=1783933482~acl=/api/1/1/a/2/4/0/a24ba26f5e79f4a57b037140db8b656e.mp3*~data=user_id=0,application_id=42~hmac=9d261cd191c03294b131739cbf64dbe9e6dc38d395e02057cac1dd82b31a5862" },
            { title: "So I", artist: "Charli xcx", duration: 211, src: "https://cdnt-preview.dzcdn.net/api/1/1/4/8/1/0/4814c44aaea2483f636dd299f882cb86.mp3?hdnea=exp=1783933482~acl=/api/1/1/4/8/1/0/4814c44aaea2483f636dd299f882cb86.mp3*~data=user_id=0,application_id=42~hmac=37cc46132a3975fffb37e50989f720eed92af0f2a9ffa996c88581e450ea4be9" },
            { title: "Girl, so confusing", artist: "Charli xcx", duration: 174, src: "https://cdnt-preview.dzcdn.net/api/1/1/c/a/5/0/ca52e8d9eb71f8a0ad027bbf9650ae52.mp3?hdnea=exp=1783933482~acl=/api/1/1/c/a/5/0/ca52e8d9eb71f8a0ad027bbf9650ae52.mp3*~data=user_id=0,application_id=42~hmac=55196d8d4d5cd6133d1e1ddb07dbf176cf75c36242001c8ca0da0c14e76ec7af" },
            { title: "Apple", artist: "Charli xcx", duration: 151, src: "https://cdnt-preview.dzcdn.net/api/1/1/d/8/6/0/d863ea5f62d2c02d615fc0553835802a.mp3?hdnea=exp=1783933482~acl=/api/1/1/d/8/6/0/d863ea5f62d2c02d615fc0553835802a.mp3*~data=user_id=0,application_id=42~hmac=6f8d55fca28fc118e18854e475ec3cc65987ccfe798cd05886e1694274c630c9" },
            { title: "B2b", artist: "Charli xcx", duration: 178, src: "https://cdnt-preview.dzcdn.net/api/1/1/f/2/0/0/f20d10b6971a1d13ca2b637bd08fc04a.mp3?hdnea=exp=1783933482~acl=/api/1/1/f/2/0/0/f20d10b6971a1d13ca2b637bd08fc04a.mp3*~data=user_id=0,application_id=42~hmac=5fea6de74b3b9df0f686952c41229232cdfdaf3fe68451cab951c0ef75a10550" },
            { title: "Mean girls", artist: "Charli xcx", duration: 189, src: "https://cdnt-preview.dzcdn.net/api/1/1/6/d/5/0/6d5bc979c6e5c72c4fb047804440934d.mp3?hdnea=exp=1783933482~acl=/api/1/1/6/d/5/0/6d5bc979c6e5c72c4fb047804440934d.mp3*~data=user_id=0,application_id=42~hmac=b6dcd5c6de0358124f6b0f59e006b9aa8039b1d46d149c7eaacb8ba84b7c5268" },
            { title: "I think about it all the time", artist: "Charli xcx", duration: 135, src: "https://cdnt-preview.dzcdn.net/api/1/1/c/b/c/0/cbcdd900dfbfe3c1d1d9b4f73662a49a.mp3?hdnea=exp=1783933482~acl=/api/1/1/c/b/c/0/cbcdd900dfbfe3c1d1d9b4f73662a49a.mp3*~data=user_id=0,application_id=42~hmac=a1c5ea1300b8c1d4584085ac152f179117769949ecab15862dc876d65c4ce542" },
            { title: "365", artist: "Charli xcx", duration: 203, src: "https://cdnt-preview.dzcdn.net/api/1/1/2/a/2/0/2a2937c5c088cd18c7e7cb062ea0494c.mp3?hdnea=exp=1783933482~acl=/api/1/1/2/a/2/0/2a2937c5c088cd18c7e7cb062ea0494c.mp3*~data=user_id=0,application_id=42~hmac=f61cf2340e472d5e51c7a7a40e62acaaa6581020c131e14e5ca1ea7e41ac2d00" },
        ],
    },
]