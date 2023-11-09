let numberOfQuestion =10; 
divBtn=document.querySelector('.main_buttons')

let nextBtn1 = document.createElement('button')
nextBtn1.innerText = 'Назад'
nextBtn1.setAttribute('onclick', `location.href='../javascript_quiz_app_${numberOfQuestion-1}/index.html'`)
divBtn.appendChild(nextBtn1)

let nextbtn=document.createElement('button')
nextbtn.id="nextbutton"
nextbtn.innerHTML="Далее"
nextbtn.classList.add('blocked')

ansbutton=document.createElement('button')
ansbutton.id='checkAns'
ansbutton.innerHTML="Ответить";
ansbutton.setAttribute('onclick',"checkAnwser5()")
divBtn.appendChild(ansbutton)
divBtn.appendChild(nextbtn)
