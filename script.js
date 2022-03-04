//Selectors

const inputToDo = document.querySelector(".input-todo");
const buttonToDo = document.querySelector(".button-todo");
const itemTodoContainer = document.querySelector(".item-todo-container");
const clearAllButton = document.querySelector(".clear-all-container");

class CreateItemTodo {
  constructor() {}

  ui() {
    const itemTodo = document.createElement("div");
    const titleTodoItem = document.createElement("h1");
    const editTodoItem = document.createElement("i");
    const trashTodoItem = document.createElement("i");
    itemTodo.classList.add("item-todo");
    itemTodoContainer.appendChild(itemTodo);

    titleTodoItem.innerText = inputToDo.value;
    itemTodo.appendChild(titleTodoItem);
    editTodoItem.classList.add("fa-solid", "fa-pen-to-square");
    itemTodo.appendChild(editTodoItem);
    trashTodoItem.classList.add("fa-solid", "fa-trash");
    itemTodo.appendChild(trashTodoItem);
  }
}

const createItemTodo = new CreateItemTodo();

//Function

const buttonTodoHandler = (event) => {
  event.preventDefault();
  if (inputToDo.value !== "" && inputToDo.id != "2") {
    createItemTodo.ui();
    inputToDo.value = "";
  } else if (inputToDo.value !== "" && inputToDo.id == "2") {
    eventRefer.path[1].children[0].innerText = inputToDo.value;
    inputToDo.value = "";
  } else {
    console.log("hello");
  }

  const editTodoItemQuery = document.querySelectorAll(".fa-pen-to-square");
  const trashTodoItemQuery = document.querySelectorAll(".fa-trash");
  for (item of editTodoItemQuery) {
    item.addEventListener("click", (e) => {
      inputToDo.value = e.path[1].children[0].innerText;
      inputToDo.focus();
      inputToDo.id = "2";
      window.eventRefer = e;
    });
    inputToDo.id = "1";
  }

  for (item of trashTodoItemQuery) {
    item.addEventListener("click", (event) => {
      event.path[1].remove();
    });
  }
};

//EventListener

buttonToDo.addEventListener("click", buttonTodoHandler);

// observer

const observer = new MutationObserver((mutationsList, observer) => {
  clearAllButton.addEventListener("click", () => {
    for (const mutation of mutationsList) {
      for (item of mutation.addedNodes) {
        item.remove();
      }
    }
  });

  itemTodoContainer.children.length == "0"
    ? (clearAllButton.style.display = "none")
    : (clearAllButton.style.display = "flex");
});

observer.observe(itemTodoContainer, {
  attributes: true,
  childList: true,
  subtree: false,
});
