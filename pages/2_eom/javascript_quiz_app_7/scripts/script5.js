

const anwserArr = [['специально разработанная площадка обслуживания и пара балок предназначены для закрепления силового трансформатора на рамах'], ['представляет собой отдельную систему, состоящую из низковольтного шкафа с распределительными приборами и специальной платформы, предназначенной для размещения высоковольтного силового трансформатора'],['для подключения к линии электропередачи (ЛЭП) используется специальное устройство, которое соединяется с разъединителем наружной установки. Этот разъединитель оснащен приводом, который поставляется в комплекте и устанавливается на ближайшей опоре ЛЭП']]; //Ответы в правильном порядке
const text = ["КТПС (1 опора)", "КТПМ (2 опоры)", "КТПС-4 (4 опоры)"]
const list = document.getElementById('list');
let listItems = [];
let dragStartIndex;

function reloadWindow(){
    window.location.reload();
}


createList2()

function createList2() {
    let iii = 0;
    [...anwserArr]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        let div = document.createElement("div");
        div.setAttribute("class", "number");
        div.innerHTML = `${text[index]}<img src="./content/marker_blue.png" alt="1">`;
        document.getElementsByClassName("numbers")[0].appendChild(div)

        const listItem = document.createElement('div');
        listItem.setAttribute("id", `${index}`)

        // <div class="number">${text[index]} <img src="./content/marker_blue.png" alt="1"></div>
        listItem.innerHTML = ` <div class="item">${item} </div> `;
        listItems.push(listItem);
        list.appendChild(listItem);
        iii++;
    });

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('id');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.item');
    const itemTwo = listItems[toIndex].querySelector('.item');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}


function checkAnwser5() {

    let nxt = document.getElementById('nextbutton')
    nxt.removeAttribute('disabled')
    nxt.classList.remove('blocked')
    nxt.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)
    let rightcheck = 1
    listItems.forEach((item, index) => {

        const itemName = item.querySelector('.item').innerText.trim()
        
        if (itemName !== anwserArr[index].join(',')) {
            item.classList.add('incorrect')
            rightcheck=0
            localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
            document.getElementById('checkAns').innerHTML="Повторить"
            document.getElementById('checkAns').setAttribute('onclick', "window.location.reload();")
            let nxt = document.getElementById('nextbutton')
            nxt.removeAttribute('disabled')
            nxt.classList.remove('blocked')
            nxt.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)

        } else {
            
            item.classList.add('correct')
        }
        
    });
    if (rightcheck == 1){
        localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
        let nxt = document.getElementById('nextbutton')
        nxt.removeAttribute('disabled')
        nxt.classList.remove('blocked')
        nxt.setAttribute('onclick',`location.href='../javascript_quiz_app_${numberOfQuestion+1}/index.html'`)
        document.getElementById('checkAns').setAttribute('disabled',true)
        document.getElementById('checkAns').classList.add('blocked')
    }
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.item');
    const dragListItems = document.querySelectorAll('.list li');

    draggables.forEach((draggable) => {
        // draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
        // item.addEventListener('dragover', dragOver);
        // item.addEventListener('drop', dragDrop);
        // item.addEventListener('dragenter', dragEnter);
        // item.addEventListener('dragleave', dragLeave);
    });
}

