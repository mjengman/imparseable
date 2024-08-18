document.getElementById('analyze-button').addEventListener('click', function() {
    const text = document.getElementById('text-input').value.toLowerCase().trim();

    // Calculate word count
    const wordsArray = text.split(/\s+/);
    const wordCount = wordsArray.length;

    // Calculate unique words and their frequencies
    const wordFrequency = {};
    wordsArray.forEach(word => {
        word = word.replace(/[^a-z0-9]/g, ''); // Remove punctuation for accurate counting
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
        topWordsElement.innerHTML += `<p>${index + 1}. ${word}: ${count} times</p>`;
    });

    // Log results for debugging
    console.log(`Word Count: ${wordCount}`);
    console.log(`Unique Word Count: ${uniqueWordCount}`);
    console.log(`Top 10 Words:`, sortedWords);
});
