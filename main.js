let isDarkMode = false;
const editorEl = document.getElementsByClassName("editor");
const boldButton = document.getElementById("bold-button");
const container = document.getElementById("container");

function toggleTheme() {
    if (isDarkMode === false) {
        document.querySelectorAll(".editor").forEach(e => e.classList.add("dark-mode"));
        document.querySelectorAll(".editor").forEach(e => e.classList.remove("light-mode"));
        isDarkMode = true;
    } else {
        document.querySelectorAll(".editor").forEach(e => e.classList.add("light-mode"));
        document.querySelectorAll(".editor").forEach(e => e.classList.remove("dark-mode"));
        isDarkMode = false;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.key === "d") {
        event.preventDefault();
        toggleTheme();
    }
});


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
    if (event.metaKey && event.key === "b") {
        event.preventDefault();
        boldText();
    }
})

// italic event listener
document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.key === "i") {
        event.preventDefault();
        italicText();
    }
})

// underline event listener
document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.key === "u") {
        event.preventDefault();
        underlineText();
    }
})

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
}

document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.key === "Enter") {
        event.preventDefault();
        addRow();
    }
})

