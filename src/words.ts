import { WordInfo } from './types';

/**
 * ============================================================================
 * 1. TARGET WORDS (คลังคำศัพท์เป้าหมายสำหรับสุ่มทายและเฉลย: 45 คำพื้นฐานที่พบบ่อย)
 * ============================================================================
 */
export const TARGET_WORDS: WordInfo[] = [
  { word: 'APPLE', meaningTh: 'แอปเปิ้ล', pos: 'Noun', phonetic: '/ˈæp.əl/', example: 'An apple a day keeps the doctor away.' },
  { word: 'BEACH', meaningTh: 'ชายหาด, ทะเล', pos: 'Noun', phonetic: '/biːtʃ/', example: 'We walked along the sunny beach.' },
  { word: 'BREAD', meaningTh: 'ขนมปัง', pos: 'Noun', phonetic: '/bred/', example: 'Fresh bread smells wonderful in the morning.' },
  { word: 'CHAIR', meaningTh: 'เก้าอี้', pos: 'Noun', phonetic: '/tʃeər/', example: 'Please have a seat on this chair.' },
  { word: 'CLOUD', meaningTh: 'ก้อนเมฆ, เมฆ', pos: 'Noun', phonetic: '/klaʊd/', example: 'Fluffy white clouds drifted in the sky.' },
  { word: 'DANCE', meaningTh: 'เต้นรำ, เต้น', pos: 'Verb/Noun', phonetic: '/dɑːns/', example: 'They love to dance to good music.' },
  { word: 'DREAM', meaningTh: 'ความฝัน, ฝัน', pos: 'Noun/Verb', phonetic: '/driːm/', example: 'Follow your passion and chase your dream.' },
  { word: 'EAGLE', meaningTh: 'นกอินทรี', pos: 'Noun', phonetic: '/ˈiː.ɡəl/', example: 'The eagle soared high over the mountains.' },
  { word: 'EARTH', meaningTh: 'โลก (ดาวเคราะห์), แผ่นดิน', pos: 'Noun', phonetic: '/ɜːrθ/', example: 'Let us protect our beautiful planet Earth.' },
  { word: 'FLAME', meaningTh: 'เปลวไฟ, เปลวเพลิง', pos: 'Noun', phonetic: '/fleɪm/', example: 'The candle flame flickered softly.' },
  { word: 'FRUIT', meaningTh: 'ผลไม้', pos: 'Noun', phonetic: '/fruːt/', example: 'Eating fresh fruit is good for health.' },
  { word: 'GRAPE', meaningTh: 'องุ่น', pos: 'Noun', phonetic: '/ɡreɪp/', example: 'Sweet green grapes picked from the vine.' },
  { word: 'GREEN', meaningTh: 'สีเขียว', pos: 'Noun/Adj', phonetic: '/ɡriːn/', example: 'The forest looks lush and green.' },
  { word: 'HAPPY', meaningTh: 'มีความสุข, ร่าเริง', pos: 'Adj', phonetic: '/ˈhæp.i/', example: 'Wishing you a very happy day!' },
  { word: 'HEART', meaningTh: 'หัวใจ, ดวงใจ', pos: 'Noun', phonetic: '/hɑːrt/', example: 'Listen to your heart when deciding.' },
  { word: 'HOUSE', meaningTh: 'บ้าน, ที่อยู่อาศัย', pos: 'Noun', phonetic: '/haʊs/', example: 'They built a warm and cozy house.' },
  { word: 'IMAGE', meaningTh: 'รูปภาพ, ภาพลักษณ์', pos: 'Noun', phonetic: '/ˈɪm.ɪdʒ/', example: 'Capture this memorable image.' },
  { word: 'JUICE', meaningTh: 'น้ำผลไม้', pos: 'Noun', phonetic: '/dʒuːs/', example: 'A glass of chilled orange juice.' },
  { word: 'KNIFE', meaningTh: 'มีด', pos: 'Noun', phonetic: '/naɪf/', example: 'Use a sharp knife to slice the cake.' },
  { word: 'LEMON', meaningTh: 'มะนาวเหลือง, เลมอน', pos: 'Noun', phonetic: '/ˈlem.ən/', example: 'Add fresh lemon to hot tea.' },
  { word: 'LIGHT', meaningTh: 'แสงสว่าง, สว่าง', pos: 'Noun/Adj', phonetic: '/laɪt/', example: 'Morning light beamed through the window.' },
  { word: 'LUCKY', meaningTh: 'โชคดี, ดวงดี', pos: 'Adj', phonetic: '/ˈlʌk.i/', example: 'She felt very lucky to win the prize.' },
  { word: 'MAGIC', meaningTh: 'เวทมนตร์, มหัศจรรย์', pos: 'Noun/Adj', phonetic: '/ˈmædʒ.ɪk/', example: 'The night sky felt pure magic.' },
  { word: 'MONEY', meaningTh: 'เงิน, ทรัพย์สิน', pos: 'Noun', phonetic: '/ˈmʌn.i/', example: 'Save money for your future goals.' },
  { word: 'MUSIC', meaningTh: 'ดนตรี, เพลง', pos: 'Noun', phonetic: '/ˈmjuː.zɪk/', example: 'Music brings joy and relaxation.' },
  { word: 'NIGHT', meaningTh: 'กลางคืน, ราตรี', pos: 'Noun', phonetic: '/naɪt/', example: 'The stars twinkle in the dark night.' },
  { word: 'OCEAN', meaningTh: 'มหาสมุทร, ทะเลกว้าง', pos: 'Noun', phonetic: '/ˈoʊ.ʃən/', example: 'The vast blue ocean teems with life.' },
  { word: 'PEACE', meaningTh: 'ความสงบ, สันติภาพ', pos: 'Noun', phonetic: '/piːs/', example: 'We all pray for global peace.' },
  { word: 'PIANO', meaningTh: 'เปียโน', pos: 'Noun', phonetic: '/piˈæn.oʊ/', example: 'He played a soothing piano melody.' },
  { word: 'PLANT', meaningTh: 'พืช, ปลูกต้นไม้', pos: 'Noun/Verb', phonetic: '/plænt/', example: 'Water your green plant every morning.' },
  { word: 'POWER', meaningTh: 'พลังงาน, อำนาจ', pos: 'Noun', phonetic: '/ˈpaʊ.ər/', example: 'Knowledge is the greatest power.' },
  { word: 'QUEEN', meaningTh: 'ราชินี, พระราชินี', pos: 'Noun', phonetic: '/kwiːn/', example: 'The queen ruled with compassion.' },
  { word: 'RIVER', meaningTh: 'แม่น้ำ, ลำน้ำ', pos: 'Noun', phonetic: '/ˈrɪv.ər/', example: 'Boats sailed down the winding river.' },
  { word: 'SHINE', meaningTh: 'ส่องแสง, เปล่งประกาย', pos: 'Verb', phonetic: '/ʃaɪn/', example: 'The sun will shine after the rain.' },
  { word: 'SMART', meaningTh: 'ฉลาด, เก่ง, ปราดเปรียว', pos: 'Adj', phonetic: '/smɑːrt/', example: 'He gave a smart and thoughtful answer.' },
  { word: 'SMILE', meaningTh: 'รอยยิ้ม, ยิ้มแย้ม', pos: 'Verb/Noun', phonetic: '/smaɪl/', example: 'Her kind smile made everyone feel welcome.' },
  { word: 'SPACE', meaningTh: 'อวกาศ, พื้นที่ว่าง', pos: 'Noun', phonetic: '/speɪs/', example: 'Astronauts journey into deep space.' },
  { word: 'STORM', meaningTh: 'พายุ, ลมแรง', pos: 'Noun', phonetic: '/stɔːrm/', example: 'The heavy storm passed quickly.' },
  { word: 'SUGAR', meaningTh: 'น้ำตาล, ความหวาน', pos: 'Noun', phonetic: '/ˈʃʊɡ.ər/', example: 'Just a tiny spoonful of sugar.' },
  { word: 'SWEET', meaningTh: 'หวาน, อ่อนหวาน', pos: 'Adj', phonetic: '/swiːt/', example: 'These summer strawberries are sweet.' },
  { word: 'TIGER', meaningTh: 'เสือโคร่ง, เสือ', pos: 'Noun', phonetic: '/ˈtaɪ.ɡər/', example: 'The brave tiger walked through the jungle.' },
  { word: 'TRAIN', meaningTh: 'รถไฟ, ฝึกซ้อม', pos: 'Noun/Verb', phonetic: '/treɪn/', example: 'We boarded the early morning train.' },
  { word: 'VOICE', meaningTh: 'เสียงพูด, เสียงร้อง', pos: 'Noun', phonetic: '/vɔɪs/', example: 'She has a calm and clear voice.' },
  { word: 'WATER', meaningTh: 'น้ำ, รดน้ำ', pos: 'Noun/Verb', phonetic: '/ˈwɔː.tər/', example: 'Pure drinking water is vital for life.' },
  { word: 'WORLD', meaningTh: 'โลก, โลกทั้งมวล', pos: 'Noun', phonetic: '/wɜːrld/', example: 'Explore the amazing wonders of the world.' }
];

/**
 * Target word dictionary map for fast detail lookup
 */
export const TARGET_DICT: Record<string, WordInfo> = TARGET_WORDS.reduce((acc, curr) => {
  acc[curr.word.toUpperCase()] = curr;
  return acc;
}, {} as Record<string, WordInfo>);

/**
 * ============================================================================
 * 2. EXTENDED VALID WORDS LIST (ชุดคำศัพท์ 5 ตัวอักษรที่พบบ่อย 200+ คำ)
 * ============================================================================
 */
export const EXTRA_VALID_WORDS: string[] = [
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
  'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE',
  'ALONG', 'ALTER', 'AMONG', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLY', 'ARENA',
  'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID', 'AWARD', 'AWARE',
  'BADLY', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING', 'BELOW',
  'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BLOOM', 'BOARD',
  'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAK', 'BREED', 'BRIEF', 'BRING',
  'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CANDY', 'CARRY', 'CATCH',
  'CAUSE', 'CHAIN', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA',
  'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLOCK', 'CLOSE', 'COACH',
  'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME',
  'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DAMAGE', 'DATED', 'DEALT', 'DEATH',
  'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN',
  'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EIGHT', 'ELITE',
  'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT',
  'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT',
  'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH',
  'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FULLY', 'FUNNY',
  'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS',
  'GREAT', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HARRY', 'HEAVY',
  'HENCE', 'HONEY', 'HORSE', 'HOTEL', 'HUMAN', 'IDEAL', 'INDEX', 'INNER', 'INPUT', 'ISSUE',
  'JAPAN', 'JOINT', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
  'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIMIT', 'LOCAL', 'LOGIC', 'LOOSE',
  'LOWER', 'LUNCH', 'LYING', 'MAJOR', 'MAKER', 'MARCH', 'MATCH', 'MAYOR', 'MEANT', 'MEDIA',
  'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT',
  'MOUSE', 'MOUTH', 'MOVIE', 'NEEDS', 'NEVER', 'NEWLY', 'NOBLE', 'NOISE', 'NORTH', 'NOTED',
  'NOVEL', 'NURSE', 'OCCUR', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL',
  'PAPER', 'PARTY', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIECE', 'PILOT', 'PITCH', 'PLACE',
  'PLAIN', 'PLANE', 'PLATE', 'POINT', 'POUND', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT',
  'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE',
  'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RIGHT', 'RIVAL', 'ROBIN', 'ROGER',
  'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE',
  'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL',
  'SHIFT', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY',
  'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMITH', 'SMOKE', 'SOLAR', 'SOLID', 'SOLVE',
  'SORRY', 'SOUND', 'SOUTH', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE',
  'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK',
  'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF',
  'STYLE', 'SUITE', 'SUPER', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEETH', 'TERRY',
  'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK',
  'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY',
  'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TREAT', 'TREND', 'TRIAL',
  'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNCLE', 'UNDER', 'UNDUE',
  'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE',
  'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VIVID', 'WASTE', 'WATCH', 'WHEEL', 'WHERE', 'WHICH',
  'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORRY', 'WORSE', 'WORST', 'WORTH',
  'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH', 'ZEBRA'
];

/**
 * Combined set of cached valid words
 */
export const ALL_VALID_WORDS_SET = new Set([
  ...TARGET_WORDS.map(w => w.word.toUpperCase()),
  ...EXTRA_VALID_WORDS.map(w => w.toUpperCase())
]);

// In-memory runtime cache for verified words
const validWordCache = new Set<string>(ALL_VALID_WORDS_SET);
const invalidWordCache = new Set<string>();

/**
 * Check if a word is a valid English dictionary word.
 * Uses local curated list first (instant), then queries the Free Dictionary API
 * with fallback to Datamuse API and caches results in memory.
 */
export async function checkWordValidity(word: string): Promise<boolean> {
  const cleanWord = (word || '').trim().toUpperCase();
  if (cleanWord.length !== 5 || !/^[A-Z]{5}$/.test(cleanWord)) {
    return false;
  }

  // 1. Instant check in valid cache
  if (validWordCache.has(cleanWord)) {
    return true;
  }

  // 2. Instant check in invalid cache
  if (invalidWordCache.has(cleanWord)) {
    return false;
  }

  // 3. Query Free Dictionary API (https://api.dictionaryapi.dev/api/v2/entries/en/{word})
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord.toLowerCase()}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        validWordCache.add(cleanWord);
        return true;
      }
    } else if (response.status === 404) {
      invalidWordCache.add(cleanWord);
      return false;
    }
  } catch {
    // If Dictionary API times out or has network issues, try Datamuse API as secondary check
    try {
      const res = await fetch(`https://api.datamuse.com/words?sp=${cleanWord.toLowerCase()}&max=1`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0].word.toUpperCase() === cleanWord) {
          validWordCache.add(cleanWord);
          return true;
        }
      }
    } catch {
      // In worst case network failure, check local set
      return validWordCache.has(cleanWord);
    }
  }

  invalidWordCache.add(cleanWord);
  return false;
}

/**
 * Returns a random target word from TARGET_WORDS
 */
export function getRandomTargetWord(): WordInfo {
  const randomIndex = Math.floor(Math.random() * TARGET_WORDS.length);
  return TARGET_WORDS[randomIndex];
}

/**
 * Synchronous fallback validation check
 */
export function isValidWord(word: string): boolean {
  if (!word || word.length !== 5) return false;
  return /^[A-Za-z]{5}$/.test(word);
}

/**
 * Standard Wordle evaluation algorithm (handling duplicate letters properly)
 * Returns an array of statuses corresponding to each character in the guess
 */
export function evaluateGuess(guess: string, target: string): ('correct' | 'present' | 'absent')[] {
  const guessChars = guess.toUpperCase().split('');
  const targetChars = target.toUpperCase().split('');
  const result: ('correct' | 'present' | 'absent')[] = new Array(5).fill('absent');
  
  // Track remaining frequencies of letters in target word that are not matched exactly (green)
  const targetLetterCounts: Record<string, number> = {};
  
  // 1st pass: find exact matches (CORRECT / GREEN)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = 'correct';
    } else {
      targetLetterCounts[targetChars[i]] = (targetLetterCounts[targetChars[i]] || 0) + 1;
    }
  }
  
  // 2nd pass: find wrong-position matches (PRESENT / YELLOW)
  for (let i = 0; i < 5; i++) {
    if (result[i] !== 'correct') {
      const char = guessChars[i];
      if (targetLetterCounts[char] && targetLetterCounts[char] > 0) {
        result[i] = 'present';
        targetLetterCounts[char]--;
      } else {
        result[i] = 'absent';
      }
    }
  }
  
  return result;
}
