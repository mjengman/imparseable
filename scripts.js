document.getElementById("analyzeButton").addEventListener("click", function() {
    // Get the text input value
    const text = document.getElementById("textInput").value;

    // Count the words by splitting the text into an array of words and getting the length
    const wordCount = text.trim().split(/\s+/).length;

    // Update the word count in the DOM
    document.getElementById("wordCount").textContent = wordCount;

    // Generate the word cloud
    generateWordCloud(text);

    // Show the right section and adjust layout
    document.querySelector('.right-section').style.display = 'block';
    document.querySelector('.left-section').style.flex = '1';
    document.querySelector('.right-section').style.flex = '2';
});

function generateWordCloud(text) {
    const wordArray = text.trim().split(/\s+/);
    const wordFrequency = {};

    // Calculate word frequency
    wordArray.forEach(word => {
        word = word.toLowerCase();
        if (wordFrequency[word]) {
            wordFrequency[word]++;
        } else {
            wordFrequency[word] = 1;
        }
    });

    // Get the canvas element and its context
    const canvas = document.getElementById('wordCloud');
    const ctx = canvas.getContext('2d');

    // Clear previous word cloud
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set some basic styles
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";

    // Generate positions and sizes for the words
    const maxWords = 50;
    const words = Object.keys(wordFrequency).slice(0, maxWords).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

    // Initial position and radius for word placement
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = 20;

    words.forEach((word, index) => {
        const size = Math.max(20, wordFrequency[word] * 5);
        ctx.font = `${size}px Arial`;

        // Update position in a circular pattern
        x += Math.cos(index) * radius;
        y += Math.sin(index) * radius;

        // Draw the word on the canvas
        ctx.fillText(word, x, y);

        // Increase the radius for the next word
        radius += 10;
    });
}
