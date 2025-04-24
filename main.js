let isDarkMode = false;
const editorEl = document.getElementsByClassName("editor");
const boldButton = document.getElementById("bold-button");
const container = document.getElementById("container");
const floatingBar = document.getElementById("actionbar");

// editorEl.empty(); 
// editorEl.setAttribute("placeholder", "Write something here...");

function toggleTheme() {
    if (isDarkMode === false) {
        document.querySelectorAll(".editor").forEach(e => e.classList.add("dark-mode"));
        document.querySelectorAll(".editor").forEach(e => e.classList.remove("light-mode"));
        document.getElementById("toggle-theme").classList.remove("dark-mode");
        document.getElementById("toggle-theme").classList.add("light-mode");
        document.querySelector("body").classList.add("dark-body");
        document.querySelector("body").classList.remove("light-body");
        isDarkMode = true;
    } else {
        document.querySelectorAll(".editor").forEach(e => e.classList.add("light-mode"));
        document.getElementById("toggle-theme").classList.remove("light-mode");
        document.getElementById("toggle-theme").classList.add("dark-mode");
        document.querySelectorAll(".editor").forEach(e => e.classList.remove("dark-mode"));
        document.querySelector("body").classList.add("light-body");
        document.querySelector("body").classList.remove("dark-body");
        isDarkMode = false;
    }
}

document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "d") {
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
    if ((event.metaKey || event.ctrlKey) && event.key === "b") {
        event.preventDefault();
        boldText();
    }
})

// italic event listener
document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "i") {
        event.preventDefault();
        italicText();
    }
})

// underline event listener
document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "u") {
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
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        addRow();
    }
})

document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "g") {
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

function showFloatingBar() {
    const selection = window.getSelection(); // Get the current selection object
    currentSelection = selection; // Store it

    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0); // Get the range of the selection
        const rect = range.getBoundingClientRect(); // Get position and size

        // Calculate position for the bar
        // Center horizontally above the selection
        // Adjust vertical position (-10) to be slightly above
        let top = window.scrollY + rect.top - floatingBar.offsetHeight + 20;
        let left = window.scrollX + rect.left + (rect.width / 2) - (floatingBar.offsetWidth / 2);

        // --- Boundary Checks ---
        // Prevent bar from going off the top of the viewport
        if (top < window.scrollY + 5) {
             top = window.scrollY + rect.bottom + 10; // Move below selection if too close to top
        }
         // Prevent bar from going off the left edge
        if (left < window.scrollX + 5) {
            left = window.scrollX + 5;
        }
        // Prevent bar from going off the right edge
        // Check against document width for potentially wide elements
        const docWidth = document.documentElement.scrollWidth;
        const barRightEdge = left + floatingBar.offsetWidth;
        if (barRightEdge > window.scrollX + window.innerWidth - 5) {
             left = window.scrollX + window.innerWidth - floatingBar.offsetWidth - 5;
        }
         // --- End Boundary Checks ---


        floatingBar.style.top = `${top}px`;
        floatingBar.style.left = `${left}px`;
        floatingBar.classList.add('visible'); // Use class to show

    } else {
        hideFloatingBar(); // Hide if no text is selected
    }
}

// Function to hide the floating bar
function hideFloatingBar() {
    currentSelection = null; // Clear stored selection
    floatingBar.classList.remove('visible'); // Use class to hide
}

// --- Event Listeners ---

// Use 'mouseup' to trigger check after selection is likely complete
document.addEventListener('mouseup', (event) => {
    // Small delay to ensure selection is registered and prevent conflict with button clicks
    setTimeout(() => {
        // Don't show bar if the click was inside the bar itself
         if (!floatingBar.contains(event.target)) {
            showFloatingBar();
         }
    }, 10);
});

// Hide the bar if the user clicks anywhere else on the page
document.addEventListener('mousedown', (event) => {
    // Check if the click is outside the floating bar
    if (!floatingBar.contains(event.target)) {
        // Check if there's text selected *before* hiding
        // This prevents hiding immediately if user is adjusting selection
        const selection = window.getSelection();
        if (selection && selection.isCollapsed) { // isCollapsed means no text selected or just a cursor
            hideFloatingBar();
        }
        // If text *is* selected, the 'mouseup' event will handle repositioning or hiding later.
    }
});

 // Hide if the window is resized
 window.addEventListener('resize', hideFloatingBar);
 // Hide if the user scrolls (can be annoying, enable if needed)
 // window.addEventListener('scroll', hideFloatingBar);
