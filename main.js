/**
 * Query informations from dictionary api
 *
 * @param string word
 * @return array
 */
async function query(word) {
  // api key
  const key = "API_KEY";
  // api end point
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`;
  // send request to api
  const req = await fetch(url);
  
  // return result
  return await req.json();
}

/**
 * Search a specific word from dictionary
 */
async function search() {
  // word to search
  const word = document.querySelector("#input").value;
  // response of api
  const res = await query(word);
  
  // set definitions
  document.querySelector(".definitions").innerHTML = getList(res);
}

/**
 * Generatare a random word with definition
 */
async function zoop() {
  // fetch word list
  const reqWordList = await fetch(
    "https://raw.githubusercontent.com/words/an-array-of-english-words/master/index.json"
  );
  // word list
  const wordList = await reqWordList.json();
  // random word from word list
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  // query selected word
  const res = await query(word);

  // set definitions
  document.querySelector(".definitions").innerHTML = getList(res);
  // set selected word
  document.querySelector("#input").value = word;
}

/**
 * Create a list of definitions
 *
 * @param string res
 * return string | HTML element
 */
function getList(res) {
  // element placeholder
  let el = "";

  // check if has definitions
  if (typeof res?.[0] === "object") {
    // short definitions
    const definitions = res[0].shortdef;
    // size of definitions
    const definitionsSize = definitions.length;

    // loop through definitions
    for (let i = 0; i < definitionsSize; i++) {
      // create a li tag w/ definition
      el += `<li>${definitions[i]}</li>`;
    }
    
    // if single definition
  } else if (typeof res?.[0] === "string") {
    // create a li tag w/ definition
    el = `<li>${res[0]}</li>`;
    
  // no definition
  } else {
    el = "<li>No definition available.</li>";
  }

  // return created list
  return el;
}
