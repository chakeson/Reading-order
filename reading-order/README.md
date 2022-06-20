# TODO

- Consider adding contact form to about page.

- Write front page readme with image.

- Clean up react console warnings.

- Get terms and conditions document and add to login page.

### Longer term todo

- Welcome new users.

- Maybe first time tutorial for map sections.

- Handle login and out between tabs.

- Add a search bar to the home page.

- Consider breaking up all fetches into separate files.

- Test updating to React 18.

- Add lazy loading of book data to reduce bundle size.

- Improve text color changer for books. Consider it for progress bars aswell. Use color-contrast CSS property when adoption is high enough. Check in August 2022.

- Fix error resizing flickering/arrow line up.

- Explicitly type where any is used.

- Properly type all :any
    - Type useGlobalContext hook

# Start and set up

Start by running `yarn install` to install needed dependencies. Look at [.env.example](.env.example) for the template for your .env file in the same directory. After that launch it with `yarn start`.

# Important libraries
React

React router dom v6

react-zoomable-ui [Github Link.](https://github.com/aarondail/react-zoomable-ui) Make movable map with.

~~React-zoom-pan-pinch~~

react-xarrows [Github Link.](https://github.com/Eliav2/react-xarrows) The arrow library.

~~react-archer [Github Link.](https://github.com/pierpo/react-archer)~~ Lacks good interface to work with components.

TailwindCSS 3

# Technical articles
Relevant for books.tsx https://www.freecodecamp.org/news/event-propagation-event-bubbling-event-catching-beginners-guide/

# Structure
Website intro point index.tsx.
Router and website structure in App.tsx. (React router)
Global context in context.tsx. (React context)

# Design
Palettes: https://coolors.co/palette/ff5400-ff6d00-ff8500-ff9100-ff9e00-00b4d8-0096c7-0077b6-023e8a-03045e

# Tailwind set up

Extended tailwinds normal breakpoints by adding 3xl which breaks at 2000px to deal with 4k monitors.
For colors tailwinds red and grey color spectrum are defined. Blue and orange scales taken from palette site.
For more information check out the [tailwind config file](tailwind.config.js).

## How to add books
Start by adding them to corresponding data file, for example [horusHeresyData](src/pages/horusHeresy/horusHeresyData.tsx). Id spans for certain data collections have gaps in them, fill them first. 
Check that it doesn't already exist or excede the storage array length for it in the [global context](src/context.tsx) if so update front and backend and consider how to update all users data.
Then update the frontpages book count in the [home page progress visualiser](src/pages/home/readingProgressVisualiser.tsx).


# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



# Excluded Books:

{
	x: 1,
	y: 1,
	id: 230,
	title: "Crusade's End",
	author: "Dan Abnett",
	book:"Omnibus Editions",
	faction: [""],
	pages:"1024",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 231,
	title: "The Razing of Prospero",
	author: "Dan Abnett",
	book:"Omnibus Editions",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 232,
	title: "The Last Phoenix",
	author: "John French",
	book:"Omnibus Editions",
	faction: [""],
	pages:"1024",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 233,
	title: "The Dark King and The Lightning Tower",
	author: "Graham McNeill",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"1 hour 16m",
	rating: "%",
	link:"https://www.blacklibrary.com/audio/the-horus-heresy-audio-dramas/Dark-King-and-The-Lightning-Tower-Audiobook-The-mp3.html"
},
{
	x: 1,
	y: 1,
	id: 132,
	title: "Virtue of the Sons/Sins of the Father",
	author: "Andy Smillie",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"50m",
	rating: "%",
	link:"http://www.blacklibrary.com/all-products/virtues-sons-sins-father-mp3.html"
},


# Added:
{
	x: 1,
	y: 1,
	id: 285,
	title: "Allegiance",
	author: "Chris Wraight",
	book: "Short Story",
	faction: ["White Scars"],
	pages:"",
	audio:"1h 5m",
	rating: "%",
	link:"https://www.blacklibrary.com/the-horus-heresy/quick-reads/hh-allegiance-thousand-sons-and-white-scars-ebook.html"
},


CUT

{
	x: 1,
	y: 1,
	id: 123,
	title: "Angron",
	author: "Aaron Dembski-Bowden",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/the-horus-heresy/quick-reads/angron-ebook.html"
},
{
	x: 1,
	y: 1,
	id: 124,
	title: "The Imperial Truth",
	author: "",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/the-horus-heresy/quick-reads/the-imperial-truth-ebook-collection.html"
},
{
	x: 1,
	y: 1,
	id: 125,
	title: "Sedition's Gate",
	author: "Nick Kyme",
	book:"Collections Anthology",
	faction: [""],
	pages:"142",
	audio:"",
	rating: "%",
	link:"http://www.blacklibrary.com/new-at-bl/Horus_Heresy_Weekender_and_New_Night_Lords_Art.html"
},
{
	x: 1,
	y: 1,
	id: 126,
	title: "Echoes of Ruin",
	author: "David Annandale",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"75m",
	rating: "%",
	link:"https://www.blacklibrary.com/all-products/echoes-of-ruin.html"
},
{
	x: 1,
	y: 1,
	id: 127,
	title: "Death and Defiance",
	author: "Aaron Dembski-Bowden",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/the-horus-heresy/quick-reads/death-and-defiance-ebook-collection.html"
},
{
	x: 1,
	y: 1,
	id: 128,
	title: "Blades of the Traitor",
	author: "John French",
	book:"Collections Anthology",
	faction: [""],
	pages:"118",
	audio:"",
	rating: "%",
	link:""
},

{
	x: 1,
	y: 1,
	id: 130,
	title: "Betrayal at Calth",
	author: "David Annandale",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 131,
	title: "Echoes of the Imperium",
	author: "",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"74m",
	rating: "%",
	link:"http://www.blacklibrary.com/all-products/echoes-of-imperium-mp3.html"
},
{
	x: 1,
	y: 1,
	id: 133,
	title: "Echoes of Revelation",
	author: "Dan Abnett",
	book:"Collections Anthology",
	faction: [""],
	pages:"",
	audio:"75m",
	rating: "%",
	link:"https://www.blacklibrary.com/audio/the-horus-heresy-audio-dramas/hh-echoes-of-revelation-mp3.html"
},
{
	x: 1,
	y: 1,
	id: 239,
	title: "Burden of Duty",
	author: "James Swallow",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"5m",
	rating: "%",
	link:"https://www.blacklibrary.com/series/garro/burden-of-duty-mp3.html"
},
{
	x: 1,
	y: 1,
	id: 207,
	title: "A Lesson in Iron",
	author: "David Guymer",
	book:"Short stories",
	faction: [""],
	pages:"22",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/all-products/advent-2018-9-a-lesson-in-iron-eshort.html"
},



Short Stories
{
	x: 1,
	y: 1,
	id: 82,
	title: "A Lesson in Iron",
	author: "David Guymer",
	book:"Short Stories",
	faction: [""],
	pages:"21",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/the-horus-heresy/quick-reads/advent-2018-9-a-lesson-in-iron-eshort.html"
},
{
	x: 1,
	y: 1,
	id: 83,
	title: "Ghost of Nuceria",
	author: "Ian St. Martin",
	book:"Short Stories",
	faction: [""],
	pages:"21",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/the-horus-heresy/quick-reads/eater-of-cities-eng-2019.html"
},
{
	x: 1,
	y: 1,
	id: 84,
	title: "The Passing of Angels",
	author: "John French",
	book:"Short Stories",
	faction: [""],
	pages:"21",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 85,
	title: "The Abyssal Edge",
	author: "Aaron Dembski-Bowden",
	book:"Short Stories",
	faction: [""],
	pages:"30",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 86,
	title: "Mercy of the Dragon",
	author: "Nick Kyme",
	book:"Short Stories",
	faction: [""],
	pages:"41",
	audio:"",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 87,
	title: "Will of the Legion",
	author: "Andy Clark",
	book:"Short Stories",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:""
},

Audio Dramas & Charcter Novels

{
	x: 1,
	y: 1,
	id: 89,
	title: "Perturabo: Stone and Iron",
	author: "Robbie MacNiven",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"21m",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 90,
	title: "Malcador: First Lord of the Imperium",
	author: "L.J. Goulding",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"25m",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 91,
	title: "Konrad Curze: A Lesson in Darkness",
	author: "Ian St. Martin",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"27m",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 92,
	title: "The Lords of Terra",
	author: "L.J. Goulding",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"1 hour 13m",
	rating: "%",
	link:""
},
{
	x: 1,
	y: 1,
	id: 93,
	title: "Illyrium",
	author: "Darius Hinks",
	book:"Audio Dramas",
	faction: [""],
	pages:"",
	audio:"28m",
	rating: "%",
	link:"https://www.blacklibrary.com/prod-home/advent-home/illyrium-2019.html"
},

{
	x: 1,
	y: 1,
	id: 96,
	title: "Valdor: Birth of the Imperium",
	author: "Chris Wraight",
	book:"Horus Heresy Characters Novels",
	faction: [""],
	pages:"272",
	audio:"6h 16m",
	rating: "%",
	link:""
},
	{
	x: 1,
	y: 1,
	id: 98,
	title: "Sigismund: The Eternal Crusader",
	author: "John French",
	book:"Horus Heresy Characters Novels",
	faction: [""],
	pages:"192",
	audio:"",
	rating: "%",
	link:""
},

Short stories

{
	x: 1,
	y: 1,
	id: 227,
	title: "Eater of Dreams",
	author: "Marc Collins",
	book:"Short stories",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/new-titles/featured/eshort-eater-of-dreams-eng-2021.html"
},
{
	x: 1,
	y: 1,
	id: 228,
	title: "Bloodhowl",
	author: "Chris Forrester",
	book:"Short stories",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/new-titles/featured/eshort-bloodhowl-eng-2021.html"
},
{
	x: 1,
	y: 1,
	id: 229,
	title: "Amor Fati",
	author: "Michael F. Haspil",
	book:"Short stories",
	faction: [""],
	pages:"",
	audio:"",
	rating: "%",
	link:"https://www.blacklibrary.com/new-titles/featured/eshort-amor-fati-eng-2021.html"
},