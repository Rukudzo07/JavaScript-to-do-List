const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = [];

function updateTaskCount() {
    const count = tasks.length;
    taskCount.textContent = `${count} ${count === 1 ? "task" : "tasks"}`;
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        const listItem = document.createElement("li");
        listItem.className = "task";

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.name;

        const status = document.createElement("select");
        status.className = "status";

        const options = ["To Do", "In Progress", "Completed"];

        options.forEach(function (option) {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;

            if (task.status === option) {
                optionElement.selected = true;
            }

            status.appendChild(optionElement);
        });

        status.addEventListener("change", function () {
            tasks[index].status = status.value;
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            displayTasks();
        });

        listItem.appendChild(taskName);
        listItem.appendChild(status);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

addTaskButton.addEventListener("click", function () {

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        return;
    }

    tasks.push({
        name: taskName,
        status: "To Do"
    });

    taskInput.value = "";

    displayTasks();
});

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

displayTasks();
