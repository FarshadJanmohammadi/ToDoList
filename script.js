//----Selectors----
const inputToDo = document.querySelector(".input-todo");
const buttonToDo = document.querySelector(".button-todo");
const itemTodoContainer = document.querySelector(".item-todo-container");
const clearAllButton = document.querySelector("#clear-all");
const clearAllContainer = document.querySelector(".clear-all-container");
const alertAndWarn = document.querySelector(".alert");
const footerElement = document.querySelector("footer");
const pageLoader = document.querySelector(".page-load");
const headerTitle = document.querySelector(".header-container h1");

//*----Function----*//

//CreateElement

const createItemTodo = () => {
  const htmlItem = `<div class="item-todo"><h1>${inputToDo.value}</h1><i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"></i></div>`;
  localStorage.setItem(new Date().getTime(), JSON.stringify({ element: htmlItem }));
  const keys = Object.keys(localStorage).sort((a, b) => a - b);
  const saved = JSON.parse(localStorage.getItem(keys[keys.length - 1]));
  itemTodoContainer.innerHTML += saved.element;
};

//Alert

const alert = (data) => {
  document.styleSheets[4].cssRules[12].style.visibility = "visible";
  alertAndWarn.innerText = data.massage;
  document.styleSheets[4].cssRules[12].style.color = data.color;
  document.styleSheets[4].cssRules[12].style.animationPlayState = "running";
  setTimeout(() => {
    document.styleSheets[4].cssRules[12].style.visibility = "hidden";
    document.styleSheets[4].cssRules[12].style.animationPlayState = "paused";
  }, 1000);
};

//Function EvetnListener

const buttonTodoHandler = (event) => {
  event.preventDefault();
  const avoidSpace = inputToDo.value.endsWith(" ") && inputToDo.value.startsWith(" ");
  if (inputToDo.value !== "" && inputToDo.id != "2" && !avoidSpace) {
    createItemTodo();
    inputToDo.value = "";
    alert({ color: "#27ae60", massage: "یک مورد به لیست کارها اضافه شد." });
  } else if (inputToDo.value !== "" && inputToDo.id == "2") {
    console.log(eventRefer);
    const keys = Object.keys(localStorage).sort((a, b) => a - b);
    for (item of keys) {
      const saved = JSON.parse(localStorage.getItem(item));
      if (saved.element.includes(eventRefer.target.parentElement.children[0].innerText)) {
        eventRefer.target.parentElement.children[0].innerText = inputToDo.value;
        localStorage.setItem(
          item,
          JSON.stringify({ element: eventRefer.target.parentElement.outerHTML })
        );
      }
    }

    inputToDo.value = "";
    alert({ color: "#27ae60", massage: "ویرایش با موفقیت انجام شد." });
  } else {
    inputToDo.value = "";
    alert({
      color: "#e74c3c",
      massage: "یک عنوان برای کار موردنظر وارد نمایید.",
    });
  }

  inputToDo.id = "1";
};

const DOMLoadedHanler = () => {
  setTimeout(() => {
    pageLoader.style.display = "none";
  }, 1200);
};

const focusHendler = () => {
  if (window.innerWidth < 800) {
    footerElement.style.display = "none";
  }
};

const blurHendler = () => {
  if (window.innerWidth < 800) {
    footerElement.style.display = "block";
  }
};

//*----EventListeners----*//
window.addEventListener("DOMContentLoaded", DOMLoadedHanler);
buttonToDo.addEventListener("click", buttonTodoHandler, false);
inputToDo.addEventListener("focus", focusHendler);
inputToDo.addEventListener("blur", blurHendler);
// window.addEventListener("orientationchange", orientedHandler);

//*----observer----*//
const observer = new MutationObserver((mutationsList, observer) => {
  const editTodoItemQuery = document.querySelectorAll(".fa-pen-to-square");
  const trashTodoItemQuery = document.querySelectorAll(".fa-trash");
  for (item of trashTodoItemQuery) {
    //EventsListener for Remove Item

    item.addEventListener("click", (event) => {
      const keys = Object.keys(localStorage);
      for (item of keys) {
        const saved = JSON.parse(localStorage.getItem(item));
        if (event.target.parentElement.outerHTML == saved.element) {
          localStorage.removeItem(item);
        }
      }
      event.target.parentElement.remove();

      alert({
        color: "#e74c3c",
        massage: "یک مورد از لیست کارها با موفقیت حذف شد.",
      });
    });
  }

  for (item of editTodoItemQuery) {
    //EventsListener for Edit

    item.addEventListener("click", (e) => {
      inputToDo.value = e.target.parentElement.children[0].innerText;
      inputToDo.focus();
      inputToDo.id = "2";
      window.eventRefer = e;
    });
  }

  for (const mutation of mutationsList) {
    clearAllButton.addEventListener("click", () => {
      for (item of mutation.addedNodes) {
        localStorage.clear();
        item.remove();
        alert({ color: "#e74c3c", massage: "تمامی موارد با موفقیت حذف شدند." });
        inputToDo.value = "";
      }
    });
  }

  itemTodoContainer.children.length == "0"
    ? (clearAllContainer.style.display = "none")
    : (clearAllContainer.style.display = "flex");
});

observer.observe(itemTodoContainer, {
  attributes: true,
  childList: true,
  subtree: false,
});

const keys = Object.keys(localStorage).sort((a, b) => a - b);
for (item of keys) {
  const saved = JSON.parse(localStorage.getItem(item));
  if (saved) {
    itemTodoContainer.innerHTML += saved.element;
  }
}
