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
        <span class="tooltip" data-tooltip="Lexical diversity measures the variety of vocabulary used in the text. A higher value indicates more unique words, suggesting richer language.">
            Lexical Diversity: ${lexicalDiversity}
        </span>
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
});

document.getElementById('ai-analyze-btn').addEventListener('click', async function() {
    toggleAISection();
    
    const textInput = document.getElementById('text-input').value;
    const prompt = `Analyze the sentiment and emotion in the following text:\n\n${textInput}`;

    // Show the spinner
    document.getElementById('loading-indicator').style.display = 'block';

    try {
        const aiAnalysis = await callChatGPTAPI(prompt);
        
        // Display the AI analysis result
        document.getElementById('ai-analysis-output').innerHTML = `
            <p>${aiAnalysis}</p>
        `;
    } catch (error) {
        // Handle error (optional)
        document.getElementById('ai-analysis-output').innerHTML = `
            <p>Error processing your request. Please try again later.</p>
        `;
    } finally {
        // Hide the spinner after processing is complete
        document.getElementById('loading-indicator').style.display = 'none';
    }
});

async function callChatGPTAPI(prompt) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4", // You can change this to the model you're using
                messages: [{ role: "user", content: prompt }],
                max_tokens: 150, // Adjust based on how long you want the response to be
                temperature: 0.7 // Controls creativity; lower is more focused, higher is more creative
            })
        });

        const data = await response.json();
        if (response.ok) {
            return data.choices[0].message.content;
        } else {
            console.error('Error:', data);
            return "An error occurred while processing your request.";
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return "A network error occurred.";
    }
}

document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.closest('.result-category');
        const content = category.querySelector('.content');
        
        // Toggle the visibility of the content
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block'; // Show content
            this.textContent = '[-]'; // Change button text to indicate collapse
        } else {
            content.style.display = 'none'; // Hide content
            this.textContent = '[+]'; // Change button text to indicate expand
        }
    });
});

function toggleAISection() {
    const aiSection = document.querySelector('.result-category-ai');

    if (aiSection) {
        if (aiSection.style.display === 'none' || aiSection.style.display === '') {
            aiSection.style.display = 'block'; // Show the AI section
        } else {
            aiSection.style.display = 'none'; // Hide the AI section
        }
    }
}

const maxTokens = 6000;

function updateButtonState() {
    const textInput = document.getElementById('text-input').value.trim();
    const tokenCount = textInput.split(/\s+/).length; // Estimate token count by word count
    
    const aiAnalyzeBtn = document.getElementById('ai-analyze-btn');
    
    if (textInput.length === 0) {
        aiAnalyzeBtn.disabled = true;  // Disable the button
        aiAnalyzeBtn.style.backgroundColor = '#ccc'; // Change appearance when disabled
        aiAnalyzeBtn.title = 'Input cannot be empty'; // Update title attribute
    } else if (tokenCount > maxTokens) {
        aiAnalyzeBtn.disabled = true;  // Disable the button
        aiAnalyzeBtn.style.backgroundColor = '#ccc'; // Change appearance when disabled
        aiAnalyzeBtn.title = 'Input is too long to be processed'; // Update title attribute
    } else {
        aiAnalyzeBtn.disabled = false; // Enable the button
        aiAnalyzeBtn.style.backgroundColor = '#007bff'; // Restore original color
        aiAnalyzeBtn.title = ''; // Clear title
    }
}

document.getElementById('text-input').addEventListener('input', updateButtonState);
updateButtonState();
