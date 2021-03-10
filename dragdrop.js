var cards = document.querySelectorAll('.card');
var dropzones = document.querySelectorAll('.dropzone');
var btnsAddCard = document.querySelectorAll('.btn-add-card');

const tasks = [
    { id: 1, status: "progress", text: "Task1" },
    { id: 2, status: "todo", text: "Task2" },
    { id: 3, status: "done", text: "Task3" },
    { id: 4, status: "done", text: "Task4" },
    { id: 5, status: "todo", text: "Task5" },
];

window.onload = () => {
    initKanban();
    loadTasks(tasks)
}

btnsAddCard.forEach(btn => {
    btn.addEventListener("click", addNewCard);
})

function loadTasks(tasks) {

    if (tasks.length > 0) {


        const todoDropzone = document.querySelector('.dropzone.todo');
        const todoTasks = tasks.filter(task => task.status == 'todo');
        todoTasks.forEach(task => {
            todoDropzone.appendChild(htmlCard(task))
        })

        const progressDropzone = document.querySelector('.dropzone.in-progress');
        const progressTasks = tasks.filter(task => task.status == 'progress');
        progressTasks.forEach(task => {
            progressDropzone.appendChild(htmlCard(task))
        })

        const doneDropzone = document.querySelector('.dropzone.done');
        const doneTasks = tasks.filter(task => task.status == 'done');
        doneTasks.forEach(task => {
            doneDropzone.appendChild(htmlCard(task))
        })

        const btnCloseCard = document.querySelectorAll('.close');
        btnCloseCard.forEach(btn => {
            btn.addEventListener("click", deleteCard)
        })
    }
}

function htmlCard(task) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true");
    card.setAttribute("id", task.id);
    let html = `
            <div class="status"></div>
            <span class="close">x</span>
            <div class="content">
                <textarea placeholder="Type your task here...">${task.text}</textarea>
            </div>
    `;
    card.innerHTML = html;

    card.addEventListener("dragstart", dragstart);
    card.addEventListener("drag", drag);
    card.addEventListener("dragend", dragend);
    return card;
}

function addNewCard(e) {
    const dropzone = e.target.nextElementSibling;

    const card = document.createElement("div");
    const statusCard = document.createElement("div");
    const contentCard = document.createElement("div");
    const btnCloseCard = document.createElement("span");
    const textAreaCard = document.createElement("textarea");


    btnCloseCard.classList.add("close");
    btnCloseCard.innerText = "x";
    btnCloseCard.addEventListener('click', deleteCard);

    card.classList.add("card");
    card.setAttribute("draggable", "true");
    statusCard.classList.add("status");
    contentCard.classList.add("content");
    textAreaCard.setAttribute("placeholder", "Type your task here...")

    contentCard.appendChild(textAreaCard);
    card.appendChild(statusCard);
    card.appendChild(btnCloseCard);
    card.appendChild(contentCard);

    card.addEventListener("dragstart", dragstart);
    card.addEventListener("drag", drag);
    card.addEventListener("dragend", dragend);
    dropzone.append(card);
    textAreaCard.focus();
}

function initKanban() {
    cards.forEach(function (card) {
        card.addEventListener("dragstart", dragstart)
        card.addEventListener("drag", drag)
        card.addEventListener("dragend", dragend)
    })

    dropzones.forEach(function (dropzone) {
        dropzone.addEventListener('dragenter', dragenter);
        dropzone.addEventListener('dragover', dragover);
        dropzone.addEventListener('dragleave', dragleave);
        dropzone.addEventListener('drop', drop);
    });

    console.log("Init Kanban")
}

function dragstart(e) {
    // console.log('start');
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
    this.classList.add('is-dragging')

}

function drag(e) {
    // console.log('drag');

}

function dragend(e) {
    // console.log('dragend');
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
    this.classList.remove('is-dragging');
}


function dragenter(e) {
    // console.log('dragenter');
}
function dragover(e) {
    // console.log('dragover');
    e.preventDefault();
    this.classList.add('over');
    const cardBeingDragged = document.querySelector('.is-dragging');
    const afterElement = getDragAfterElement(this, e.clientY);
    if (afterElement == null) {
        this.appendChild(cardBeingDragged);
    } else {
        this.insertBefore(cardBeingDragged, afterElement);
    }
}
function dragleave(e) {
    this.classList.remove('over')
}
function drop(e) {
    this.classList.remove('over')
}

function getDragAfterElement(dropzone, y) {

    const draggableElements = [...dropzone.querySelectorAll('.card:not(.is-dragging)')];

    return draggableElements.reduce((closet, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closet.offset) {
            return { offset: offset, element: child }
        } else {
            return closet;
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function deleteCard(e) {
    e.target.parentNode.remove();
}