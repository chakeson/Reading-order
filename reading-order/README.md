# TODO

- Fix login api target api to verification

- Add account settings.

- Way to exfiltrate data for requests.

- Add api hooking for books.tsx so it saves progress.

- Fix Login and Sign up and similar routing. Consider modal instad of page.

- Add progress-bar on navbar.

- Siege of Terra page.

- Improve text color changer for books.

- Fix error resizing flickering/arrow line up.

- Add lazy loading of book data to reduce bundle size.

- Properly type all :any
    - Type useGlobalContext hook

- Write about pages content text

# Start and set up

Look at [.env.example](.env.example) for the template for your .env file in the same directory.


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

# Design
Palettes: https://coolors.co/palette/ff5400-ff6d00-ff8500-ff9100-ff9e00-00b4d8-0096c7-0077b6-023e8a-03045e


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
