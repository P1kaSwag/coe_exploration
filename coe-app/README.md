# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### App information starts here ###

App.js

App Component
Takes two state variables (currentPage, userAnswers) 
currentPage represents current page either ‘question’ or ‘results’
userAnswers stores the answer to each question

handleNext function
Moves to the next question and handles ‘userAnswers ‘ state
Takes two parameters (selectedOption, isFinalQuestion) 
If it is the final question the ‘currrentPage’ is set to ‘results’

JSX rendering
Renders different components based on the currentPage state

----------------------------------------------------------------------------------------------

QuestionComponent,jsx

Each question (for now) is represented by its own component 
3 props 
‘selectedOption’ - value of each radio button is compared with the ‘selectedOption’ prop to see if it should be checked.
QuestionComponent function
Main function that manages state for currentQuestion and selectedOption
Renders question based on ‘currentQuestion’ state
handleOptionchange() function updates ‘selectedOption’ state when radio button is pressed.
handleNext() function handles transition to the next question and displaying final results.
 State management
Two state variables (selectedOption and currentQuestion)
selectedOption:
This state variable is used to keep track of the user's selected answer for the current question.
It is initialized using the useState hook with an empty string as the initial value.
The value of selectedOption is updated whenever the user selects a radio button in the current question.
currentQuestion
This state variable is used to keep track of which question is currently being displayed to the user.
It is also initialized using the useState hook with 1 as the initial value, indicating that the initial question is the first question.
The value of currentQuestion is updated when the user clicks the "Next" button to transition to the next question.

These state variables play a crucial role in managing the dynamic behavior of the QuestionComponent. The selectedOption allows the component to keep track of the user's input for the current question, and currentQuestion helps in determining which question to render and when to transition to the next question or display the results.
In Summary
selectedOption stores the user's selected answer for the current question.
currentQuestion keeps track of which question is currently being displayed.
JSX rendering
Conditionally renders 
----------------------------------------------------------------------------------------------

RenderComponent.jsx

Takes userAnswers as a prop, object containing users answers

Questions:

How are answers to each question stored and passed to the Results component?

the selectedOption state in the QuestionComponent keeps track of the user's selected answer for the current question, and the handleNext function passes this selected answer to the parent component (App), where it is used to update the userAnswers state. The userAnswers state is then passed down to the ResultsComponent for displaying the results.


