function convertMarkdown() {
    let markdown = document.getElementById("markdown-input").value;

    // Convert images
    markdown = markdown.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img alt="$1" src="$2">'
    );

    // Convert links
    markdown = markdown.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2">$1</a>'
    );

    // Convert headings
    markdown = markdown.replace(
        /^[ \t]*### (.+)$/gm,
        "<h3>$1</h3>"
    );

    markdown = markdown.replace(
        /^[ \t]*## (.+)$/gm,
        "<h2>$1</h2>"
    );

    markdown = markdown.replace(
        /^[ \t]*# (.+)$/gm,
        "<h1>$1</h1>"
    );

    // Convert bold text
    markdown = markdown.replace(
        /\*\*(.+?)\*\*|__(.+?)__/g,
        "<strong>$1$2</strong>"
    );

    // Convert italic text
    markdown = markdown.replace(
        /\*(.+?)\*|_(.+?)_/g,
        "<em>$1$2</em>"
    );

    // Convert blockquotes
    markdown = markdown.replace(
        /^[ \t]*> (.+)$/gm,
        "<blockquote>$1</blockquote>"
    );

    return markdown.replace(/\n/g, "");
}

const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function updatePreview() {
    const convertedHTML = convertMarkdown();

    htmlOutput.textContent = convertedHTML;
    preview.innerHTML = convertedHTML;
}

// Update the output whenever the input changes
markdownInput.addEventListener("input", updatePreview);

// Initialize the converter
updatePreview();

// Handle dark and light mode
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

themeToggle.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");

    themeToggle.setAttribute("aria-pressed", String(isLightMode));

    if (isLightMode) {
        themeIcon.textContent = "☾";
        themeLabel.textContent = "Dark Mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
        themeIcon.textContent = "☀";
        themeLabel.textContent = "Light Mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
});
