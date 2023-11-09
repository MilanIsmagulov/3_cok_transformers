let numberOfQuestion = 4; 
rightans=[2]

divBtn=document.querySelector('.main_buttons')

let nextBtn1 = document.createElement('button')
nextBtn1.innerText = 'Назад'
nextBtn1.setAttribute('onclick', `location.href='../javascript_quiz_app_${numberOfQuestion-1}/index.html'`)
divBtn.appendChild(nextBtn1)

nextbtn=document.createElement('button')
nextbtn.classList.add('blocked')
nextbtn.setAttribute('disabled','true')
nextbtn.id="nextbutton"
nextbtn.innerHTML="Далее"

ansbutton=document.createElement('button')
ansbutton.id='checkAns'

ansbutton.addEventListener('click',function(event)
{
    let rightcheck = false
    //Проверка на пустые чекбоксы
    for (let elem of document.querySelectorAll(".variant")) 
    {
        if(elem.firstElementChild.checked)
        {
            rightcheck=true
            break
        }
    }
    if (!rightcheck){
        return 0;
    }
    let counter=0 // Для получения порядкового номера
    for (let elem of document.querySelectorAll(".variant")) 
    {   
        elem.firstElementChild.setAttribute('disabled','true')
        if(elem.firstElementChild.checked){
            if (rightans.indexOf(counter) != -1){
                elem.classList.add('correct')
                elem.classList.remove('incorrect')
                
            }
            else
            {
                localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
                elem.classList.add('incorrect')
                rightcheck=false
                localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
                event.target.innerHTML="Повторить"
                event.target.setAttribute('onclick', "window.location.reload();")
                let nxt = document.getElementById('nextbutton')
                nxt.removeAttribute('disabled')
                nxt.classList.remove('blocked')
                nxt.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)
            }
        }
        else{  
            //Выделение правильных ответов, если они не выбраны
            if (rightans.indexOf(counter) != -1){
                localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
                elem.classList.add('correct')
            }
        }
        counter++
    }
    if (rightcheck){
        localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
        let nxt = document.getElementById('nextbutton')
        nxt.removeAttribute('disabled')
        nxt.classList.remove('blocked')
        nxt.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)
        event.target.setAttribute('disabled',true)
        event.target.classList.add('blocked')

    }
})
ansbutton.innerHTML="Ответить";
divBtn.appendChild(ansbutton);
divBtn.appendChild(nextbtn);

