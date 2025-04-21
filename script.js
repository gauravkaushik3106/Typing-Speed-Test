const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const beg = document.getElementById("beg");
const pro = document.getElementById("pro");

let wordNo = 1;
let wordsSubmitted = 0;
let wordsCorrect = 0;
let timer = 30;
let flag = 0;
let factor = 2;
let seconds;
let difficulty = 1;
let testOver = false;

function randomWords(diff) {
  const easy = ["ant", "ark", "ace", "away", "band", "boss", "beat", "case", "barn", "cash", "cave", "balm", "clip", "drum", "dart", "clap", "deal", "debt", "dear", "bulb", "duct", "echo", "envy", "epic", "cost", "curb", "edit", "fair", "fear", "farm", "chip", "food", "file", "idol", "frog", "feed", "flag", "flap", "glad", "gaze", "grow", "high", "luck", "king", "kite", "leaf", "land", "link", "jail", "join", "jump", "path", "note", "item", "idle", "blue", "wind", "sack", "mind", "pine", "cake", "show", "news", "moon", "malt", "air", "end", "sun", "foe", "duck", "path", "stone", "flux", "hint", "file", "tree", "bush", "ant", "ink", "corn", "gate", "ripe", "hunt", "bear", "soft", "burn", "firm", "lack", "pink", "cool", "cave", "epic", "gold", "gear", "gift", "safe", "clue", "climb", "line", "save", "code", "card", "list", "coat", "loan", "flag", "note", "cash", "epic", "leap", "near", "cope", "dock", "bulb", "film", "tick", "flip", "clan", "hunt", "drip", "fuel", "iron", "rise", "king", "name", "ring", "fact", "ink", "late", "calm", "tail", "news", "dear", "pick", "bird", "dive", "boat", "date", "leaf", "heat", "farm", "fame", "game", "past", "fork", "echo", "ring", "drip", "gate", "gain", "frog", "join", "wind", "globe", "pink", "dive", "heat", "bulk", "seek", "page", "vine", "link", "dive", "fact", "epic", "fork"];
  const hard = ["apple", "river", "mountain", "blue", "dog", "sunshine", "sky", "forest", "peace", "energy", "light", "happiness", "dream", "bridge", "ocean", "valley", "cloud", "flower", "grass", "spark", "rain", "love", "freedom", "wisdom", "silence", "horizon", "journey", "laughter", "adventure", "memory", "reflection", "kindness", "serenity", "friendship", "passion", "growth", "courage", "imagination", "strength", "beauty", "magic", "nature", "tranquility", "hope", "wonder", "earth", "starlight", "firefly", "whisper", "truth", "desire", "compassion", "mystery", "destiny", "blossom", "miracle", "grace", "solitude", "rainbow", "clarity", "fountain", "embrace", "equilibrium", "harmony", "twilight", "promise", "illusion", "phenomenon", "vitality", "honesty", "radiance", "aspiration", "galaxy", "rhythm", "sanctuary", "melody", "intuition", "dedication", "inspiration", "brilliance", "philosophy", "dimension", "constellation", "creation", "ethereal", "perspective", "legend", "momentum", "vision", "experience", "potential", "opportunity", "gratitude", "persuasion", "endurance", "elation", "authenticity", "innovation", "transformation", "euphoria", "resilience", "exploration", "inheritance", "affection", "serendipity", "actualization", "revelation", "expression", "composition", "continuity", "magnificence", "impression", "artistry", "equanimity", "rejuvenation", "enlightenment", "illumination", "excellence", "contemplation", "understanding", "exuberance", "perception", "originality", "realization", "collaboration", "celebration", "remembrance", "integration", "creativity", "selflessness", "determination", "empowerment", "perseverance", "reconnection", "accomplishment", "independence", "adoration", "solidarity", "transcendence", "brilliance", "receptivity", "emergence", "spontaneity", "exhilaration", "affinity", "recovery", "connection", "achievement", "reliability", "flourish", "symmetry", "legacy", "revolution", "mindfulness", "authenticity", "everlasting", "abundance", "illumination", "progression", "fulfillment", "effervescence", "endearment", "vibrancy", "infinity", "actualization", "thoughtfulness", "immediacy", "glimmer", "rejoice", "articulation", "refinement", "ecstasy", "prophecy", "transcendence", "benevolence", "exquisite", "enchantment", "vigorous", "interconnection", "recompense", "extravaganza", "acclamation", "ineffable", "ephemeral", "captivation", "galvanization"];
  const base = diff === 1 ? easy : hard;
  return Array.from({ length: 60 }, () => base[Math.floor(Math.random() * base.length)]);
}

function displayTest(diff) {
  wordNo = 1;
  testItem.innerHTML = "";
  const words = randomWords(diff);

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.id = "word " + (index + 1);
    span.innerText = word + " ";
    testItem.appendChild(span);
  });

  colorSpan(document.getElementById("word 1"), "current");
}

function colorSpan(span, className) {
  span.classList.remove("correct", "wrong", "current");
  span.classList.add(className);
}

function timeStart() {
  hideOptions();
  seconds = setInterval(() => {
    time.innerText--;
    if (time.innerText == "-1") {
      clearInterval(seconds);
      testOver = true;
      inputItem.disabled = true;
      displayScore();
    }
  }, 1000);
}

function displayScore() {
  let accuracy = wordsSubmitted ? Math.floor((wordsCorrect / wordsSubmitted) * 100) : 0;
  time.classList.add("current");
  cw.classList.add("current");
  time.innerText = accuracy + "%";
  timeName.innerText = "PA";
  cw.innerText = factor * wordsCorrect;
  cwName.innerText = "WPM";
}

function checkWord() {
  const wordEntered = inputItem.value.trim();
  inputItem.value = "";

  const span = document.getElementById("word " + wordNo);
  if (span.innerText.trim() === wordEntered) {
    colorSpan(span, "correct");
    wordsCorrect++;
    cw.innerText = wordsCorrect;
  } else {
    colorSpan(span, "wrong");
  }

  wordsSubmitted++;
  wordNo++;

  if (wordNo > 60) displayTest(difficulty);
  else colorSpan(document.getElementById("word " + wordNo), "current");
}

function currentWord() {
  const wordEntered = inputItem.value;
  const span = document.getElementById("word " + wordNo);
  const actualWord = span.innerText.trim();

  if (actualWord.startsWith(wordEntered)) {
    colorSpan(span, "current");
  } else {
    colorSpan(span, "wrong");
  }
}

function hideOptions() {
  thirty.style.visibility = "hidden";
  sixty.style.visibility = "hidden";
  beg.style.visibility = "hidden";
  pro.style.visibility = "hidden";
}

function showOptions() {
  thirty.style.visibility = "visible";
  sixty.style.visibility = "visible";
  beg.style.visibility = "visible";
  pro.style.visibility = "visible";
}

function resetTest() {
  wordsSubmitted = 0;
  wordsCorrect = 0;
  wordNo = 1;
  flag = 0;
  testOver = false;
  time.classList.remove("current");
  cw.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = 0;
  cwName.innerText = "CW";
  inputItem.disabled = false;
  inputItem.value = "";
  inputItem.focus();
  displayTest(difficulty);
  clearInterval(seconds);
  showOptions();
}

function highlightSelected(add, remove) {
  add.classList.add("yellow");
  remove.classList.remove("yellow");
}

inputItem.addEventListener("input", function (event) {
  if (testOver) return;

  if (flag === 0) {
    flag = 1;
    timeStart();
  }

  if (/\s/g.test(event.data)) {
    checkWord();
  } else {
    currentWord();
  }
});

thirty.addEventListener("click", function () {
  timer = 30;
  factor = 2;
  highlightSelected(thirty, sixty);
  time.innerText = timer;
});

sixty.addEventListener("click", function () {
  timer = 60;
  factor = 1;
  highlightSelected(sixty, thirty);
  time.innerText = timer;
});

beg.addEventListener("click", function () {
  difficulty = 1;
  displayTest(difficulty);
  highlightSelected(beg, pro);
});

pro.addEventListener("click", function () {
  difficulty = 2;
  displayTest(difficulty);
  highlightSelected(pro, beg);
});

restartBtn.addEventListener("click", resetTest);

// Initial setup
displayTest(difficulty);
