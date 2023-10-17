const button = document.querySelector("button");
const input = document.querySelector("input");
const scoreEle = document.querySelector("p");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const score = JSON.parse(localStorage.getItem("score"));
scoreEle.innerText = score;


const saveHandler = () => {
    if(!input.value || !score){
        alert("Invalid username or score!")
    }else{
        const finalScore = {name:input.value,score}
        console.log(finalScore)
        highScores.push(finalScore)
        highScores.sort((a,b) => b.score - a.score)
        highScores.splice(10);
        localStorage.setItem("highScores" , JSON.stringify(highScores))
        localStorage.removeItem("score")
        window.location.assign("/")
    }
}

button.addEventListener("click" , saveHandler)
