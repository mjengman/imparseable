// Define positive words
const positiveWords = [
    'admirable', 'affectionate', 'amazing', 'awesome', 'blessed', 'bright', 'brilliant', 
    'charming', 'cheerful', 'compassionate', 'content', 'correct', 'delightful', 'encouraging', 
    'energetic', 'enthusiastic', 'excellent', 'fabulous', 'fantastic', 'favorable', 
    'fortunate', 'glad', 'good', 'grateful', 'great', 'happy', 'harmonious', 'heavenly', 
    'hope', 'hopeful', 'incredible', 'inspiring', 'joy', 'joyful', 'love', 'lovely', 
    'marvelous', 'miraculous', 'optimistic', 'peaceful', 'playful', 'pleased', 
    'positive', 'powerful', 'radiant', 'refreshing', 'rejoicing', 'remarkable', 
    'rewarding', 'satisfied', 'spectacular', 'strong', 'successful', 'superior', 
    'terrific', 'thrilled', 'triumphant', 'valuable', 'vibrant', 'warm', 'welcoming', 
    'wonderful', 'accomplished', 'affable', 'agreeable', 'amused', 'animated', 'appealing', 
    'appreciated', 'articulate', 'assured', 'attractive', 'balanced', 'beneficial', 
    'blissful', 'breathtaking', 'buoyant', 'calm', 'charitable', 'classy', 'coherent', 
    'comely', 'composed', 'confident', 'considerate', 'contented', 'convincing', 
    'courteous', 'creative', 'dazzling', 'decisive', 'dedicated', 'delicate', 
    'dependable', 'dignified', 'diligent', 'disciplined', 'eager', 'ecstatic', 
    'effervescent', 'efficient', 'elated', 'empathetic', 'encouraged', 'enlightened', 
    'enterprising', 'enthralling', 'exquisite', 'extraordinary', 'fascinated', 
    'flourishing', 'focused', 'forgiving', 'friendly', 'fun-loving', 'generous', 
    'genial', 'genuine', 'giddy', 'glorious', 'graceful', 'gracious', 'gregarious', 
    'helpful', 'honest', 'hopeful', 'hospitable', 'humble', 'humorous', 'idealistic', 
    'illustrious', 'imaginative', 'impressive', 'independent', 'ingenious', 'innovative', 
    'insightful', 'instructive', 'integral', 'intelligent', 'invigorated', 'jubilant', 
    'laudable', 'liberating', 'lively', 'logical', 'lovable', 'loving', 'lustrous', 
    'magnificent', 'meritorious', 'mirthful', 'motivated', 'noble', 'nurturing', 
    'optimistic', 'organized', 'passionate', 'patient', 'perceptive', 'persevering', 
    'persistent', 'philanthropic', 'playful', 'poised', 'polite', 'positive', 
    'productive', 'progressive', 'punctual', 'purposeful', 'radiant', 'rational', 
    'reflective', 'reliable', 'relieved', 'resilient', 'resolute', 'resourceful', 
    'respectful', 'responsible', 'responsive', 'romantic', 'safe', 'secure', 'sincere', 
    'skilled', 'sociable', 'spirited', 'steadfast', 'stoic', 'stunning', 'supportive', 
    'sympathetic', 'thoughtful', 'tolerant', 'tranquil', 'trustworthy', 'truthful', 
    'unfaltering', 'uplifted', 'versatile', 'victorious', 'vivacious', 'warmhearted', 
    'wise', 'worthy', 'youthful', 'zestful', 'affluent', 'aligned', 'altruistic', 'amiable',
    'balanced', 'bountiful', 'caring', 'collaborative', 'diligent', 'dynamic', 'elevated',
    'exceptional', 'faithful', 'fervent', 'flourishing', 'fruitful', 'gallant', 'genuine',
    'harmonious', 'honorable', 'illuminating', 'industrious', 'influential', 'jovial',
    'keen', 'loyal', 'meaningful', 'mindful', 'nurturing', 'passionate', 'peaceful',
    'perceptive', 'persevering', 'plentiful', 'proactive', 'radiant', 'refined', 'reliable',
    'relaxed', 'resilient', 'resolute', 'respectful', 'savvy', 'serene', 'spirited',
    'steadfast', 'sturdy', 'sublime', 'sympathetic', 'thoughtful', 'thriving', 'tranquil',
    'trustworthy', 'uplifting', 'vibrant', 'vivacious', 'wholesome', 'wise', 'zealous'
];

// Define negative words
const negativeWords = [
    'abrasive', 'aggravating', 'agitated', 'alarming', 'aloof', 'angry', 'angst-ridden', 
    'annoyed', 'apathetic', 'appalling', 'apprehensive', 'arrogant', 'ashamed', 
    'atrocious', 'atrophied', 'awkward', 'awful', 'bad', 'bad-tempered', 'belligerent', 
    'belittled', 'betrayed', 'bewildered', 'bitter', 'bleak', 'blighted', 'bored', 
    'callous', 'chaotic', 'clumsy', 'cold-hearted', 'combative', 'confused', 
    'contemptuous', 'corrupt', 'cowardly', 'cruel', 'critical', 'cross', 'crushed', 
    'damaged', 'deceitful', 'dejected', 'delinquent', 'deluded', 'demeaned', 
    'demented', 'demoralized', 'depressed', 'desolate', 'desperate', 'despicable', 
    'despondent', 'destitute', 'deteriorating', 'detestable', 'detested', 'devious', 
    'discarded', 'disconnected', 'discontented', 'discouraged', 'discriminatory', 
    'disgrace', 'disgraceful', 'disgusted', 'disheartened', 'disillusioned', 
    'disoriented', 'disparaging', 'displeased', 'disruptive', 'distant', 'distressed', 
    'distraught', 'disturbed', 'distrustful', 'domineering', 'doomed', 'drained', 
    'dreary', 'drunk', 'dysfunctional', 'eccentric', 'embarrassed', 'embittered', 
    'emotionless', 'excluded', 'exhausted', 'faithless', 'faltering', 'fearful', 
    'feeble', 'fidgety', 'flawed', 'foolish', 'forgotten', 'forsaken', 'fragile', 
    'frightened', 'frustrated', 'furious', 'ghastly', 'gloomy', 'glum', 'grief', 
    'grim', 'gross', 'gruesome', 'guilty', 'hard-hearted', 'harsh', 'hate', 'hateful', 
    'heartbroken', 'heartless', 'helpless', 'hesitant', 'hopeless', 'horrendous', 
    'horrible', 'horrific', 'horrified', 'hostile', 'humiliated', 'hurtful', 
    'ignorant', 'illogical', 'impoverished', 'impulsive', 'inadequate', 'incompetent', 
    'inconsiderate', 'indecisive', 'indifferent', 'indignant', 'ineffective', 
    'inept', 'inferior', 'inflexible', 'inhibited', 'insecure', 'insensitive', 
    'insincere', 'insipid', 'insolent', 'insulting', 'intolerant', 'irate', 
    'irresponsible', 'irritable', 'isolated', 'jealous', 'joyless', 'judgmental', 
    'lazy', 'lethargic', 'lifeless', 'lonely', 'lost', 'lousy', 'malicious', 
    'manipulative', 'marginalized', 'mean', 'melancholy', 'menacing', 'miserable', 
    'misguided', 'mistreated', 'moody', 'morose', 'mournful', 'negligent', 'nervous', 
    'offended', 'offensive', 'oppressed', 'outraged', 'overwhelmed', 'painful', 
    'paranoid', 'pathetic', 'pessimistic', 'pitiful', 'poor', 'powerless', 
    'prejudiced', 'regretful', 'remorseful', 'resentful', 'restless', 'revengeful', 
    'sad', 'sarcastic', 'scared', 'scorned', 'selfish', 'shameful', 'shocked', 
    'sickened', 'skeptical', 'sorrowful', 'spiteful', 'stressed', 'stubborn', 
    'stupid', 'submissive', 'suffering', 'terrible', 'terrified', 'threatened', 
    'timid', 'tormented', 'tragic', 'troubled', 'unbearable', 'uncertain', 
    'uncomfortable', 'undermined', 'undervalued', 'unfortunate', 'ungrateful', 
    'unhappy', 'unimportant', 'unjust', 'unloved', 'unpleasant', 'unrealistic', 
    'unreliable', 'unwanted', 'unworthy', 'upset', 'vague', 'vicious', 'victimized', 
    'vile', 'vindictive', 'violent', 'weak', 'weary', 'wicked', 'worried', 'worthless', 
    'wretched', 'wrong'
];

// Define negation words
const negationWords = [
    'not', 'no', 'never', 'none', 'cannot', 'isn\'t', 'aren\'t', 'wasn\'t', 'weren\'t', 'doesn\'t', 'don\'t', 'didn\'t'
];

// Define intensifier words
const intensifierWords = [
    'very', 'really', 'extremely', 'hugely', 'awfully', 'truly', 'deeply', 'remarkably', 'incredibly', 'immensely', 'absolutely'
];

// Define stop words
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

// Define emotions with associated words
const emotions = {
    joy: ["happy", "joyful", "content", "delighted", "pleased", "cheerful", "gleeful", "ecstatic", "thrilled", "elated", "satisfied", "radiant"],
    trust: ["trusting", "faithful", "reliable", "confident", "dependable", "secure", "assured", "loyal", "respect", "optimistic", "hopeful"],
    fear: ["afraid", "scared", "fearful", "terrified", "worried", "nervous", "anxious", "panicked", "alarmed", "frightened", "apprehensive"],
    surprise: ["surprised", "astonished", "amazed", "startled", "shocked", "stunned", "flabbergasted", "bewildered", "confused", "dumbfounded"],
    sadness: ["sad", "unhappy", "sorrowful", "mournful", "depressed", "downcast", "melancholy", "gloomy", "heartbroken", "grieving", "disheartened"],
    disgust: ["disgusted", "repulsed", "revolted", "nauseated", "detested", "loathsome", "abhorrent", "horrified", "sickened", "offended", "appalled"],
    anger: ["angry", "mad", "furious", "irate", "enraged", "annoyed", "resentful", "irritated", "infuriated", "outraged", "hostile"],
    anticipation: ["anticipating", "expecting", "hopeful", "eager", "excited", "enthusiastic", "optimistic", "apprehensive", "anxious", "awaiting", "curious"]
};
