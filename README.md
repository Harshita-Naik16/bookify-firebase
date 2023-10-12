# Bookify

An App where you can sell or buy books.

#### Live site link -

### Tech Stack

- Vite
- Html
- Css
- React
- React Bootstrap
- React router dom
- Bootstrap
- Firebase

### Journey

- Used Firebase for the first time. It was challenging to structure everything well, so that I can add new features in the future.
- All the firebase code is stored in firebase.jsx file which is created using react context that is wrapped around whole app in main.jsx
- main.jsx is the entry point of our app where all the routing config is handled.
- Also tried react bootstrap for the first time. It sure has some good responsive components which eases the work of a developer and goes well with react.
- When deployed to vercel I faced a problem where routing was giving me a 404 error which was solved after adding vercel.json config. [solution article](https://medium.com/@emmanuelomemgboji/handling-404-errors-on-vercel-deployments-a-step-by-step-guide-with-react-vite-and-31fc4d865dc9)

### File Structure

- `src` - contains all the important folders
- `src/components` - has all the reusable components
- `src/lib` - contains reusable helper functions
- `src/pages` - contains all the pages which are handled by routing in main.jsx
- `src/store/firebase.jsx` - react context which stores all of the firebase configuration accessed throughout the app.
- `src/App.jsx` - Here the Navbar is made available as a common component throughout the app
- `src/main.jsx` - Entry point to our application linked to html file which is present in root folder.
- `src/index.css` - Css file, contains some custom styling for Loading component.

Thank you for Reading...

#### contributer - [Harshita Naik](https://github.com/Harshita-Naik16)
