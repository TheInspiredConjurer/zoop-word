async function query(word) {
  const key = "API_KEY";
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`;
  const req = await fetch(url);
  return await req.json();
}

async function search() {
  const word = document.querySelector("#input").value;
  const res = await query(word);
  document.querySelector(".definitions").innerHTML = getList(res);
}

async function zoop() {
  const reqWordList = await fetch(
    "https://raw.githubusercontent.com/words/an-array-of-english-words/master/index.json"
  );
  const wordList = await reqWordList.json();
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  const res = await query(word);

  document.querySelector(".definitions").innerHTML = getList(res);
  document.querySelector("#input").value = word;
}

function getList(res) {
  let el = "";

  if (typeof res?.[0] === "object") {
    const definitions = res[0].shortdef;
    const definitionsSize = definitions.length;

    for (let i = 0; i < definitionsSize; i++) {
      el += `<li>${definitions[i]}</li>`;
    }
  } else if (typeof res?.[0] === "string") {
    el = `<li>${res[0]}</li>`;
  } else {
    el = "<li>No definition available.</li>";
  }

  return el;
}
