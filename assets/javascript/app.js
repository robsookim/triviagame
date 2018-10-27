function timer(time, update, complete){
    var start = new Date().getTime();
    var interval = setInterval(function(){
        var now = time-(new Date().getTime()-start); 
        if( now <= 0) {
            clearInterval(interval);
            complete(); 
        }
        else update(Math.floor(now/1000)); 
    },100); 
}

timer(
    31000, 
    function(timeleft) {
        document.getElementById('timer').innerHTML = "TIME REMAINING: "+"00:" +timeleft+" seconds";
    }, 
    function() {
        alert("TIME COMPLETE! SUBMIT YOUR ANSWERS"); 
    }
); 

(function(){
    function buildQuiz() {
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>`
            ); 
        }); 
        quizContainer.innerHTML = output.join(""); 
    }
    function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");
        let numCorrect = 0;
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber]; 
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value; 

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                answerContainers[questionNumber].style.color = "red"; 
            }
        }); 
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`; 
    }
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton =  document.getElementById("submit"); 
    const myQuestions = [
        {
            question: "1. What is the average lifespan of an elephant?",
            answers: {
                a: "70 years",
                b: "50 years", 
                c: "80 years", 
                d: "90 years",
            },
            correctAnswer: "a"
        }, 
        {
            question: "2. How many pairs of ribs do elephants have?",
            answers: {
                a: "10", 
                b: "15",
                c: "20",
                d: "25",
            }, 
            correctAnswer: "c"
        },
        {
            question: "3. How much weight can an elephant's trunk lift?",
            answers: {
                a: "800 lbs",
                b: "500 lbs", 
                c: "700 lbs",
                d: "600 lbs", 
            },
            correctAnswer: "b"
        }
    ]; 

    buildQuiz();
    submitButton.addEventListener("click", showResults); 

})(); 