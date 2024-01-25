const addMessage = document.querySelector(".message");
const addButton = document. querySelector(".add");
const todo = document.querySelector(".to_do");

let toDoList = [];

if(localStorage.getItem("todo")){
  toDoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

addButton.addEventListener('click', function(){
  if(!addMessage.value){
    return;
  }
  let newToDo = {
    todo: addMessage.value,
    checked: true,
    important: false
  };

  toDoList.push(newToDo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(toDoList));
  addMessage.value = "";
});

function displayMessages(){
  let displayMessage = "";
  if(toDoList.length === 0){
    todo.innerHTML = "";
  }
  toDoList.forEach(function(item, i){
    displayMessage += `
  <li>
    <input type='checkbox' id='item_${i}'>
    <label for='item_${i}' class="${item.important ? "important" : " "}">${item.todo}</label>
  </li>
  `;
    todo.innerHTML = displayMessage;
  })
}

todo.addEventListener('change', function(e){
  let idInput = e.target.getAttribute("id");
  let forLabel = todo.querySelector('[for='+ idInput +']');

  let valueLabel = forLabel.innerHTML;
  console.log("valueLabel:", valueLabel);

  toDoList.forEach(function(item){
    if(item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(toDoList));
    }
  });
});

todo.addEventListener("contextmenu", function(e){
  e.preventDefault();
  
  toDoList.forEach(function(item, i){
    if(item.todo === e.target.innerHTML){
      if(e.ctrlKey || e.metaKey){
        toDoList.splice(i, 1);
      }else{
        item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(toDoList));
    }
  });
});