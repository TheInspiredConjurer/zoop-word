const key = "API_KEY";

// let reqWordList = await fetch('https://raw.githubusercontent.com/words/an-array-of-english-words/master/index.json');
// let wordList = await reqWordList.json();
// console.log(wordList[Math.floor(Math.random() * wordList.length)]);

async function query() {
  const word = document.querySelector("#input").value;
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`;
  const req = await fetch(url);
  const res = await req.json();

  let el = "";
  // console.log(res[0].shortdef);

  if (typeof res[0] === "object") {
    const definitions = res[0].shortdef;
    const definitionsSize = definitions.length;

    for (let i = 0; i < definitionsSize; i++) {
      el += `<li>${definitions[i]}</li>`;
    }
  } else {
    el = "<li>No definition available.</li>";
  }

  document.querySelector(".definitions").innerHTML = el;
}
