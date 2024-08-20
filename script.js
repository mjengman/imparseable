document.getElementById('analyze-btn').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const words = textInput.split(/\s+/).filter(word => word.length > 0);
    const sentences = textInput.split(/[.!?]+/).filter(sentence => sentence.length > 0);
    const stopWords = [
        'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as',
        'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot',
        'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
        'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
        'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d',
        'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more',
        'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought',
        'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should',
        'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
        'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through',
        'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were',
        'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom',
        'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your',
        'yours', 'yourself', 'yourselves'
    ];
    const stopWordSet = new Set(stopWords);

    // Basic metrics
    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const characterCount = textInput.replace(/\s/g, '').length;
    const avgWordLength = (characterCount / wordCount).toFixed(2);
    const avgSentenceLength = (wordCount / sentenceCount).toFixed(2);

    // Lexical Diversity
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    const lexicalDiversity = (uniqueWords.size / words.length).toFixed(2);

    // Stop Word Count
    const stopWordCount = words.filter(word => stopWordSet.has(word.toLowerCase())).length;

    // Keyword Frequency (excluding stop words)
    const wordFrequency = {};
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (!stopWordSet.has(lowerWord)) {
            wordFrequency[lowerWord] = (wordFrequency[lowerWord] || 0) + 1;
        }
    });

    const topKeywords = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word, count]) => `${word}: ${count}`)
        .join(', ');

    // N-gram Analysis (Bigrams, Trigrams, 4-grams)
    const bigrams = {};
    const trigrams = {};
    const fourGrams = {};

    for (let i = 0; i < words.length - 1; i++) {
        const bigram = `${words[i].toLowerCase()} ${words[i + 1].toLowerCase()}`;
        bigrams[bigram] = (bigrams[bigram] || 0) + 1;

        if (i < words.length - 2) {
            const trigram = `${words[i].toLowerCase()} ${words[i + 1].toLowerCase()} ${words[i + 2].toLowerCase()}`;
            trigrams[trigram] = (trigrams[trigram] || 0) + 1;
        }

        if (i < words.length - 3) {
            const fourGram = `${words[i].toLowerCase()} ${words[i + 1].toLowerCase()} ${words[i + 2].toLowerCase()} ${words[i + 3].toLowerCase()}`;
            fourGrams[fourGram] = (fourGrams[fourGram] || 0) + 1;
        }
    }

    const topBigrams = Object.entries(bigrams)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([bigram, count]) => `${bigram}: ${count}`)
        .join(', ');

    const topTrigrams = Object.entries(trigrams)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([trigram, count]) => `${trigram}: ${count}`)
        .join(', ');

    const topFourGrams = Object.entries(fourGrams)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([fourGram, count]) => `${fourGram}: ${count}`)
        .join(', ');

    // Display Basic Metrics
    document.getElementById('basic-metrics').innerHTML = `
        <span>Word Count: ${wordCount}</span>
        <span>Sentence Count: ${sentenceCount}</span>
        <span>Character Count: ${characterCount}</span>
        <span>Average Word Length: ${avgWordLength}</span>
        <span>Average Sentence Length: ${avgSentenceLength}</span>
    `;

    // Display Lexical & Syntactic Features
    document.getElementById('lexical-syntactic-features').innerHTML = `
        <span>Lexical Diversity: ${lexicalDiversity}</span>
        <span>Stop Word Count: ${stopWordCount}</span>
        <span>Top Keywords: ${topKeywords}</span>
        <span>Top Bigrams: ${topBigrams}</span>
        <span>Top Trigrams: ${topTrigrams}</span>
        <span>Top 4-grams: ${topFourGrams}</span>
    `;

    // Additional logic for other features can be implemented here

    // Clear input field after analysis
    // document.getElementById('text-input').value = '';
});
