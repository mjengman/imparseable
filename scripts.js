document.getElementById("analyzeButton").addEventListener("click", function() {
    // Get the text input value
    const text = document.getElementById("textInput").value;

    // Count the words by splitting the text into an array of words and getting the length
    const wordCount = text.trim().split(/\s+/).length;

    // Update the word count in the DOM
    document.getElementById("wordCount").textContent = wordCount;
});
