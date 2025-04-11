let isDarkMode = false;
const editorEl = document.getElementsByClassName("editor");
const boldButton = document.getElementById("bold-button");
const container = document.getElementById("container");

// editorEl.empty(); 
// editorEl.setAttribute("placeholder", "Write something here...");

function toggleTheme() {
    if (isDarkMode === false) {
        document.querySelectorAll(".editor").forEach(e => e.classList.add("dark-mode"));
        document.querySelectorAll(".editor").forEach(e => e.classList.remove("light-mode"));
        document.getElementById("toggle-theme").classList.remove("dark-mode");
        document.getElementById("toggle-theme").classList.add("light-mode");
        isDarkMode = true;
    } else {
        document.querySelectorAll(".editor").forEach(e => e.classList.add("light-mode"));
        document.getElementById("toggle-theme").classList.remove("light-mode");
        document.getElementById("toggle-theme").classList.add("dark-mode");
        document.querySelectorAll(".editor").forEach(e => e.classList.remove("dark-mode"));
        isDarkMode = false;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey && event.key === "d") {
        event.preventDefault();
        toggleTheme();
    }
});

// type styling
function boldText() {
    document.execCommand('bold', false, null);
    // editorEl.focus();
}

function italicText() {
    document.execCommand('italic', false, null);
    // editorEl.focus();
}

function underlineText() {
    document.execCommand("underline", false, null);
    // editorEl.focus();
}

// bold event lister
document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey && event.key === "b") {
        event.preventDefault();
        boldText();
    }
})

// italic event listener
document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey && event.key === "i") {
        event.preventDefault();
        italicText();
    }
})

// underline event listener
document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey && event.key === "u") {
        event.preventDefault();
        underlineText();
    }
})

let rowCount = 1;

function addRow() {
    let newDiv = document.createElement("div");
    container.appendChild(newDiv);
    newDiv.classList.add("editor", "shadow");
    if (isDarkMode === true) {
        newDiv.classList.add("dark-mode");
    } else {
        newDiv.classList.add("light-mode");
    }
    newDiv.contentEditable = true;
    newDiv.focus();
    newDiv.setAttribute("placeholder", "Write something...");
    rowCount += 1;
    newDiv.setAttribute("id", "div" + rowCount);
}

document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        addRow();
    }
})

document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey && event.key === "g") {
        event.preventDefault();
        toggleGrid();
    }
})

function toggleGrid() {
    if (container.classList.contains("grid-wrap")) {
        container.classList.remove("grid-wrap");
        container.classList.add("grid-stack");
        document.getElementById("grid-button").classList.add("dark-mode");
        document.getElementById("grid-button").classList.remove("light-mode");
    } else {
        container.classList.remove("grid-stack");
        container.classList.add("grid-wrap");
        document.getElementById("grid-button").classList.remove("dark-mode");
        document.getElementById("grid-button").classList.add("light-mode");
    }
}

// function deleteRow() {
//     if (document.getElementById("div" + rowCount).textContent === "" && document.getElementById("div" + rowCount) === document.activeElement) {
//             document.getElementById("div" + rowCount).remove();
//             rowCount -= 1;
//             document.getElementById("div" + rowCount).focus();
//     }
// }

function deleteRow() {
    let activeDiv = document.activeElement;
    if (activeDiv.textContent === "" && rowCount > 1) {
        nextDiv = activeDiv.previousElementSibling;
        activeDiv.remove();
        rowCount -= 1;
        nextDiv.focus();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        deleteRow();
    }
})

// add an event listener for backspace and trigger deleteRow() function

document.getElementById("editor").focus();