// ...............
$(document).ready(function () {
  // localStorage.clear()
  // if user has a todo before print to screen 
  for (let i = 0; i < localStorage.length; i++) { // looping through the number of items stored

    let key = localStorage.key(i); // key to access the value 
    let StoredObject = JSON.parse(localStorage.getItem(key)) ; // getting stored object with the corresponding key
      
    let StoredButtonState = Object.keys(StoredObject)  // getting the key value inside the object to know th button state
    let StoredTodoValue = StoredObject[StoredButtonState] // getting the value inside the object using the it's key value or button state

    printTodoToScreen(StoredTodoValue, StoredButtonState[0]) // sending it to the function to print

  }

  $('#InputBox').on('keydown', (event) => {

    // when the enter key is pressed
    if (event.key == 'Enter') {

      const value = $('#InputBox').val(); //getting the value of input from user
      $('#InputBox').val('');  // clearing input area

      if (value || value === " ") {
     
        printTodoToScreen(value); // printing todo to screen with the value inside the user input
        activeTodos(); // showing user all active todos  
        todoStorage(); // updating stored todos  

      }

    }
  })

});
// ..............

// function to print todo to screen
function printTodoToScreen(TodoText, extra) {
  
  let lineThruText = extra == 'tick' ? 'line-thru' : null ; // checking the todo has been ticked then line text thru if yes
  let number_oF_todos = $('#items section').length; // getting number of items that user has

  // todo info to append 
  let todos = `<section class="task">
  <div class="task-information">
  <button class="material-symbols-outlined circle active-task ${extra}" onclick="tick(this)"
    style=" width: 20px; height: 20px; font-size: 12px;">
    check
  </button>
  <span class="${lineThruText}">${TodoText}</span>
  </div>
  <button id="delete-button" onclick="deleteTodos(this)" class="material-icons"
          style=" font: size 30px; color:inherit;">
          close
      </button>
 </section>`;

  $('#items').prepend(todos); // appending/prepending todo
  $('#item-left').html(`${number_oF_todos + 1} items left`); // changing how many items are left

}

// function to m
function todoStorage() {
  let indexNumber = 0; 

  $('.task-information').each((index, element) => {

      let SettingButtonState =  $(element).find('button'); // finding the button inside task-information
      const spanText =  $(element).find('span').text(); //  finding the span element inside task-information and getting the text inside

      SettingButtonState = $(SettingButtonState).hasClass('tick') ? 'tick' : 'noclass' ; // checking the todo has been ticked as completed or not using the button
      localStorage.setItem( [indexNumber += 1], JSON.stringify({[SettingButtonState] : spanText}) ); // saving/updating the saved todo 
    } )

}

// function to mark a todo completed
function tick(me) {
  $(me).toggleClass('tick ');
  $(me).next('span').toggleClass('line-thru ');
  localStorage.clear() // clearing the the stored todo
  todoStorage()
}

//  function for icon change
function toggleIcon(current) {

  const id = $(current).attr("id"); // getting id of the pressed button
  const mode = 'mode-Light';

  $(current).fadeOut(900, () => {

    // if the id is what was pressed fade in the other button
    if (id == mode) {

      $('#mode-Dark').fadeIn();

    } else {

      $('#mode-Light').fadeIn();

    }
  })

}

// function to delete todos
function deleteTodos(me) {

  const remove = $(me).parent('.task'); // getting parent element
  $(remove).remove();

  allTodos(); // sending user to the all todos section 
  localStorage.clear() // clearing the the stored todo
  todoStorage(); // updating stored todos 
}

// function to clear all todos
function clearCompletedTodos() {

  let number_of_completed_todos = $('#items .tick').length; // getting number of completed todos that user has

  // if user has any todos 
  if (number_of_completed_todos > 0) {

    const remove = $('.tick').parents('.task'); // getting all completed child element of tasks
    $(remove).remove();

    let number_of_todos = $('#items section').length; // getting number of items that user has
    $('#item-left').html(`${number_of_todos} items left`); // updating how many items are left

    activeTodos() // showing user active todos after clearing completed todos
    localStorage.clear() // clearing the the stored todo
    todoStorage() // updating stored todos
  }

}

//  function for options color change
function changeOptionColor(optionPressed) {

  // removing the colors 
  $('.all').attr("class", 'all');
  $('.active').attr("class", 'active');
  $('.completed').attr("class", 'completed');

  // setting the color with the value the funtion was called with
  $(`.${optionPressed}`).attr("class", `${optionPressed} options-color`);


}

//  function for showing all todos user has
function allTodos() {

  let number_of_todos = $('#items section').length; // getting number of items that user has

  // showing all todos
  $('.tick').parents('.task').show();
  $('.active-task').parents('.task').show();

  $('#item-left').html(`${number_of_todos} items`); // updating how many items are left

  changeOptionColor('all'); // setting the color for the current option 

}

//  function for showing active todos user has
function activeTodos() {

  let number_of_active_todos = $('#items .active-task').length; // getting number of active todos that user has
  let number_of_completed_todos = $('#items .tick').length; // getting number of completed todos that user has

  $('.active-task').parents('.task').show(); // showing active todos
  $('.tick').parents('.task').hide(); // hiding completed todos

  $('#item-left').html(`${number_of_active_todos - number_of_completed_todos} items left`); // updating how many items are left

  changeOptionColor('active'); // setting the color for the current option 
}

//  function for showing completed todos user has
function completedTodos() {

  let number_of_completed_todos = $('#items .tick').length; // getting number of completed todos that user has

  $('.active-task').parents('.task').hide(); // hiding active todos
  $('.tick').parents('.task').show(); // showing completed todos

  $('#item-left').html(`${number_of_completed_todos} items completed`); // updating how many items are left

  changeOptionColor('completed'); // setting the color for the current option 

}

function toggleBackground() {

  $('body').toggleClass('body-dark');
  $('header').toggleClass('header-dark ');
  $('.container').toggleClass('container-dark');
  $('.items').toggleClass('items-dark ');
  $('button').toggleClass('buttom-dark ');
}
