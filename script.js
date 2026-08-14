const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {
    const task = taskInput.value.trim();

    if (task === "") {
        return;
    }

    const listItem = document.createElement("li");
    listItem.textContent = task;

    listItem.addEventListener("click", function () {
        listItem.classList.toggle("completed");
    });

    taskList.appendChild(listItem);

    taskInput.value = "";
});
