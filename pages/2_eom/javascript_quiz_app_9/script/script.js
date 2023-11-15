// dran&drop 2
const anwserArr2 = ['предохранитель', 'к кабельным присоединениям силового трансформатора', 'трансформатор напряжения', 'к кабельным присоединениям разрядников', 'вакуумный выключатель']; //Ответы
const countCol = 2; //Колличесвто колонн
// Правильные ответы для каждой колонки
const correctAnswers = [
    ['предохранитель', 'к кабельным присоединениям силового трансформатора'],  // Правильные ответы для первой колонки
    ['трансформатор напряжения', 'к кабельным присоединениям разрядников', 'вакуумный выключатель']   // Правильные ответы для второй колонки
];
// Создаем объект для быстрого поиска правильной колонки для каждого ответа
const answerToColumn = {};
correctAnswers.forEach((answers, columnIndex) => {
    answers.forEach(answer => {
        answerToColumn[answer] = columnIndex + 1;
    });
});






const collumns = document.getElementById('columns')
const row = document.getElementById('row')

let numberOfQuestion = 9;
let numberOfQuestionSum = 11;
let areaIndex;
let startIndex;
let dragElem = null;
let rowArr = []

let data = {}

// Верный ли ответ?
let correct = false; 

init2()

let stepMarkerPlace = document.querySelector('.step_marker');
console.log("stepMarkerPlace")
for (let i = 0; i < numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button_blue.svg";
    stepMarkerPlace.appendChild(markers);
}

for (let i = 0; i < numberOfQuestionSum-numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button.svg";
    stepMarkerPlace.appendChild(markers);
}

let stepPlaceDescription = document.querySelector('.number_description');
stepPlaceDescription.innerHTML = numberOfQuestion + '/' + numberOfQuestionSum;

checkAll()

function checkAll(){
    let checkAnswerBtn = document.querySelector('#check_button_1')
    checkAnswerBtn.addEventListener('click', function(){
        let rowsElement = document.querySelector('#row')
        if (Object.keys(rowsElement.children).length === 0){
            checkAnswer2()
        }
    })
};


function init2() {
    createColumns();
    localStorage.getItem('data2') ? loadList2() : createList2()
}

let nameColPlc = document.querySelector('.body-inner')
let nameOfCol = document.createElement('span')
let nameOfColDiv = document.createElement('div')
nameOfColDiv.classList.add('spandivcol')
nameOfCol.classList.add('spancol')
nameOfCol.innerHTML = 'Верхняя дверь камеры КСО'
let nameOfCol2 = document.createElement('span')
nameOfCol2.classList.add('spancol', 'secondcol')
nameOfCol2.innerHTML = 'Нижняя дверь камеры КСО'
nameColPlc.appendChild(nameOfColDiv)
nameOfColDiv.appendChild(nameOfCol2)
nameOfColDiv.appendChild(nameOfCol)
function createColumns() {
    for(let i = 0; i < countCol; i++)  {
        const col = document.createElement('div')

        col.classList.add('col')
        col.innerHTML = `
        <ul class='col-ul' id='col${i+1}'></ul>
        `;

        data[i] = []
        collumns.appendChild(col)
    }
    areaIndex = document.querySelectorAll('.col-ul').length
    data[areaIndex] = []
    row.setAttribute('index', areaIndex)
}

function createList2() {
    data[areaIndex] = [];
    anwserArr2.forEach((item, index) => {
        var listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.classList.add('item');
        listItem.draggable = 'true';
        listItem.innerText = item



        data[areaIndex].push(listItem.innerText)

        row.appendChild(listItem)

    })
    localStorage.setItem('data2', JSON.stringify(data))

    addEventListeners2();
    console.log(localStorage)
    window.location.reload();
}

function loadList2() {
    fromStore2();

    const tempArr = []

    anwserArr2.forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.classList.add('item2');
        listItem.draggable = 'true';
        listItem.innerText = item

        tempArr.push(listItem)
    })

    for (let key in data) {
        data[key].map(key2 => {
            tempArr.map(key3 => {
                document.querySelectorAll('.col-ul').forEach((item, index) => {
                    if (key == index && key2 === key3.innerText) {
                        item.appendChild(key3)
                    }
                })
            })
        })
    }

    let keyLast = Object.keys(data)
    let rowData = data[keyLast[keyLast.length - 1]]

    rowData.forEach((item, index) => {
        tempArr.map(item2 => {
            if (item == item2.innerText) {
                row.appendChild(item2)
            }
        })
    })

    addEventListeners2();   
}

function fromStore2() {
    data = JSON.parse(localStorage.getItem('data2'))
}


function startDragBlock() {
    dragElem = this;
    this.classList.add('hide');
    if (this.closest('div').getAttribute('index') === null) {
        startIndex = this.closest('ul').getAttribute('index')
    } else  {
        startIndex = this.closest('div').getAttribute('index')
    }
}
function endDragBlock() {
    dragElem = null;
    this.classList.remove('hide');
}
function dragColOver(e) {
    e.preventDefault();
    this.classList.add('hover');
}
function dragColEnter(e) {
    e.preventDefault();
    this.classList.add('hover');
}
function dragColLeave() {
    this.classList.remove('hover');
}
function dropColBox() {
    this.append(dragElem);
    this.classList.remove('hover');
    let endIndex = this.getAttribute('index');

    refreshData(startIndex, endIndex);
}

function refreshData(s, e) {
    data[e].push(dragElem.innerText)
    data[s] = data[s].filter((i) => i !== dragElem.innerText)

    localStorage.setItem('data2', JSON.stringify(data))
}

function checkAnswer2() {
    let uncorrect = 0;
    // Проходим по каждой колонке
    for (let i = 1; i <= correctAnswers.length; i++) {
        const column = document.getElementById(`col${i}`);
        const items = column.querySelectorAll('.item2');
        console.log(column)
        console.log(items)

        // Проходим по каждому элементу в колонке
        items.forEach((item) => {
            const itemValue = item.textContent || item.innerText;

            // Используем объект для быстрой проверки правильности колонки
            if (answerToColumn[itemValue] === i) {
                //Верно
                checkBtn.classList.add('disabled_button')
                nextBtn.classList.remove('disabled_button')
                refreshBtn.classList.remove('disabled_button')
                item.style.backgroundColor = 'rgb(189, 255, 189)';
            } else {
                //Неверно
                checkBtn.classList.add('disabled_button')
                nextBtn.classList.remove('disabled_button')
                refreshBtn.classList.remove('disabled_button')
                item.style.backgroundColor = 'rgb(255, 185, 185)';
                uncorrect++;
                localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));
            }
        });
    }

    if (uncorrect == 0) correct = true

    
}

localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
function refreshAnwser2() {



    location.reload();
}

function addEventListeners2() {
    const items2 = document.querySelectorAll('.item2');
    const colms = document.querySelectorAll('.col-ul');

    items2.forEach((item) => {
        item.draggable = true;

    });
    colms.forEach((col) => {

    });
}

let backBtn = document.querySelector('#check_button_0')
let checkBtn = document.querySelector('#check_button_1')
let refreshBtn = document.querySelector('#check_button_2')
let nextBtn = document.querySelector('#check_button_3')
let popUpWindow2 = document.querySelector('#popup2')

function openPopUp2() {
    popUpWindow2.classList.remove('close')
}

function closePopUp2() {
    popUpWindow2.classList.add('close')
}