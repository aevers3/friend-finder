# food-friend-finder

This is a full stack application using Express.js to build our server and back end components. Users can complete a short survey about various food and restaurant opinions, and will be shown the user who had the most similar answers to their survey. It is currently deployed via Heroku.

## Objective
The app starts on the home page, which is really just a styled html page with a link to our survey page. Navigating to this page, we will collect the following from the user: 
* Name
* A link to an image of the user
* Answers to each of the survey questions. Each answer will be a number between 1 and 5.

We include a simple validation on the name and photo URL inputs, which are required. The form can only submit if those fields are populated. We need this here to avoid ID errors later.

## Matching Logic
On submit, we put all of the user's survey answers into an array and post it to the server. Those numbers are then compared to the answers provided by other users. For each user in our database, we get the differences between each question's answer, and add that to a new array. We now have a newly created array of numbers representing the differences between the two users' answers. 

We reduce that array down to the sum of its contents and have a single number representing compatibility between the active user and the stored database user. We'll find this number for each of the users in our database and return the user who's score (differences) is the lowest.

## friends.js
The main purpose of this application was to demonstrate knowledge of the Express NPM package. As such, we store our "database" of users in memory. Friends.js contains a hardcoded initial load of users. If this were to be expanded, it would be better to connect to and query an actual database for true data persistence. 