let count = 0;
let studyItems = [];
let isSecretVisible = true;

// 小游戏状态
let boxX = 0;
let boxY = 0;
let score = 0;
let bestScore = 0;
let hasHitTarget = false;
let targetX = 240;
let targetY = 30;
let timeLeft = 30;
let isGameStarted = false;
let isGameOver = false;
let timerId = null;

// 基础按钮练习
function changeMessage() {
  const message = document.getElementById("message");
  message.textContent = "我已经开始学习 JavaScript 了！";
}

function changeTitle() {
  const title = document.getElementById("title");
  title.textContent = "我正在学习前端";
}

// 打招呼练习
function sayHello() {
  const nameInput = document.getElementById("nameInput");
  const helloResult = document.getElementById("helloResult");
  const name = nameInput.value.trim();

  if (name === "") {
  helloResult.textContent = "请先输入名字";
  nameInput.classList.add("input-error");
} else {
  nameInput.classList.remove("input-error");
  helloResult.textContent = "你好，" + name;
  count = count + 1;

    const helloCount = document.getElementById("helloCount");
    helloCount.textContent = "你已经打招呼 " + count + " 次";

    nameInput.value = "";
  }
}

function resetGreetingCount() {
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

// 显示、隐藏、样式切换练习
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

// 动画和小游戏练习
function toggleMoveBox() {
  const moveBox = document.getElementById("moveBox");
  moveBox.classList.toggle("moved");
}

function toggleAutoMoveBox() {
  const moveBox = document.getElementById("moveBox");
  const autoMoveButton = document.getElementById("autoMoveButton");

  moveBox.classList.toggle("auto-moving");

  if (moveBox.classList.contains("auto-moving")) {
    autoMoveButton.textContent = "停止自动移动";
  } else {
    autoMoveButton.textContent = "开始自动移动";
  }
}

function updateBoxPosition() {
  const moveBox = document.getElementById("moveBox");
  moveBox.style.transform = "translate(" + boxX + "px, " + boxY + "px)";

  checkHitTarget();
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    boxX = boxX + 20;
  }

  if (event.key === "ArrowLeft") {
    boxX = boxX - 20;
  }

  if (event.key === "ArrowDown") {
    boxY = boxY + 20;
  }

  if (event.key === "ArrowUp") {
    boxY = boxY - 20;
  }

  if (boxX < 0) {
    boxX = 0;
  }

  if (boxX > 220) {
    boxX = 220;
  }

  if (boxY < 0) {
    boxY = 0;
  }

  if (boxY > 40) {
    boxY = 40;
  }

  updateBoxPosition();
});

function updateTargetPosition() {
  const targetBox = document.getElementById("targetBox");
  targetBox.style.left = targetX + "px";
  targetBox.style.top = targetY + "px";
}

function startGame() {
  if (isGameStarted === true) {
    return;
  }

  isGameStarted = true;
  isGameOver = false;

const gameStatus = document.getElementById("gameStatus");
const startButton = document.getElementById("startButton");

gameStatus.textContent = "游戏进行中。";
startButton.disabled = true;
startButton.textContent = "游戏进行中";

startTimer();
}

function startTimer() {
  const timeText = document.getElementById("timeText");
  const gameStatus = document.getElementById("gameStatus");

  timerId = setInterval(function() {
    timeLeft = timeLeft - 1;
    timeText.textContent = "剩余时间：" + timeLeft + " 秒";

  if (timeLeft <= 0) {
  clearInterval(timerId);
  isGameOver = true;
  gameStatus.textContent = "游戏结束，你的最终分数是 " + score + "。";

  if (score > bestScore) {
    bestScore = score;

    const bestScoreText = document.getElementById("bestScoreText");
    bestScoreText.textContent = "最高分：" + bestScore;

    saveBestScore();
  }

  const startButton = document.getElementById("startButton");
  startButton.textContent = "游戏已结束";
}
  }, 1000);
}

function saveBestScore() {
  localStorage.setItem("bestScore", bestScore);
}

function loadBestScore() {
  const savedBestScore = localStorage.getItem("bestScore");

  if (savedBestScore === null) {
    return;
  }

  bestScore = Number(savedBestScore);

  const bestScoreText = document.getElementById("bestScoreText");
  bestScoreText.textContent = "最高分：" + bestScore;
}

function restartGame() {
  clearInterval(timerId);

  score = 0;
  timeLeft = 30;
  isGameStarted = true;
  isGameOver = false;
  hasHitTarget = false;
  boxX = 0;
  boxY = 0;

  const scoreText = document.getElementById("scoreText");
  const timeText = document.getElementById("timeText");
  const gameStatus = document.getElementById("gameStatus");
  const hitMessage = document.getElementById("hitMessage");
  const startButton = document.getElementById("startButton");

  scoreText.textContent = "分数：0";
  timeText.textContent = "剩余时间：30 秒";
  gameStatus.textContent = "游戏进行中。";
  hitMessage.textContent = "还没有碰到目标。";
  startButton.disabled = true;
  startButton.textContent = "游戏进行中";

  updateBoxPosition();
  moveTargetToRandomPosition();
  startTimer();
}

function moveTargetToRandomPosition() {
  targetX = Math.floor(Math.random() * 220);
  targetY = Math.floor(Math.random() * 40);

  updateTargetPosition();
}

function checkHitTarget() {
if (isGameStarted === false || isGameOver === true) {
  return;
}

  const hitMessage = document.getElementById("hitMessage");
  const scoreText = document.getElementById("scoreText");

  if (
    boxX < targetX + 40 &&
    boxX + 60 > targetX &&
    boxY < targetY + 40 &&
    boxY + 60 > targetY
  ) {
    hitMessage.textContent = "成功碰到目标！";

    if (hasHitTarget === false) {
      score = score + 1;
      scoreText.textContent = "分数：" + score;
      hasHitTarget = true;
      moveTargetToRandomPosition();
    }
  } else {
    hitMessage.textContent = "还没有碰到目标。";
    hasHitTarget = false;
  }
}

// 学习内容列表练习
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

  const textSpan = createTextSpan(currentText);

  const deleteButton = createDeleteButton(newItem, function() {
    return currentText;
  });

  const editButton = createEditButton(newItem, textSpan, deleteButton, function() {
    return currentText;
  }, function(newText) {
    currentText = newText;
  });

  newItem.appendChild(textSpan);
  newItem.appendChild(editButton);
  newItem.appendChild(deleteButton);
  studyList.appendChild(newItem);
}

function createTextSpan(text) {
  const textSpan = document.createElement("span");
  textSpan.textContent = text + " ";

  return textSpan;
}

function createEditButton(newItem, textSpan, deleteButton, getCurrentText, setCurrentText) {
  const editButton = document.createElement("button");
  editButton.classList.add("delete-button");
  editButton.textContent = "编辑";

  editButton.onclick = function() {
    const currentText = getCurrentText();

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

      setCurrentText(trimmedText);
      saveStudyItems();

      textSpan.textContent = trimmedText + " ";
      newItem.textContent = "";
      newItem.appendChild(textSpan);
      newItem.appendChild(editButton);
      newItem.appendChild(deleteButton);
    };
  };

  return editButton;
}

function createDeleteButton(newItem, getCurrentText) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "删除";

  deleteButton.onclick = function() {
    newItem.remove();

    studyItems = studyItems.filter(function(item) {
      return item !== getCurrentText();
    });

    saveStudyItems();
  };

  return deleteButton;
}

function clearStudyItems() {
  studyItems = [];
  saveStudyItems();

  const studyItemElements = document.querySelectorAll(".study-item");

  for (const item of studyItemElements) {
    item.remove();
  }
}

// 页面打开时恢复浏览器本地保存的学习内容
loadStudyItems();
loadBestScore();
updateTargetPosition();

window.addEventListener("scroll", function () {
  const backTopButton = document.getElementById("backTopButton");

  if (window.scrollY > 200) {
    backTopButton.classList.add("show");
  } else {
    backTopButton.classList.remove("show");
  }
});
document.getElementById("nameInput").addEventListener("input", function () {
  this.classList.remove("input-error");
});