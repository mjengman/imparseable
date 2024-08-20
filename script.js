document.getElementById('analyze-btn').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;

    // Normalize the text: remove punctuation and convert to lowercase
    const normalizedText = textInput.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
    
    const words = normalizedText.split(/\s+/).filter(word => word.length > 0);
    const sentences = textInput.split(/[.!?]+/).filter(sentence => sentence.length > 0);

    console.log("Normalized Words:", words);  // Debugging: Check the list of words after normalization

    const stopWordSet = new Set(stopWords);

    // Basic metrics
    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const characterCount = textInput.replace(/\s/g, '').length;
    const avgWordLength = (characterCount / wordCount).toFixed(2);
    const avgSentenceLength = (wordCount / sentenceCount).toFixed(2);

    // Lexical Diversity
    const uniqueWords = new Set(words);
    const lexicalDiversity = (uniqueWords.size / words.length).toFixed(2);

    // Stop Word Count
    const stopWordCount = words.filter(word => stopWordSet.has(word)).length;

    // Keyword Frequency (excluding stop words)
    const wordFrequency = {};
    words.forEach(word => {
        if (!stopWordSet.has(word)) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
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
        const bigram = `${words[i]} ${words[i + 1]}`;
        bigrams[bigram] = (bigrams[bigram] || 0) + 1;

        if (i < words.length - 2) {
            const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
            trigrams[trigram] = (trigrams[trigram] || 0) + 1;
        }

        if (i < words.length - 3) {
            const fourGram = `${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`;
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

    // Sentiment Analysis Enhancements

    let sentimentScore = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let emotionCounts = {
        joy: 0,
        trust: 0,
        fear: 0,
        surprise: 0,
        sadness: 0,
        disgust: 0,
        anger: 0,
        anticipation: 0
    };

    let polarityModifier = 1; // Default polarity modifier
    let negateNext = false; // Track if the next word should be negated

    words.forEach(word => {
        // Check for negation words
        if (negationWords.includes(word)) {
            negateNext = true;
            return;
        }
    
        // Check for intensifier words
        if (intensifierWords.includes(word)) {
            polarityModifier = 2;
            return;
        }
    
        // Apply negation if detected
        if (negateNext) {
            polarityModifier = -polarityModifier;
            negateNext = false;
        }
    
        // Check for positive or negative words
        if (positiveWords.includes(word)) {
            sentimentScore += polarityModifier; // Increase sentiment score
            positiveCount++; // Increment positive word count
        } else if (negativeWords.includes(word)) {
            sentimentScore -= polarityModifier; // Decrease sentiment score
            negativeCount++; // Increment negative word count
        }
    
        // Check for emotion words
        for (const [emotion, emotionWords] of Object.entries(emotions)) {
            if (emotionWords.includes(word)) {
                emotionCounts[emotion]++;
                break; // Break loop once an emotion match is found
            }
        }
    
        // Reset the polarity modifier after applying it
        polarityModifier = 1;
    });
    

    // Determine overall sentiment polarity
    const sentimentPolarity = sentimentScore > 0 ? 'Positive' : (sentimentScore < 0 ? 'Negative' : 'Neutral');
    // Determine sentiment intensity based on the magnitude of the score
    const sentimentIntensity = Math.abs(sentimentScore) > 5 ? 'Strong' : 'Moderate';

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

    // Display Sentiment and Emotion Analysis
    document.getElementById('sentiment-analysis').innerHTML = `
        <span>Sentiment Polarity: ${sentimentPolarity}</span>
        <span>Sentiment Intensity: ${sentimentIntensity}</span>
        <span>Positive Words: ${positiveCount}</span>
        <span>Negative Words: ${negativeCount}</span>
        <span>Joy Words: ${emotionCounts.joy}</span>
        <span>Trust Words: ${emotionCounts.trust}</span>
        <span>Fear Words: ${emotionCounts.fear}</span>
        <span>Surprise Words: ${emotionCounts.surprise}</span>
        <span>Sadness Words: ${emotionCounts.sadness}</span>
        <span>Disgust Words: ${emotionCounts.disgust}</span>
        <span>Anger Words: ${emotionCounts.anger}</span>
        <span>Anticipation Words: ${emotionCounts.anticipation}</span>
    `;


    // Clear input field after analysis
    // document.getElementById('text-input').value = '';
});
