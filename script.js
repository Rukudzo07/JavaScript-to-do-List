const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const exitButton = document.getElementById("exitButton");

let tasks = [];

/* =========================
   TASK COUNT
========================= */

function updateTaskCount() {
    const count = tasks.length;

    taskCount.textContent =
        `${count} ${count === 1 ? "task" : "tasks"}`;
}

/* =========================
   DISPLAY TASKS
========================= */

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        const listItem = document.createElement("li");

        listItem.className = "task";

        /* Task Name */

        const taskName = document.createElement("span");

        taskName.className = "task-name";

        taskName.textContent = task.name;

        /* Status */

        const status = document.createElement("select");

        status.className = "status";

        const options = [
            "To Do",
            "In Progress",
            "Completed"
        ];

        options.forEach(function (option) {

            const optionElement =
                document.createElement("option");

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

        /* Delete Button */

        const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            tasks.splice(index, 1);

            displayTasks();

        });

        /* Add Elements */

        listItem.appendChild(taskName);
        listItem.appendChild(status);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

/* =========================
   ADD TASK
========================= */

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

/* =========================
   ENTER KEY
========================= */

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTaskButton.click();

    }

});

/* =========================
   EXIT BUTTON
========================= */

exitButton.addEventListener("click", function () {

    const confirmExit =
        confirm("Are you sure you want to exit TaskFlow?");

    if (confirmExit) {

        document.querySelector(".app").innerHTML = `

            <div class="exit-screen">

                <div class="exit-icon-large">
                    ✓
                </div>

                <h1>TaskFlow Closed</h1>

                <p>
                    Thanks for using TaskFlow.
                </p>

                <button onclick="location.reload()">
                    Reopen TaskFlow
                </button>

            </div>

        `;
    }

});

/* =========================
   INITIAL DISPLAY
========================= */

displayTasks();
