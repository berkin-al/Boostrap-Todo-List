


const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;





loadItems();


eventListeners();
function eventListeners() {
    
    form.addEventListener("submit", addNewItem);
    
    taskList.addEventListener("click", deleteItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
    todos = getItemsFormLS();
    todos.forEach(function (item) {
        creatItem(item);
    })
}

function getItemsFormLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function setItemToLS(newTodo) {
    todos = getItemsFormLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function creatItem(newTodo) {
    
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(newTodo))


    const a = document.createElement("a");
    a.classList = "delete-item float-right"
    a.setAttribute("href", "#");
    a.innerHTML = `<i class="fas fa-times"></i>`;

    li.appendChild(a);
    taskList.appendChild(li);
}


function addNewItem(e) {
    if (input.value === ``) {
        alert("boşluğu doldurmadınız");
        
    }



    creatItem(input.value);
    setItemToLS(input.value);



    input.value = "";






    e.preventDefault();
}





function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("silmek istediğinize emin misiniz")) {
            
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorge(e.target.parentElement.parentElement.textContent)
        }
    }
    e.preventDefault();
}




function deleteTodoFromStorge(deletetodo) {
    let todos = getItemsFormLS();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}





function deleteAllItems(e) {
    if (confirm("tüm elemanlar silmek istediğinize emin misiniz"))
        if (e.target.className === "fas fa-times") {
            e.target.parentElement.parentElement.remove();
        }
    e.preventDefault();
}


function deleteAllItems(e) {
    if (confirm("tüm elemanlar silmek istediğinize emin misiniz")) {
       while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
       }
       localStorage.clear();
    }



    
}






