// -------------------FOCUS------------------------
let inputVal = $(".form__input-todo");
let uncompletedList = $(".todo-uncompleted__list");
let completedList = $(".todo-completed__list");
let todos, todosCompleted, editBtnList, completedBtnList;

getValueArrays();

// ----------------------ADD EVENT-------------------------
$(".btn--add").click(addTodo);

//----------------------LIST FUNCTION------------------------
// Get todo array in localStorage
function getValueArrays() {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    todosCompleted = JSON.parse(localStorage.getItem("todosCompleted")) || [];
    displayNoTodo();
    render(todosCompleted, "completed");
    render(todos, "uncompleted");
}

//-----------ADD TODO-------------
function addTodo(e) {
    e.preventDefault();
    if (inputVal.val() == "") {
        alert("Khong duoc de trong");
    } else {
        const todo = {
            id: Date.now(),
            content: inputVal.val(),
        };
        todos.push(todo);
        inputVal.val("");
        localStorage.setItem("todos", JSON.stringify(todos));
        displayNoTodo();
        render(todos, "uncompleted");
    }
}

// ---------------RENDER TODO-------------------
function render(todos, state) {
    if (state === "uncompleted") {
        let todoItem = todos.map((todo) => {
            return `<li class='todo-uncompleted__item' id=${todo.id}>
                        <span>${todo.content}</span>
                        <button class='btn btn--completed'>
                            <i class="fas fa-check"></i>
                        </button> 
                        <button class='btn btn--delete'>
                            <i class="far fa-trash-alt"></i>
                        </button>       
                    </li>`;
        }).join("");
        uncompletedList.html(todoItem);
    } else if (state === "completed") {
        let todoItem = todos.map((todo) => {
            return `<li class='todo-completed__item' id=${todo.id}>
                        <span>${todo.content}</span>
                        <button class='btn btn--delete'>
                            <i class="far fa-trash-alt"></i>
                        </button>       
                    </li>`;
        }).join("");
        completedList.html(todoItem);
    }

    // Update and event handlers 
    completedBtnList = $('.btn--completed')
    moveToCompleted();

    $('.todo-uncompleted__list  .btn--edit').click(function () {
        editTodo($(this).parent().attr('id'), 'uncompleted')
    })
    $(".todo-uncompleted__list .btn--delete").click(function () {
        deleteTodo($(this).parent().attr("id"), "uncompleted");
    });
    $(".todo-completed__list .btn--delete").click(function () {
        deleteTodo($(this).parent().attr("id"), "completed");
    });
}

// ----------HIDE OR SHOW WHEN LIST DOESN'T HAVE ANY TODO--------
function displayNoTodo() {
    todos.length == 0
        ? $(".todo-uncompleted__notify").show()
        : $(".todo-uncompleted__notify").hide();
    todosCompleted.length == 0
        ? $(".todo-completed__notify").show()
        : $(".todo-completed__notify").hide();
}


function deleteTodo(id, state) {
    if (state == "uncompleted") {
        todos = todos.filter((todo) => todo.id != id);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayNoTodo();
        render(todos, "uncompleted");
    } else {
        todosCompleted = todosCompleted.filter((todo) => todo.id != id);
        localStorage.setItem("todosCompleted", JSON.stringify(todosCompleted));
        displayNoTodo();
        render(todosCompleted, "completed");
    }
}

function moveToCompleted() {
    Array.from(completedBtnList).forEach((item, index) => {
        $(item).click(function () {
            todosCompleted.push(todos[index]);
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('todosCompleted', JSON.stringify(todosCompleted))
            displayNoTodo();
            render(todosCompleted, "completed");
            render(todos, "uncompleted");
        })
    })
}

