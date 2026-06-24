let count = 0;
let isSecretVisible = true;

function changeMessage() {
  const message = document.getElementById("message");
  message.textContent = "我已经开始学习 JavaScript 了！";
}

function changeTitle() {
  const title = document.getElementById("title");
  title.textContent = "我正在学习前端";
}

function sayHello() {
  const nameInput = document.getElementById("nameInput");
  const helloResult = document.getElementById("helloResult");
  const name = nameInput.value.trim();

  if (name === "") {
    helloResult.textContent = "请先输入名字";
  } else {
    helloResult.textContent = "你好，" + name;
    count = count + 1;

    const helloCount = document.getElementById("helloCount");
    helloCount.textContent = "你已经打招呼 " + count + " 次";

    nameInput.value = "";
  }
}

function resetCount() {
  count = 0;

  const helloCount = document.getElementById("helloCount");
  helloCount.textContent = "你已经打招呼 0 次";
}

const nameInput = document.getElementById("nameInput");

nameInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sayHello();
  }
});

function toggleSecret() {
  const secretText = document.getElementById("secretText");
  const secretButton = document.getElementById("secretButton");

  if (isSecretVisible === true) {
    secretText.style.display = "none";
    secretButton.textContent = "显示文字";
    isSecretVisible = false;
  } else {
    secretText.style.display = "block";
    secretButton.textContent = "隐藏文字";
    isSecretVisible = true;
  }
}
function toggleColor() {
  const colorText = document.getElementById("colorText");
  colorText.classList.toggle("red-text");
}
function addStudyItem() {
  const studyInput = document.getElementById("studyInput");
  const studyList = document.getElementById("studyList");
  const text = studyInput.value.trim();

  if (text === "") {
    return;
  }

  const newItem = document.createElement("li");
  newItem.textContent = text + " ";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "删除";
  deleteButton.onclick = function() {
    newItem.remove();
  };

  newItem.appendChild(deleteButton);
  studyList.appendChild(newItem);
  studyInput.value = "";
}
