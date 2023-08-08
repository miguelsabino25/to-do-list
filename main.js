const item = document.getElementById("item");
const addItem = document.getElementById("addItem");
const result = document.getElementById("result");

function takeValue() {
  const itemValue = item.value;
  return itemValue;
}

function createElement(element) {
  return document.createElement(element);
}

function receiveValue(content) {
  const paragraph = createElement("p");
  paragraph.innerText = content;
  return paragraph;
}

function createClass(element, nameClass) {
  element.classList.add(nameClass);
}

function createImage(src) {
  const image = createElement("img");
  image.src = src;
  return image;
}

function addResult() {
  const inputValue = takeValue();

  if (inputValue.length === 0) {
    alert("Digite um valor");
    return;
  }

  const paragraph = receiveValue(inputValue);
  createClass(paragraph, "paragraphResult");

  const buttonCheck = createElement("button");
  const imageCheck = createImage(
    "https://img.icons8.com/material-outlined/24/000000/checked-checkbox.png"
  );
  buttonCheck.appendChild(imageCheck);
  createClass(buttonCheck, "buttonCheck");

  const buttonRemove = createElement("button");
  const imageRemove = createImage(
    "https://img.icons8.com/carbon-copy/100/000000/filled-trash.png"
  );
  buttonRemove.appendChild(imageRemove);
  createClass(buttonRemove, "buttonRemove");

  const span = createElement("span");
  span.appendChild(buttonCheck);
  span.appendChild(buttonRemove);

  paragraph.appendChild(span);

  result.appendChild(paragraph);

  buttonCheck.addEventListener("click", function () {
    createClass(paragraph, "completed");
    saveTasks();
  });

  buttonRemove.addEventListener("click", function () {
    paragraph.remove();
    saveTasks();
  });

  item.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(result.children).map((task) => task.outerHTML);
  localStorage.setItem("saveTasks", JSON.stringify(tasks));
}

addItem.addEventListener("click", addResult);

window.addEventListener("load", function () {
  const savedTasks = JSON.parse(localStorage.getItem("saveTasks"));

  if (savedTasks) {
    savedTasks.forEach(function (tasks) {
      const div = document.createElement("div");
      div.innerHTML = tasks;
      const paragraph = div.querySelector(".paragraphResult");

      if (paragraph) {
        const buttonCheck = paragraph.querySelector(".buttonCheck");
        const buttonRemove = paragraph.querySelector(".buttonRemove");

        buttonCheck.addEventListener("click", function () {
          createClass(paragraph, "completed");
          saveTasks();
        });

        buttonRemove.addEventListener("click", function () {
          paragraph.remove();
          saveTasks();
        });

        result.appendChild(paragraph);
      }
    });
  }
});
