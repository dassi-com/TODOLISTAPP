document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// CSS pour désactiver le bouton et la ligne barrée
const styles = `
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
    .strikethrough {
        text-decoration: line-through;
        color: grey;
    }
    input {
        outline: none;
        background-color: transparent;
        border: 1px solid lightgray; /* Bordure de 1px avec couleur lightgray */
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ADD A TASK
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("La tâche ne peut pas être vide !");
        addTaskBtn.classList.add("disabled"); // Ajouter la classe pour désactiver le bouton

        setTimeout(() => {
            addTaskBtn.classList.remove("disabled"); // Réactiver le bouton après 2 secondes
        }, 2000);
    } else {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = ""; // Réinitialiser l'input
    }
});

// Ajouter une tâche
function addTask(taskText) {
    const p = document.createElement("p");

    p.innerHTML = `
        <img src="Vector(1).png" width="20px" alt="">
        <span class="task-text" id="task">${taskText}</span>
        <div class="btn-section">
            <button class="edit-btn">
                <!-- Icône de l'édition -->
                <svg fill="white" width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path class="clr-i-solid clr-i-solid-path-1" d="M4.22,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13,32,28.84,16.22,20,7.4Z"></path>
                    <path class="clr-i-solid clr-i-solid-path-2" d="M33.82,8.32l-5.9-5.9a2.07,2.07,0,0,0-2.92,0L21.72,5.7l8.83,8.83,3.28-3.28A2.07,2.07,0,0,0,33.82,8.32Z"></path>
                </svg>
            </button>
            <img src="Vector.png" alt="" width="20px" class="delete-btn">
        </div>
    `;

    taskList.appendChild(p);

    // Ajouter les événements pour la suppression, la modification, et le barré
    p.querySelector(".delete-btn").addEventListener("click", () => {
        p.remove();
        removeTask(taskText);
    });

    p.querySelector(".edit-btn").addEventListener("click", () => {
        editTask(p, taskText);
    });

    // Ajout de l'événement pour barrer la tâche
    p.querySelector(".task-text").addEventListener("click", () => {
        toggleStrikeThrough(p);
    });
}

// Sauvegarder la tâche
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTask(task);
    });
}

// Supprimer la tâche du Local Storage
function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Modifier une tâche
function editTask(p, oldTaskText) {
    const span = p.querySelector(".task-text");
    const editBtn = p.querySelector(".edit-btn");

    // Remplace le texte par un input
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    p.replaceChild(input, span);

    // Changer le bouton "Modifier" en "Enregistrer"
    editBtn.innerHTML = `
        <span>
            <svg fill="white" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"/>
            </svg>
        </span>
    `;
    editBtn.classList.add("save-btn");

    editBtn.addEventListener("click", function () {
        saveEditedTask(p, oldTaskText, input.value);
    });
}

// Sauvegarder une tâche modifiée
function saveEditedTask(p, oldTaskText, newTaskText) {
    if (newTaskText.trim() === "") return; // Empêcher un champ vide

    // Mettre à jour l'affichage
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = newTaskText;
    p.replaceChild(span, p.querySelector("input"));

    // Remettre le bouton "Modifier"
    const editBtn = p.querySelector(".save-btn");
    editBtn.innerHTML = `
        <span>
            <svg fill="white" width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <path class="clr-i-solid clr-i-solid-path-1" d="M4.22,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13,32,28.84,16.22,20,7.4Z"></path>
                <path class="clr-i-solid clr-i-solid-path-2" d="M33.82,8.32l-5.9-5.9a2.07,2.07,0,0,0-2.92,0L21.72,5.7l8.83,8.83,3.28-3.28A2.07,2.07,0,0,0,33.82,8.32Z"></path>
            </svg>
        </span>
    `;
    editBtn.classList.remove("save-btn");

    editBtn.addEventListener("click", function () {
        editTask(p, newTaskText);
    });

    // Mettre à jour le Local Storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(oldTaskText);
    if (index !== -1) {
        tasks[index] = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Supprimer toutes les tâches
deleteAllBtn.addEventListener("click", () => {
    taskList.innerHTML = ""; // Vide l'affichage
    localStorage.removeItem("tasks"); // Supprime tout du Local Storage
});

// Fonction pour barrer la tâche
function toggleStrikeThrough(p) {
    const taskText = p.querySelector(".task-text");
    taskText.classList.toggle("strikethrough"); // Ajouter ou enlever la ligne barrée
}





//pour le block professionel

document.addEventListener("DOMContentLoaded", loadTasks2);

const taskInput2 = document.getElementById("taskInput2");
const addTaskBtn2 = document.getElementById("addTaskBtn2");
const taskList2 = document.getElementById("taskList2");
const deleteAllBtn2 = document.getElementById("deleteAllBtn2");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");

// CSS pour désactiver le bouton et la ligne barrée
const styles2 = `
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
    .strikethrough {
        text-decoration: line-through;
        color: grey;
    }
    input {
        outline: none;
        background-color: transparent;
        border: 1px solid lightgray;
    }
`;

const styleSheet2 = document.createElement("style");
styleSheet2.type = "text/css";
styleSheet2.innerText = styles2;
document.head.appendChild(styleSheet2);

// Ajouter un événement pour changer l'affichage des blocs
function toggleBlocks() {
    if (block1.style.display === "block") {
        block1.style.display = "none";
        block2.style.display = "block";
    } else {
        block1.style.display = "block";
        block2.style.display = "none";
    }
}

// ADD A TASK
addTaskBtn2.addEventListener("click", () => {
    const taskText2 = taskInput2.value.trim();

    if (taskText2 === "") {
        alert("La tâche ne peut pas être vide !");
        addTaskBtn2.classList.add("disabled");

        setTimeout(() => {
            addTaskBtn2.classList.remove("disabled");
        }, 2000);
    } else {
        addTask2(taskText2);
        saveTask2(taskText2);
        taskInput2.value = "";
    }
});

// Ajouter une tâche
function addTask2(taskText2) {
    const p2 = document.createElement("p");

    p2.innerHTML = `
        <img src="Vector(1).png" width="20px" alt="">
        <span class="task-text" id="task2">${taskText2}</span>
        <div class="btn-section">
            <button class="edit-btn" >
                <svg fill="white" width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path class="clr-i-solid clr-i-solid-path-1" d="M4.22,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13,32,28.84,16.22,20,7.4Z"></path>
                    <path class="clr-i-solid clr-i-solid-path-2" d="M33.82,8.32l-5.9-5.9a2.07,2.07,0,0,0-2.92,0L21.72,5.7l8.83,8.83,3.28-3.28A2.07,2.07,0,0,0,33.82,8.32Z"></path>
                </svg>
            </button>
            <img src="Vector.png" alt="" width="20px" class="delete-btn2">
        </div>
    `;

    taskList2.appendChild(p2);

    // Ajouter événements pour suppression, modification et barré
    p2.querySelector(".delete-btn2").addEventListener("click", () => {
        p2.remove();
        removeTask2(taskText2);
    });

    p2.querySelector(".edit-btn2").addEventListener("click", () => {
        editTask2(p2, taskText2);
    });

    p2.querySelector(".task-text").addEventListener("click", () => {
        toggleStrikeThrough2(p2);
    });
}

// Sauvegarder la tâche
function saveTask2(task2) {
    let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    tasks2.push(task2);
    localStorage.setItem("tasks2", JSON.stringify(tasks2));
}

// Charger les tâches
function loadTasks2() {
    let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    tasks2.forEach(task2 => {
        addTask2(task2);
    });
}

// Supprimer la tâche du Local Storage
function removeTask2(taskToRemove2) {
    let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    tasks2 = tasks2.filter(task => task !== taskToRemove2);
    localStorage.setItem("tasks2", JSON.stringify(tasks2));
}

// Modifier une tâche
function editTask2(p2, oldTaskText2) {
    const span2 = p2.querySelector(".task-text");
    const editBtn2 = p2.querySelector(".edit-btn2");

    const input2 = document.createElement("input");
    input2.type = "text";
    input2.value = span2.textContent;
    p2.replaceChild(input2, span2);

    editBtn2.innerHTML = `<span>
                             <svg fill="white" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                             <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"/>
                             </svg>
                         </span>`;
    editBtn2.classList.add("save-btn2");

    editBtn2.addEventListener("click", function () {
        saveEditedTask2(p2, oldTaskText2, input2.value);
    });
}

// Sauvegarder une tâche modifiée
function saveEditedTask2(p2, oldTaskText2, newTaskText2) {
    if (newTaskText2.trim() === "") return;

    const span2 = document.createElement("span");
    span2.className = "task-text";
    span2.textContent = newTaskText2;
    p2.replaceChild(span2, p2.querySelector("input"));

    const editBtn2 = p2.querySelector(".save-btn2");
    editBtn2.innerHTML = `<span>                <svg fill="white" width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                             <path class="clr-i-solid clr-i-solid-path-1" d="M4.22,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13,32,28.84,16.22,20,7.4Z"></path>
                            <path class="clr-i-solid clr-i-solid-path-2" d="M33.82,8.32l-5.9-5.9a2.07,2.07,0,0,0-2.92,0L21.72,5.7l8.83,8.83,3.28-3.28A2.07,2.07,0,0,0,33.82,8.32Z"></path>
                            </svg>
                           </span>`;
    editBtn2.classList.remove("save-btn2");

    editBtn2.addEventListener("click", function () {
        editTask2(p2, newTaskText2);
    });

    let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    const index2 = tasks2.indexOf(oldTaskText2);
    if (index2 !== -1) {
        tasks2[index2] = newTaskText2;
        localStorage.setItem("tasks2", JSON.stringify(tasks2));
    }
}

// Supprimer toutes les tâches
deleteAllBtn2.addEventListener("click", () => {
    taskList2.innerHTML = "";
    localStorage.removeItem("tasks2");
});

// Fonction pour barrer la tâche
function toggleStrikeThrough2(p2) {
    const taskText2 = p2.querySelector(".task-text");
    taskText2.classList.toggle("strikethrough");
}



document.addEventListener("DOMContentLoaded", function () {
    // Récupérer le dernier bloc affiché depuis le Local Storage
    const lastVisibleBlock = localStorage.getItem("visibleBlock") || "block1";
    toggleBlocks(lastVisibleBlock);
});

function toggleBlocks(activeBlock) {
    const block1 = document.getElementById("block1");
    const block2 = document.getElementById("block2");

    // Afficher le bloc sélectionné et cacher l'autre
    if (activeBlock === "block1") {
        block1.classList.remove("hidden");
        block2.classList.add("hidden");
    } else {
        block2.classList.remove("hidden");
        block1.classList.add("hidden");
    }

    // Sauvegarder l'état dans le Local Storage
    localStorage.setItem("visibleBlock", activeBlock);
}
