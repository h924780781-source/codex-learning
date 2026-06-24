let count = 0;
let studyItems = [];
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
  const text = studyInput.value.trim();

  if (text === "") {
    return;
  }

  studyItems.push(text);
  saveStudyItems();
  addStudyItemToPage(text);

  studyInput.value = "";
}

function saveStudyItems() {
  localStorage.setItem("studyItems", JSON.stringify(studyItems));
}
function loadStudyItems() {
  const savedItems = localStorage.getItem("studyItems");

  if (savedItems === null) {
    return;
  }

  studyItems = JSON.parse(savedItems);

  for (const text of studyItems) {
    addStudyItemToPage(text);
  }
}
function addStudyItemToPage(text) {
  let currentText = text;
  const studyList = document.getElementById("studyList");

  const newItem = document.createElement("li");
  newItem.classList.add("study-item");

  const textSpan = document.createElement("span");
  textSpan.textContent = currentText + " ";

  const editButton = document.createElement("button");
  editButton.classList.add("delete-button");
  editButton.textContent = "编辑";
  editButton.onclick = function() {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;

  const saveButton = document.createElement("button");
  saveButton.classList.add("delete-button");
  saveButton.textContent = "保存";

  newItem.textContent = "";
  newItem.appendChild(editInput);
  newItem.appendChild(saveButton);

  saveButton.onclick = function() {
    const trimmedText = editInput.value.trim();

    if (trimmedText === "") {
      return;
    }

    studyItems = studyItems.map(function(item) {
      if (item === currentText) {
        return trimmedText;
      }

      return item;
    });

    currentText = trimmedText;
    saveStudyItems();

    textSpan.textContent = currentText + " ";
    newItem.textContent = "";
    newItem.appendChild(textSpan);
    newItem.appendChild(editButton);
    newItem.appendChild(deleteButton);
  };
};

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "删除";
  deleteButton.onclick = function() {
    newItem.remove();

    studyItems = studyItems.filter(function(item) {
      return item !== currentText;
    });

    saveStudyItems();
  };

  newItem.appendChild(textSpan);
  newItem.appendChild(editButton);
  newItem.appendChild(deleteButton);
  studyList.appendChild(newItem);
}
loadStudyItems();

function clearStudyItems() {
  studyItems = [];
  saveStudyItems();

  const studyItemElements = document.querySelectorAll(".study-item");

  for (const item of studyItemElements) {
    item.remove();
  }
}
