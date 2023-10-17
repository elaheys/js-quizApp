const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const list = document.querySelector("ol")

const content = highScores.map((score,index) => {
    return `
        <li>
            <span>${index + 1}</span>
            <p>${score.name}</p>
            <span>${score.score}</score>
        </li>
    `
})

list.innerHTML = content.join("")
console.log(content)