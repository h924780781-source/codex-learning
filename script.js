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

  helloResult.textContent = "你好，" + nameInput.value;
}