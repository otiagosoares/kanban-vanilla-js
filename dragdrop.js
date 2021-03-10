var cards = document.querySelectorAll('.card')
var dropzones = document.querySelectorAll('.dropzone')
var btnsAddCard = document.querySelectorAll('.btn-add-card')

window.onload = () => {
    initKanban();
}

btnsAddCard.forEach(btn => {
    btn.addEventListener("click", addNewCard);
})

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