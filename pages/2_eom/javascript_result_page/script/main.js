let resultPlaceTrue = document.querySelector('#result_place_1');
let resultPlaceFalse = document.querySelector('#result_place_2');
let questionNumberPlace = document.querySelector('#place_question_number');
let questionPercentPlace = document.querySelector('#place_question_percent');
let answerDiagram = document.querySelector('#answer_diagram_1');
let trueAnswers = 0;
let falseAnswers = 0;
// localStorage.setItem('answer_3', JSON.stringify({questionPlace: false}));
let resultData=[]
let q=[2,4,6,7,9,10,11]
for (elem of q){
    try{
        result=JSON.parse(localStorage.getItem('answer_'+elem))
        if (result == null){
            resultData.push(false)
        }
        else{
            resultData.push(result) 
        }
       
    }
    catch(err){
        resultData.push(false)
    }
}



questionNumberPlace.innerHTML = resultData.length;


for (let i = 0; i < resultData.length; i++){
    
    if (resultData[i].questionPlace === true){
        trueAnswers++;

    } else {
        falseAnswers++;
        
    }
    
} 

resultPlaceTrue.innerHTML = trueAnswers;
resultPlaceFalse.innerHTML = falseAnswers;

let percentOfAnswers =  Math.floor((trueAnswers/resultData.length)*100)

questionPercentPlace.innerHTML = percentOfAnswers + '<strong>%</strong>';
// answerDiagram.innerHTML = percentOfAnswers + '%';
answerDiagram.setAttribute('style', '--p:' + percentOfAnswers + ';' + '--c:rgb(0, 114, 192);');
