# Trivia app

This project was the final solo challenge for the Scrimba React Basics course.

## The challenge

Build a trivia app. Get question and answer data from an external API.

### Coding used

UseEffect - I figured I could use this to track changes to a 'stateful item' - this really helped to 'click' the concept of the dependency array! I tracked changes to the answer array for each question object hoping to see it change when an answer was selected (and therefore console.log the questions object), this helped me narrow down what my code was and was not diong.

Data - Storing the question and answer data had a couple of different renditions. I originally tried to keep questions and answers in separate objects, but then decided each question should be its own object with an array of answers, each with a chosen and correct true/false value. Learning to both navigate and alter embedded objects like this has been one of the main challenges I have faced getting this to work.

Git - I went hard on using git in this project. I have incorporated branches to work on features throughout, something completely new to me. I have also had to merge conflicts as I accidentally editted both my local version and the version directly on github without first pulling/pushing.

map rendering - Mapping through data structures to render elements on the page. Always like an opportunity to practice Array methods. This also went hand-in-hand with conditionally styling elements based on props.

### What I have gained from doing this

A depper understanding of how to manipulate and store data from an API. Whilst usually free to do so however you wish in projects, you need to do it with thought as to how that data is going to challenge you accessing parts at a later date!

I also got to extra styling practice using flexbox and grid. The more I use both of these, the more natural they feel to me.

Finally, I hope my code is clean enough to read. I really focussed on condensing it as much as possible without trying to abstract it too much.