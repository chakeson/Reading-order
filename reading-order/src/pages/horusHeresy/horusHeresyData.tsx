const horusHeresyDataBooks = [
    {
        x:100,
        y:500,
        id: 1,
        title: "Horus Rising",
        author: "Dan Abnett",
        book:"1",
        faction:["Sons of horus"],
        pages:"320 (hardcover) 416 (softcover)",
        audio:"12 hours 16 minutes",
        rating:"95%",
        link: "https://www.blacklibrary.com/the-horus-heresy/novels/horus-rising.html",
    },
    {
        x:250,
        y:500,
        id: 2,
        title: "False Gods",
        author: "Graham McNeill",
        book:"2",
        faction:["Sons of horus"],
        pages:"416",
        audio:"11 hours 20 minutes ",
        rating:"75%",
        link: "https://www.blacklibrary.com/the-horus-heresy/novels/False-Gods-eBook.html",
    },
    {
        x:500,
        y:500,
        id: 3,
        title: "Galaxy in Flames",
        author: "Dan Abnett",
        book:"3",
        faction:["Sons of horus"],
        pages:"416",
        audio:"8 hours 51 minutes ",
        rating:"75%",
        link: "https://www.blacklibrary.com/the-horus-heresy/novels/galaxy-in-flames-ebook.html",
    },
];
export default horusHeresyDataBooks;



export const horusHeresyDataArrow = [
    {
        color:"red",
        type:"primary",
        dimension:[{x:100,y:100,length:100,height:20}]
    },
    {
        color:"blue",
        type:"secondary",
        dimension:[{x:200,y:100,length:100,height:20}]
    },
    {
        color:"green",
        type:"tertiary",
        dimension:[{x:300,y:100,length:100,height:20}]
    },
];