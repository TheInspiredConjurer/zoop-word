const key = "API_KEY";

async function query() {
  const input = document.querySelector("#input").value;

  let word = input;
  let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`;
  let req = await fetch(url);
  let res = await req.json();

  let el = "";
  if (res.length !== 0) {
    let defs = res[0].shortdef;

    for (let i = 0; i < defs.length; i++) {
      el += `<li>${defs[i]}</li>`;
    }
  } else {
    el = "<li>No definition available.</li>";
  }

  document.querySelector(".definitions").innerHTML = el;
}
