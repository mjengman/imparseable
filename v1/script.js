document.getElementById('analyze-button').addEventListener('click', function() {
    analyzeText();
});

function analyzeText() {
    const text = document.getElementById('text-input').value.toLowerCase().trim();
    const excludeTrivial = document.getElementById('exclude-trivial').checked;

    // Retrieve custom stop words from local storage or initialize an empty array
    let customStopWords = JSON.parse(localStorage.getItem('customStopWords')) || [];

    // Combine custom stop words with default trivial words
    const trivialWords = [
        'the', 'and', 'is', 'in', 'it', 'of', 'to', 'a', 'that', 'i', 'on', 'was', 'with',
        'as', 'for', 'at', 'by', 'an', 'be', 'this', 'have', 'from', 'or', 'but', 'not'
    ].concat(customStopWords);

    // Split text into words and filter out trivial words if checkbox is checked
    const wordsArray = text.split(/\s+/).filter(word => {
        word = word.replace(/[^a-z0-9]/g, ''); // Remove punctuation
        return excludeTrivial ? !trivialWords.includes(word) : true;
    });

    const wordCount = wordsArray.length;

    // Calculate unique words and their frequencies
    const wordFrequency = {};
    wordsArray.forEach(word => {
        if (word) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    const uniqueWordCount = Object.keys(wordFrequency).length;

    // Sort words by frequency and get the top 10
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Display results
    document.getElementById('word-count').innerText = wordCount;
    document.getElementById('unique-word-count').innerText = uniqueWordCount;
    
    const topWordsElement = document.getElementById('top-words');
    topWordsElement.innerHTML = ''; // Clear previous results
    sortedWords.forEach(([word, count], index) => {
        topWordsElement.innerHTML += `<p>${index + 1}. ${word}: ${count} times 
            <span class="add-to-stopwords" data-word="${word}" title="Add to stop words list">➕</span></p>`;
    });

    // Add event listeners to add words to stop words list
    document.querySelectorAll('.add-to-stopwords').forEach(element => {
        element.addEventListener('click', function() {
            const wordToAdd = this.getAttribute('data-word');
            if (!customStopWords.includes(wordToAdd)) {
                customStopWords.push(wordToAdd);
                localStorage.setItem('customStopWords', JSON.stringify(customStopWords));
                analyzeText(); // Re-run the analysis after adding the stop word
            }
        });
    });
}
