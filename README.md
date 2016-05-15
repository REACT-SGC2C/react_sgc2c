# react_sgc2c
React Assignment Code Fellows 401

To use this app:

1. Run mongod in your terminal.
2. In another terminal window, navigate to the client folder, then run gulp.
3. Run node server.js from the client folder.
4. In another terminal window, navigate to the server folder, then run node server.js.
5. Open your browser, enter 'http://localhost:5000' in the address bar.

GET/POST/PUT/DELETE

6. POST route. From the browser, in the fields enter the celeb name, occupation, and species, then click the 'Create Interview' button.
7. GET route. Reload browser.
8. PUT route. From the browser, click the edit button next to the entry you wish to alter. Enter the new information in the provided fields. Click the 'Save Interview' button.
9. DELETE route. From the browser, click the 'Delete' button next to the entry you wish to delete. Bam. It's gone.

Comparing Angular to React:
Usage of React makes for a cleaner html file. It also requires the installation of a few React-oriented Babel modules because, unlike Angular, React isn't ES6 compliant. You also need the Babel modules to support the JSX expressions that React favors. JSX allows for the creation of applications in React. In Angular, directives are used instead. React allows updates without necessitating page reloads, increasing SPA performance speed. React also allows for easier incorporation of JQuery, though at a possible cost to speed. React doesn't bother with an MVC/MVVM pattern like Angular does, preferring to use only the View pattern.
