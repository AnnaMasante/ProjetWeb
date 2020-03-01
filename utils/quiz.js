/*function buildQuiz(){
    const output=[];

    questions.forEach(
        (currentQuestion,questionNumber)=>{
            const answers = [];

            for(number in currentQuestion.answers){
                //ajout radio bouton
                answers.push(
                    `<label>
                        <input type="radio" name="question ${questionNumber}" value="$number">
                            ${letter}
                            ${currentQuestion}
                        </input>
                    </label>`
                );
            }

            //ajout de la question et de la réponse à la sortie
            output.push(
              `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
            );
            
        }
    );
    quizContainer.innerHTML = output.join('');    
}
function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let score = 0;
    //Pour chaque question
    myQuestions.forEach((currentQuestion,questionNumber)=>{
        //on trouve la réponse sélectionnée
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question ${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        score += questionNumber;

    });
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const answerContainers = quizContainer.querySelectorAll('.answers')


buildQuiz();

//si submit, affiche les résultats
submitButton.addEventListener('click',showResults);*/

function calculResultat(req,res){
    var somme = 0;
    var compt = 1;
    var calcul;
    var score = 0;
    var requete;
    while(compt<20){
        calcul= ""+compt+"";
        requete = req.body.calcul
        score+=calculScore(requete)

    }

}
function calculScore(a){
    return a%4
}