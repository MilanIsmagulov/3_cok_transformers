let numberOfQuestion = 5; 
divBtn=document.querySelector('.main_buttons')

let nextBtn1 = document.createElement('button')
nextBtn1.innerText = 'Назад'
nextBtn1.setAttribute('onclick', `location.href='../javascript_quiz_app_${numberOfQuestion-1}/index.html'`)
divBtn.appendChild(nextBtn1)

nextbtn=document.createElement('button')
nextbtn.id="nextbutton"
nextbtn.innerHTML="Далее"
nextbtn.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)
divBtn.appendChild(nextbtn)
