// Dependency
var friendsData = require('../data/friends');

module.exports = function (app) {

    // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req, res) {
        // Add new member data to friendsData array.
        friendsData.push(req.body);
        console.log('pushed')
        
        // Convert scores to numbers.
        const userNumArr = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            const newElem = parseInt(req.body.scores[i]);
            userNumArr.push(newElem);
        }
        
        // Create an empty array to hold the total difference scores for potential friend, as compared to user scores.
        var diffScores = [];
        var topMatch = 100;
        // Loop through array of friend objects
        for (var i = 0; i < friendsData.length - 1; i++) {
            console.log('user ' + parseInt(i+1))
            // Create an empty array, results, to hold the differences in scores.
            var results = []
            // Within each object, loop through the scores array.
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                // Get the scores of the other user
                var friendNums = friendsData[i].scores;
                // Get the difference (absolute value)
                var resultElem = Math.abs(parseInt(userNumArr[j]) - parseInt(friendNums[j]));
                // Add each calculated difference to results array
                results.push(resultElem);
            }
            console.log('User:' + userNumArr);
            console.log('Friend:' + friendNums);
            console.log('Differences:' + results);

            // Get sum of results values.
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            var diffScore = results.reduce(reducer);
            console.log(diffScore);
            diffScores.push(diffScore);
            // Because we're looking for a lower difference, initialize topMatch to an impossibly high number instead of zero.
            
            if (diffScore < topMatch) {
                topMatch = diffScore;
            }
            console.log(`current top: ${topMatch}`);
            
        }
        console.log(diffScores);
        console.log(topMatch);

        var matchIndex = diffScores.indexOf(topMatch);
        console.log(matchIndex);
        console.log(`Your top match is ${friendsData[matchIndex].name}!`);
        console.log(`${req.body.name} and ${friendsData[matchIndex].name} sittin' in a tree...`);
        res.json(friendsData[matchIndex]);

    });
};