// Stories and games data for the tribal education portal

export const stories = [
  {
    id: 1,
    title: 'The Wise Old Tree',
    titleTelugu: 'ముదురు చెట్టు',
    category: 'nature',
    categoryTelugu: 'ప్రకృతి',
    difficulty: 'beginner',
    duration: '5-7 minutes',
    durationTelugu: '5-7 నిమిషాలు',
    description: 'A story about an ancient tree that teaches children about nature and conservation.',
    descriptionTelugu: 'ప్రకృతి మరియు సంరక్షణ గురించి పిల్లలకు నేర్పించే పురాతన చెట్టు గురించి కథ.',
    content: {
      english: `Once upon a time, in a small tribal village, there stood a magnificent banyan tree. This tree was so old that even the village elders couldn't remember when it was planted. The children of the village loved to play under its shade.

One day, a young boy named Raju noticed that the tree was looking sad. "Why are you sad, dear tree?" he asked.

The tree replied, "I am sad because people are cutting down my friends in the forest. Without trees, there will be no clean air, no shade, and no fruits for the animals."

Raju decided to help. He gathered all the children in the village and together they planted many new trees. They also made a promise to protect all trees in their village.

From that day on, the village became greener and more beautiful. The wise old tree was happy again, and all the children learned the importance of protecting nature.`,
      telugu: `ఒకప్పుడు, ఒక చిన్న గిరిజన గ్రామంలో, ఒక అద్భుతమైన మర్రిచెట్టు ఉండేది. ఈ చెట్టు చాలా పురాతనమైనది, గ్రామంలోని పెద్దలు కూడా దానిని ఎప్పుడు నాటారో గుర్తుపెట్టలేరు. గ్రామంలోని పిల్లలు దాని నీడలో ఆడుకోవడం ఇష్టపడేవారు.

ఒక రోజు, రాజు అనే చిన్న అబ్బాయి చెట్టు విచారంగా కనిపిస్తున్నట్లు గమనించాడు. "అమ్మా చెట్టూ, మీరు ఎందుకు విచారంగా ఉన్నారు?" అని అడిగాడు.

చెట్టు జవాబిచ్చింది: "అడవిలోని నా స్నేహితులను కోస్తున్నందుకు నేను విచారంగా ఉన్నాను. చెట్లు లేకపోతే, శుభ్రమైన గాలి, నీడ, మరియు జంతువులకు పండ్లు ఉండవు."

రాజు సహాయం చేయాలని నిర్ణయించుకున్నాడు. అతను గ్రామంలోని అన్ని పిల్లలను సేకరించి, కలిసి చాలా కొత్త చెట్లను నాటారు. వారు తమ గ్రామంలోని అన్ని చెట్లను రక్షించుకోవడానికి వాగ్దానం చేశారు.

ఆ రోజు నుండి, గ్రామం మరింత ఆకుపచ్చగా మరియు అందంగా మారింది. ముదురు చెట్టు మళ్లీ సంతోషంగా ఉంది, మరియు అన్ని పిల్లలు ప్రకృతిని రక్షించడం యొక్క ప్రాముఖ్యతను నేర్చుకున్నారు.`
    },
    audioUrl: '/audio/stories/wise-old-tree.mp3',
    imageUrl: '/images/stories/wise-old-tree.jpg',
    questions: [
      {
        question: 'Why was the tree sad?',
        questionTelugu: 'చెట్టు ఎందుకు విచారంగా ఉంది?',
        options: [
          { text: 'Because it was old', textTelugu: 'ఎందుకంటే అది పురాతనమైనది' },
          { text: 'Because people were cutting trees', textTelugu: 'ఎందుకంటే ప్రజలు చెట్లను కోస్తున్నారు' },
          { text: 'Because it had no fruits', textTelugu: 'ఎందుకంటే దానికి పండ్లు లేవు' }
        ],
        correctAnswer: 1
      }
    ],
    xpReward: 50,
    tags: ['nature', 'conservation', 'community', 'children']
  },
  {
    id: 2,
    title: 'The Magic Seeds',
    titleTelugu: 'మాయా విత్తనాలు',
    category: 'agriculture',
    categoryTelugu: 'వ్యవసాయం',
    difficulty: 'intermediate',
    duration: '8-10 minutes',
    durationTelugu: '8-10 నిమిషాలు',
    description: 'A tale about a farmer who discovers magical seeds that teach about sustainable farming.',
    descriptionTelugu: 'స్థిరమైన వ్యవసాయం గురించి నేర్పించే మాయా విత్తనాలను కనుగొన్న రైతు గురించి కథ.',
    content: {
      english: `In a remote tribal village, there lived a farmer named Lakshmi. She was known for her wisdom and kindness. One day, while working in her field, she found a small bag of seeds that seemed to glow with a mysterious light.

Curious, she planted one seed in her garden. To her amazement, the plant grew overnight and produced the most delicious fruits she had ever tasted. But more importantly, the plant taught her about the importance of caring for the soil and using natural methods.

Lakshmi shared her discovery with the entire village. She taught everyone how to make compost, use natural pesticides, and rotate crops. The village became a model of sustainable farming, and everyone's harvests improved.

The magic wasn't in the seeds themselves, but in the knowledge of how to work with nature rather than against it.`,
      telugu: `ఒక దూరమైన గిరిజన గ్రామంలో, లక్ష్మి అనే రైతు ఉండేది. ఆమె తన జ్ఞానం మరియు దయ కోసం ప్రసిద్ధి చెందింది. ఒక రోజు, తన పొలంలో పని చేస్తున్నప్పుడు, ఆమె రహస్యమైన కాంతితో మెరుస్తున్నట్లు కనిపించే విత్తనాల చిన్న సంచిని కనుగొన్నది.

ఆసక్తితో, ఆమె తన తోటలో ఒక విత్తనాన్ని నాటింది. ఆమె ఆశ్చర్యానికి, మొక్క రాత్రిపూట పెరిగింది మరియు ఆమె ఎప్పుడూ రుచిచూసిన అత్యంత రుచికరమైన పండ్లను ఉత్పత్తి చేసింది. కానీ మరింత ముఖ్యమైనది, మొక్క ఆమెకు నేలను సంరక్షించడం మరియు సహజ పద్ధతులను ఉపయోగించడం యొక్క ప్రాముఖ్యతను నేర్పించింది.

లక్ష్మి తన కనుగొన్నదాన్ని మొత్తం గ్రామంతో పంచుకుంది. ఆమె అందరికీ కంపోస్ట్ తయారు చేయడం, సహజ కీటకనాశకాలను ఉపయోగించడం, మరియు పంటలను తిరగించడం ఎలా నేర్పించింది. గ్రామం స్థిరమైన వ్యవసాయం యొక్క నమూనా అయింది, మరియు అందరి పంటలు మెరుగుపడ్డాయి.

మాయా విత్తనాలలో కాదు, కానీ ప్రకృతికి వ్యతిరేకంగా కాకుండా దానితో పని చేయడం యొక్క జ్ఞానంలో ఉంది.`
    },
    audioUrl: '/audio/stories/magic-seeds.mp3',
    imageUrl: '/images/stories/magic-seeds.jpg',
    questions: [
      {
        question: 'What did Lakshmi teach the village?',
        questionTelugu: 'లక్ష్మి గ్రామానికి ఏమి నేర్పించింది?',
        options: [
          { text: 'How to make money', textTelugu: 'ఎలా డబ్బు సంపాదించాలి' },
          { text: 'Sustainable farming methods', textTelugu: 'స్థిరమైన వ్యవసాయ పద్ధతులు' },
          { text: 'How to build houses', textTelugu: 'ఎలా ఇళ్లు నిర్మించాలి' }
        ],
        correctAnswer: 1
      }
    ],
    xpReward: 75,
    tags: ['agriculture', 'sustainability', 'nature', 'community']
  }
];

export const miniGames = [
  {
    id: 1,
    title: 'Telugu Alphabet Match',
    titleTelugu: 'తెలుగు అక్షరాల మ్యాచ్',
    category: 'literacy',
    categoryTelugu: 'అక్షరాస్యత',
    difficulty: 'beginner',
    duration: '3-5 minutes',
    durationTelugu: '3-5 నిమిషాలు',
    description: 'Match Telugu letters with their English equivalents and sounds.',
    descriptionTelugu: 'తెలుగు అక్షరాలను వాటి ఆంగ్ల సమానాలతో మరియు ధ్వనులతో జతపరచండి.',
    instructions: {
      english: 'Drag the Telugu letters to match with their English equivalents. Listen to the pronunciation and try to remember the sounds.',
      telugu: 'తెలుగు అక్షరాలను వాటి ఆంగ్ల సమానాలతో జతపరచడానికి లాగండి. ఉచ్చారణను వినండి మరియు ధ్వనులను గుర్తుంచుకోవడానికి ప్రయత్నించండి.'
    },
    gameData: {
      pairs: [
        { telugu: 'అ', english: 'A', sound: '/audio/letters/a.mp3' },
        { telugu: 'ఆ', english: 'AA', sound: '/audio/letters/aa.mp3' },
        { telugu: 'ఇ', english: 'I', sound: '/audio/letters/i.mp3' },
        { telugu: 'ఈ', english: 'II', sound: '/audio/letters/ii.mp3' },
        { telugu: 'ఉ', english: 'U', sound: '/audio/letters/u.mp3' },
        { telugu: 'ఊ', english: 'UU', sound: '/audio/letters/uu.mp3' }
      ]
    },
    xpReward: 30,
    tags: ['alphabet', 'pronunciation', 'matching']
  },
  {
    id: 2,
    title: 'Number Counting Game',
    titleTelugu: 'సంఖ్యల లెక్కింపు ఆట',
    category: 'mathematics',
    categoryTelugu: 'గణితం',
    difficulty: 'beginner',
    duration: '5-7 minutes',
    durationTelugu: '5-7 నిమిషాలు',
    description: 'Learn to count from 1 to 20 in both Telugu and English.',
    descriptionTelugu: 'తెలుగు మరియు ఆంగ్లంలో 1 నుండి 20 వరకు లెక్కించడం నేర్చుకోండి.',
    instructions: {
      english: 'Count the objects and select the correct number. Practice counting in both languages.',
      telugu: 'వస్తువులను లెక్కించండి మరియు సరైన సంఖ్యను ఎంచుకోండి. రెండు భాషలలో లెక్కించడం అభ్యసించండి.'
    },
    gameData: {
      numbers: [
        { number: 1, telugu: 'ఒకటి', english: 'One', objects: ['🍎'] },
        { number: 2, telugu: 'రెండు', english: 'Two', objects: ['🍎', '🍌'] },
        { number: 3, telugu: 'మూడు', english: 'Three', objects: ['🍎', '🍌', '🍊'] },
        { number: 4, telugu: 'నాలుగు', english: 'Four', objects: ['🍎', '🍌', '🍊', '🍇'] },
        { number: 5, telugu: 'అయిదు', english: 'Five', objects: ['🍎', '🍌', '🍊', '🍇', '🥭'] }
      ]
    },
    xpReward: 40,
    tags: ['numbers', 'counting', 'bilingual']
  },
  {
    id: 3,
    title: 'Word Building Challenge',
    titleTelugu: 'పద నిర్మాణ సవాలు',
    category: 'literacy',
    categoryTelugu: 'అక్షరాస్యత',
    difficulty: 'intermediate',
    duration: '7-10 minutes',
    durationTelugu: '7-10 నిమిషాలు',
    description: 'Build words using Telugu letters and learn their meanings.',
    descriptionTelugu: 'తెలుగు అక్షరాలను ఉపయోగించి పదాలను నిర్మించండి మరియు వాటి అర్థాలను నేర్చుకోండి.',
    instructions: {
      english: 'Arrange the letters to form meaningful words. Each word has a picture clue to help you.',
      telugu: 'అర్థవంతమైన పదాలను ఏర్పరచడానికి అక్షరాలను అమర్చండి. ప్రతి పదానికి మీకు సహాయం చేయడానికి చిత్ర సూచన ఉంది.'
    },
    gameData: {
      words: [
        {
          word: 'అమ్మ',
          meaning: 'Mother',
          meaningTelugu: 'తల్లి',
          letters: ['అ', 'మ', 'మ'],
          image: '/images/words/mother.jpg',
          audio: '/audio/words/amma.mp3'
        },
        {
          word: 'నాన్న',
          meaning: 'Father',
          meaningTelugu: 'తండ్రి',
          letters: ['న', 'న', 'న'],
          image: '/images/words/father.jpg',
          audio: '/audio/words/nanna.mp3'
        },
        {
          word: 'ఇల్లు',
          meaning: 'House',
          meaningTelugu: 'గృహం',
          letters: ['ఇ', 'ల', 'ల', 'ు'],
          image: '/images/words/house.jpg',
          audio: '/audio/words/illu.mp3'
        }
      ]
    },
    xpReward: 60,
    tags: ['words', 'spelling', 'vocabulary']
  }
];

export const getStoriesByCategory = (category) => {
  return stories.filter(story => story.category === category);
};

export const getGamesByCategory = (category) => {
  return miniGames.filter(game => game.category === category);
};

export const getStoriesByDifficulty = (difficulty) => {
  return stories.filter(story => story.difficulty === difficulty);
};

export const getGamesByDifficulty = (difficulty) => {
  return miniGames.filter(game => game.difficulty === difficulty);
};

export const searchStories = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return stories.filter(story => 
    story.title.toLowerCase().includes(lowercaseQuery) ||
    story.titleTelugu.includes(query) ||
    story.description.toLowerCase().includes(lowercaseQuery) ||
    story.descriptionTelugu.includes(query) ||
    story.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const searchGames = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return miniGames.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.titleTelugu.includes(query) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.descriptionTelugu.includes(query) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export default {
  stories,
  miniGames,
  getStoriesByCategory,
  getGamesByCategory,
  getStoriesByDifficulty,
  getGamesByDifficulty,
  searchStories,
  searchGames
};
