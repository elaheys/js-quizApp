const loader = document.getElementById("loader");
const container = document.querySelector(".container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error")

const level = localStorage.getItem("level") || "medium"
const CORRECT_BUNOS = 10
const BASE_URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0
let isAccepted = true;



const formatData = questionData => {
    const result = questionData.map(item => {
        const questionObject = {question:item.question}
        const answers = [...item.incorrect_answers]
        const correctAnswerIndex = Math.floor(Math.random() * 4)
        answers.splice(correctAnswerIndex,0,item.correct_answer)
        questionObject.answers = answers;
        questionObject.correctAnswerIndex = correctAnswerIndex;
        return questionObject;
    })
    return result;
}

const fetchData = async () => {
    try{
        const response = await fetch(BASE_URL)
        const json = await response.json()
        formattedData = formatData(json.results)
        start()
    }catch{
        loader.style.display = "none";
        error.style.display = "block"
    }
}

const showQuestion = () => {
    questionNumber.innerText = questionIndex + 1
   const {question,correctAnswerIndex,answers} = formattedData[questionIndex];
   correctAnswer = correctAnswerIndex
   
   questionText.innerText = question
   answerList.forEach((button,index) => { 
       button.innerText = answers[index]

   })
}

const start = () => {
    showQuestion()
    container.style.display = "block";
    loader.style.display = "none";
}

answerList.forEach((button,index) => {
    button.addEventListener("click",(event) => checkAnswer(event,index))
})

const checkAnswer = (event,index) => {
    if(!isAccepted) return;
    isAccepted = false

    const isCorrect = correctAnswer === index ? true : false    
    if(isCorrect){
        event.target.classList.add("correct");
        score += CORRECT_BUNOS
        scoreText.innerText = score;
    }else{
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");
    }
 
}

const nextHandler = () => {
    questionIndex++
    console.log(questionIndex)
   if(questionIndex < formattedData.length){
    isAccepted = true;
    removeClasses();
    showQuestion();
   }else{
    finishHandler()
}

}

const finishHandler = () => {
    localStorage.setItem("score",JSON.stringify(score));
    window.location.assign("/end.html");
}

const removeClasses = () => {
    answerList.forEach(button => button.className = "answer-text")
}

window.addEventListener("load",fetchData);
nextButton.addEventListener("click" , nextHandler);
finishButton.addEventListener("click" , finishHandler);
