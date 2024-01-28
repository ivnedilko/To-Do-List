const todoDescriptionField = document.querySelector(".to_do_description");
const todoDateField = document.querySelector(".to_do_date-value");
const todoAddButton = document. querySelector(".to_do-add");
const todoPanel = document.querySelector(".to_do");

let toDoList = [];

let savedData = localStorage.getItem("todo");

if(savedData){
  toDoList = JSON.parse(savedData);
  showTodos();
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1; //January is 0!
  var year = date.getFullYear();

  if(day < 10) {
    day = '0' + day
  } 

  if(month < 10) {
    month = '0'+month
  } 

  return `${year}-${month}-${day}`;
}

let curdate = formatDate(new Date()); 
todoDateField.value = curdate;

todoAddButton.addEventListener('click', addTodo);

function addTodo(){
  if(!todoDescriptionField.value){
    return;
  }

  if(!todoDateField.value){
    return;
  }

  let newToDo = {
    todo: todoDescriptionField.value,
    date: todoDateField.value,
    checked: false,
    important: false
  };
  toDoList.push(newToDo);

  let todoDate = JSON.stringify(toDoList);
  localStorage.setItem("todo", todoDate);

  showTodos();

  todoDescriptionField.value = "";

  let curdate = formatDate(new Date()); 
  todoDateField.value = curdate;
}

function showTodos(){
  if(toDoList.length === 0){
    todoPanel.innerHTML = "";
    return;
  }

  let todosContent = "";

  toDoList.forEach(function(item, i){
    let todoItem = createTodoItem(item, i);
    todosContent += todoItem;
  });

  todoPanel.innerHTML = todosContent;
}

function createTodoItem(item, id) {
  let itemName = `item_${id}`;
  let formattedDate = formatDateToDisplay(item.date);
  return `
  <li>
    <input onclick="toggleTodo('${itemName}')" type='checkbox' id='${itemName}' class="to_do_checkbox" ${item.checked ? "checked" : ""}>
    <label for='${itemName}' class="to_do_item_text ${item.important ? "to_do_item_important" : ""}">
      <div class="to_do_item_date">${formattedDate}</div>  
      <span name="${itemName}">${item.todo}</span>
    </label>
    <button onclick="deleteToDo('${itemName}')" class="to_do_delete">X</button>
  </li>
  `;
}

function formatDateToDisplay(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString();
}

function toggleTodo(itemName){
  let forLabel = todoPanel.querySelector('[name='+ itemName +']');
  let valueLabel = forLabel.innerHTML;

  for(let i=0; i < toDoList.length; i++){
    let todoItem = toDoList[i]; 
    if(todoItem.todo === valueLabel){
      todoItem.checked = !todoItem.checked;
      console.log(todoItem);
      localStorage.setItem("todo", JSON.stringify(toDoList));
      break;
    }
  }
}

function deleteToDo(itemName){
  let forLabel = todoPanel.querySelector('[name='+ itemName +']');
  let valueLabel = forLabel.innerHTML;

  for(let i=0; i < toDoList.length; i++){
    let todoItem = toDoList[i]; 
    if(todoItem.todo === valueLabel){
      toDoList.splice(i, 1);
      showTodos();
      localStorage.setItem("todo", JSON.stringify(toDoList));
      break;
    }
  }
}

todoPanel.addEventListener("contextmenu", function(e){
  e.preventDefault();
  
  toDoList.forEach(function(item, i){
    if(item.todo === e.target.innerHTML){
      item.important = !item.important;
      showTodos();
      localStorage.setItem("todo", JSON.stringify(toDoList));
    }
  });
});

