const checkboxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".input-goal");
const errorLable = document.querySelector(".error-lable");
const progressValue = document.querySelector(".progress-value");
const progressLable = document.querySelector('.progress-lable');

const allQuotes = [
    'Raise the bar by completing your goals !',
    'Well begun is half done !!',
    'Just a step away, keep going !',
    'Whoa! You just complete all the goals, time to chill 😊',
    'Its another goal'
]

// We have to create a object for each input field so that  we can access the value later on in localStorage so that our data is stored in it

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
//this means if user uses it 1st time then  local storage will be null so we assign empty object to it otherwise we assign the last time value in the allGoals object.
// Now we have to add the value of name in above object in each input field so thats why we use forEach loop below  & then update input value allGoals[input.id].name .

/*//for progressive bar value: 
            // progressValue.style.width = '33.33%' 
            // Or 1st we have to find how many task is completed for that we have   to convert allGoals into array (for loop & then count) by value ()
Object.values(allGoals);
             //now we use filter() to find only completed value true in allGoals & then find the result array length
*/
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${completedGoalsCount/ inputFields.length * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/ ${inputFields.length} Completed`;

progressLable.innerText = allQuotes[completedGoalsCount]; //for update quotes with progress bar

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    //converting inputFields (nodeList into array for array operations)
    const goalInput = [...inputFields].every((input) => {
      // console.log(input.value);
      return input.value;
    });
    // console.log(goalInput);

    //Checking weather all input is filled or not. If filled the add class="Completed" if not don't add the class & give error
    //And progressValue  width
    if (goalInput) {
      checkbox.parentElement.classList.toggle("Completed");

      //for finding the check element in input via id  after clicking on green checkbox
      const inputId = checkbox.nextElementSibling.id;
      // console.log(inputId);
      allGoals[inputId].completed = !allGoals[inputId].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));

      /*// Also here : for progressive bar value: 
            // Or 1st we have to find how many task is completed for that we have   to convert allGoals into array (for loop & then count) by value ()
Object.values(allGoals);//now we use filter() to find only completed value true in allGoals & then find the result array length
*/
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${completedGoalsCount/ inputFields.length * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/ ${inputFields.length} Completed`;
      progressLable.innerText = allQuotes[completedGoalsCount]; //for update quotes with progress bar.
    } else {
      //Error showing
      // errorLable.style.display = 'block';
      // OR
      //via css adding a new class(show-error) to input
      errorLable.classList.add("show-error");
    }
  });
});
// console.log(inputFields);
//After reding the error if user want to add goals so we have to remove error than

inputFields.forEach((input) => {
    if(allGoals[input.id]){

        input.value = allGoals[input.id].name; // adding  value in input field from local storage.
        //now add class completed in parent of checked box so that if all input is field is done previously so it can show cross sign on input & then update it in localStorage after checking all goals is add in above checkbox event listener
        if (allGoals[input.id].completed) {
          input.parentElement.classList.add("Completed");
        }
    }


  input.addEventListener("focus", (e) => {
    errorLable.classList.remove("show-error");
  });

  //for every field we are creating an entry in our object(allGoals) and assigning value to it.

  input.addEventListener("input", (e) => {

    // by this we can't update the input if our goal is already completed.
    if (allGoals[input.id] && allGoals[input.id].completed) {
        input.value=allGoals[input.id].name;
        return
      }

    /*console.log(e.target);
        console.log(e.target.id);
        allGoals[e.target.id] = 'hello';
        console.log(allGoals);
        */
    // OR
    // console.log(input.id);
    // here we add hello in allGoals object for each id of input fields.
    // allGoals[input.id] = "hello";

    /*here we add input value(by user) in allGoals object for each id of input fields.
        allGoals[input.id] = input.value;
        console.log(allGoals);
        */

    // since we have to also pass task completed status  with every goal, so we have to pass another object inside of allGoals object with key name & completed
    // allGoals[input.id] = {
    //   name: input.value,
    //   completed: false,
    // }; //OR

    if(allGoals[input.id])
    {
    allGoals[input.id].name = input.value;
    }
    else
    {
        allGoals[input.id]  = {
            name: input.value,
            completed: false,
        }
    }
    //Now save allGoals object in LocalStorage
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
