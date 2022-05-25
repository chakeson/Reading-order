const inquisitorsDataBooks = [
    {
        x: 850,
        y: 430,
        id: 1,
        title: "Xenos",
        author: "Dan Abnett",
        book:"Novel 1",
        faction: [""],
        pages:"320",
        audio:"9h 56m",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/novels/xenos-ebook.html",
        primary: true,
    },
    {
        x: 1470,
        y: 430,
        id: 2,
        title: "Malleus",
        author: "Dan Abnett",
        book:"Novel 2",
        faction: [""],
        pages:"288",
        audio:"10h 13m",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/novels/malleus-ebook.html",
        primary: true,
    },
    {
        x: 2100,
        y: 430,
        id: 3,
        title: "Hereticus",
        author: "Dan Abnett",
        book:"Novel 3",
        faction: [""],
        pages:"320",
        audio:"9h 49m",
        rating: "95%",
        link:"https://www.blacklibrary.com/warhammer-40000/novels/hereticus-ebook.html",
        primary: true,
    },
    {
        x: 4300,
        y: 430,
        id: 4,
        title: "The Magos",
        author: "Dan Abnett",
        book:"Novel 4 & Anthology",
        faction: [""],
        pages:"720",
        audio:"20h 5m",
        rating: "95%",
        link:"https://www.blacklibrary.com/new-titles/warhammer-40000/the-magos-ebook.html",
        primary: true,
    },
    {
        x: 130,
        y: 430,
        id: 5,
        title: "Pestilence",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/pestilence-ebook.html",
        primary: false,
    },
    {
        x: 500,
        y: 650,
        id: 6,
        title: "Master Imus",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/audio/warhammer-40000-audiobooks/master-imuss-transgression-mp3.html",
        primary: false,
    },
    {
        x: 500,
        y: 510,
        id: 7,
        title: "Regia Occulta",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"43m",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/regia-occulta-ebook.html",
        primary: false,
    },
    {
        x: 1170,
        y: 550,
        id: 8,
        title: "Missing in Action",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/missing-in-action.html",
        primary: false,
    },
    {
        x: 1790,
        y: 550,
        id: 9,
        title: "Backcloth for a Crown Additional",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/series/eisenhorn/backcloth-for-a-crown-additional.html",
        primary: false,
    },
    {
        x: 1790,
        y: 320,
        id: 10,
        title: "The Strange Demise of Titus Endor",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/tales-from-the-archive-the-strange-demise-of-titus-endor.html",
        primary: false,
    },
    {
        x: 2500,
        y: 600,
        id: 11,
        title: "The Curiosity",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/series/eisenhorn/the-magos-ebook.html",
        primary: false,
    },    
    {
        x: 2600,
        y: 1000,
        id: 12,
        title: "Playing Patience",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/novels/playing-patience-ebook.html",
        primary: false,
    },
    {
        x: 2900,
        y: 1000,
        id: 13,
        title: "Ravenor",
        author: "Dan Abnett",
        book:"Novel Ravenor 1",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/novels/ravenor-mp3.html",
        primary: true,
    },
    {
        x: 3250,
        y: 870,
        id: 14,
        title: "Thorn Wishes Talon",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/audio/warhammer-40000-audiobooks/thorn-and-talon-mp3.html",
        primary: false,
    },
    {
        x: 3590,
        y: 1000,
        id: 15,
        title: "Ravenor Returned",
        author: "Dan Abnett",
        book:"Novel Ravenor 2",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/audio/warhammer-40000-audiobooks/ravenor-returned-mp3.html",
        primary: true,
    },
    {
        x: 3930,
        y: 1000,
        id: 16,
        title: "Ravenor Rogue",
        author: "Dan Abnett",
        book:"Novel Ravenor 3",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/audio/warhammer-40000-audiobooks/ravenor-rogue-mp3.html",
        primary: true,
    },
    {
        x: 2500,
        y: 320,
        id: 17,
        title: "Gardens of Tycho",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/gardens-of-tycho.html",
        primary: false,
    },
    {
        x: 2900,
        y: 320,
        id: 18,
        title: "The Keeler Image",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/keeler-image.html",
        primary: false,
    },
    {
        x: 2500,
        y: 1300,
        id: 19,
        title: "Perihelion",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/perihelion-ebook.html",
        primary: false,
    },
    {
        x: 2900,
        y: 1300,
        id: 20,
        title: "Pariah",
        author: "Dan Abnett",
        book:"Novel Bequin 1",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/new-titles/audio/pariah-mp3-2021.html",
        primary: true,
    },
    {
        x: 3200,
        y: 1400,
        id: 21,
        title: "Lepidopterophobia",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/new-titles/warhammer-40000/penitent-ebook-2021.html",
        primary: false,
    },
    {
        x: 3500,
        y: 1300,
        id: 22,
        title: "Penitent",
        author: "Dan Abnett",
        book:"Novel Bequin 2",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/new-titles/warhammer-40000/penitent-ebook-2021.html",
        primary: true,
    },
    {
        x: 3800,
        y: 1300,
        id: 23,
        title: "Pandaemonium",
        author: "Dan Abnett",
        book:"Novel Bequin 3 Unreleased",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"",
        primary: true,
    },
    {
        x: 3250,
        y: 600,
        id: 24,
        title: "Born to Us",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/born-to-us-ebook.html",
        primary: false,
    },
    {
        x: 3250,
        y: 600,
        id: 24,
        title: "Born to Us",
        author: "Dan Abnett",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/born-to-us-ebook.html",
        primary: false,
    },
    {
        x: 250,
        y: 1000,
        id: 25,
        title: "Necessary Evil",
        author: "Rob Sanders",
        book:"Novel",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/warhammer-40000/quick-reads/necessary-evil-eshort.html",
        primary: false,
    },
    {
        x: 600,
        y: 1000,
        id: 26,
        title: "Atlas Infernal",
        author: "Rob Sanders",
        book:"Short story",
        faction: [""],
        pages:"",
        audio:"",
        rating: "",
        link:"https://www.blacklibrary.com/all-products/atlas-infernal-ebook.html",
        primary: false,
    },
];
export default inquisitorsDataBooks;


export const inquisitorsDataArrow = [
    {
        id:1,
        type:"primary",
        start:1,
        end:2,
    },
    {   
        id:2,
        type:"primary",
        start:2,
        end:3,
    },
    {
        id:3,
        type:"primary",
        start:3,
        end:4,
    },
    {
        id:4,
        type:"secondary",
        start:6,
        end:1,
    },
    {
        id:5,
        type:"secondary",
        start:7,
        end:1,
    },
    {
        id:6,
        type:"tertiary",
        start:5,
        end:1,
    },
    {
        id:7,
        type:"secondary",
        start:1,
        end:8,
    },
    {
        id:8,
        type:"secondary",
        start:8,
        end:2,
    },
    {
        id:9,
        type:"secondary",
        start:2,
        end:10,
    },
    {
        id:10,
        type:"secondary",
        start:2,
        end:9,
    },
    {
        id:11,
        type:"secondary",
        start:10,
        end:3,
    },
    {
        id:12,
        type:"secondary",
        start:9,
        end:3,
    },
    {
        id:13,
        type:"secondary",
        start:12,
        end:13,
    },
    {
        id:14,
        type:"secondary",
        start:13,
        end:14,
    },
    {
        id:15,
        type:"secondary",
        start:14,
        end:15,
    },
    {
        id:16,
        type:"primary",
        start:13,
        end:15,
    },
    {
        id:17,
        type:"primary",
        start:15,
        end:16,
    },
    {
        id:17,
        type:"secondary",
        start:3,
        end:17,
    },
    {
        id:17,
        type:"secondary",
        start:3,
        end:11,
    },
    {
        id:17,
        type:"secondary",
        start:17,
        end:18,
    },
    {
        id:17,
        type:"secondary",
        start:18,
        end:4,
    },
    {
        id:17,
        type:"secondary",
        start:3,
        end:24,
    },
    {
		id:18,
		type:"primary",
        gridbreak:"31%",
		start:3,
		end:12,
	},
    {
        id:19,
        type:"primary",
        start:19,
        end:20,
    },
    {
        id:20,
        type:"tertiary",
        start:3,
        end:19,
    },
    {
        id:21,
        type:"primary",
        gridbreak:"65%",
        start:16,
        end:4,
    },    
    
    {
        id:22,
        type:"secondary",
        start:20,
        end:21,
    },
    {
        id:23,
        type:"primary",
        start:20,
        end:22,
    },
    {
        id:24,
        type:"primary",
        start:22,
        end:23,
    },
    {
        id:25,
        type:"secondary",
        start:"1shortcut",
        end:13,
    },
    {
        id:26,
        type:"tertiary",
        start:"2shortcut",
        end:13,
    },
    {
        id:27,
        type:"primary",
        start:25,
        end:26,
    },
]

export const inquisitorsDataZone = [
    {
        x:400,
        y:290,
        width:4400,
        height:500,
        xtitle:50,
        ytitle:50,
        id:1,
        title:"Eisenhorn ",
    },
    {
        x:2500,
        y:830,
        width:1730,
        height:350,
        xtitle:20,
        ytitle:30,
        id:2,
        title:"Ravenor ",
    },
    {
        x:2850,
        y:1200,
        width:1300,
        height:350,
        xtitle:40,
        ytitle:20,
        id:2,
        title:"Bequin ",
    },
    {
        x:200,
        y:900,
        width:700,
        height:270,
        xtitle:20,
        ytitle:20,
        id:3,
        title:"Czevak ",
    },
]
export const inquisitorsDataShortcut = [
    {
        x:2750,
        y:910,
        id:1,
        title:"Malleus",
        faction: [""],
    },
    {
        x:2750,
        y:850,
        id:2,
        title:"Hereticus",
        faction: [""],
    },
]