# Nous Fullstack coding exercise

## My process for tackling this exercise was:

1. open up my Concepts app on my iPad and sketch out rough drawings on all the elements that app would need for the interface. I based this off of the requirements provided in the user story.

2. I then used a mind mapping app called Mind Map to outline all the components the app would need. I used used this app to visualise the data required for each component and where it would be coming from (providers and/or transactions data)

3. I started off using the provided starter file and edited it as required.

4. I set up all my folder structures and files as per my mind map.

5. I used express to throw up a local server and the FS module from node to consume and send the two data files to the perspective endpoints.

6. I implemented CORS and tested this was working on the chrome browser before moving on.

7. I began working on the react portion of the project by creating a hook that would turn the data from the api.

8. After working out all the data that I would need throughout the app, I made a hook for the top level screen (aside from App.tsx) as I knew this is where all my data would start to flow into other components via props.

9. I then began to create the required components, prioritising the inner child components first and building the other components on the way up.

10. Finally I connected all the required data into each components via their props.

My aim is to always separate UI, Logic, and Data fetching. This makes testing a lot easier, when there’s one central hub for everything.

To save time, I added all my CSS into the main App.css file. I know this isn’t good practice, but it was to save time.

## If I had more Time with this project I would:

- Research and implement better styling to the model sections of the app
- Separate CSS files to match their perspective components
- I would add a filter button to show only relevant data
- I would categorise transactions into different expense categories (e.g. groceries, utilities, fuel etc) and present them on a chart on the transactions page.
- I would write unit tests for all the files I created.
- I would have also made frequent commits
