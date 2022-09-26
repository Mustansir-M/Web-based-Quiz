function shuffleArray(array) {
    let currentId = array.length;
    // There remain elements to shuffle
    while (0 !== currentId) {
        // Pick a remaining element
        let randomId = Math.floor(Math.random() * currentId);
        currentId -= 1;
        // Swap it with the current element.
        let tmp = array[currentId];
        array[currentId] = array[randomId];
        array[randomId] = tmp;
    }
    return array;
}

let questionss = []
let individualQuestion = {}

fetch('https://opentdb.com/api.php?amount=10')
.then(response => response.json())
.then(data=>{
    // console.log(data.results[0].question);
    console.log(data.results);
    data.results.forEach((element, index) => {
        // console.log(element);
        individualQuestion.question = element.question;
        individualQuestion.correct = element.correct_answer;
        // console.log(individualQuestion);
        let temp;
        if (element.incorrect_answers.length > 1) {
            temp = [individualQuestion.correct, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2]]
        } else {
            temp = [individualQuestion.correct, element.incorrect_answers[0]]
        }

        temp = shuffleArray(temp);
        // console.log(temp);
        if (element.incorrect_answers.length > 1) {
            individualQuestion.a = temp[0]
            individualQuestion.b = temp[1]
            individualQuestion.c = temp[2]
            individualQuestion.d = temp[3]
        } else {
            individualQuestion.a = temp[0]
            individualQuestion.b = temp[1]
        }
        questionss.push(individualQuestion);
        // console.log(individualQuestion);
        individualQuestion = {}
    });
    // console.log(questionss);
});


//     questions=data.results.map(data=>{
//         const formattedQuestion={
//             question: data.question
//         };

//         const answerChoices=[... data.incorrect_answers];
//         formattedQuestion.answer=Math.floor(Math.random()*3)+1;
//         answerChoices.splice(
//             formattedQuestion.answer-1,0,data.correct_answer
//         );

//         answerChoices.forEach(choice,index)=>{
//             formattedQuestion["choice"+(index+1)]=choice;

//         });
//         return formattedQuestion;
//     });
// }










const questions = [{
    question: "Dummy question 1",
    a: "Option 1",
    b: "Option 2",
    c: "Option 3",
    d: "Option 4",
    correct: "d",
},
{
    question: "Dummy question 2",
    a: "Option 1",
    b: "Option 2",
    c: "Option 3",
    d: "Option 4",
    correct: "a",
},
{
    question: "Dummy question 3",
    a: "Option 1",
    b: "Option 2",
    c: "Option 3",
    d: "Option 4",
    correct: "b",
},
{
    question: "Dummy question 4",
    a: "Option 1",
    b: "Option 2",
    c: "Option 3",
    d: "Option 4",
    correct: "b",
}
];

let index = 0;
let tot_len = questions.length;
let r = 0; w = 0;
const qbox = document.getElementById("qbox")
const optinp = document.querySelectorAll(".opt")
const loadQuestion = () => {
    if (index === tot_len) {
        return endQ();           // endQuiz
    }
    reset();

    const data = questions[index]
    qbox.innerText = `${index + 1}) ${data.question}`;
    optinp[0].nextElementSibling.innerText = data.a
    optinp[1].nextElementSibling.innerText = data.b
    optinp[2].nextElementSibling.innerText = data.c
    optinp[3].nextElementSibling.innerText = data.d
}

const submitQ = () => {
    const data = questions[index];
    const ans = getAns();

    if (ans === data.correct) {
        r++;         // right answers
    }
    else {
        w++;         // wrong answers
    }
    index++;
    loadQuestion();
    return;

}

const getAns = () => {
    let answer;
    optinp.forEach(

        (input) => {
            if (input.checked) {
                answer = input.value;

            }
        }

    )
    return answer;

}

const reset = () => {
    optinp.forEach(
        (input) => {
            input.checked = false;
        }
    )


}
const endQ = () => {
    
        document.getElementById("boxed").innerHTML = `
    <div class="eq"> 
        <h3> Thankyou for attempting the Quiz</h3>
        <h2> ${r}/${tot_len} are correct </h2>
    </div>
    `
}


loadQuestion();