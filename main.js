"use strict";

let btn = document.getElementById("btn");
let output = document.getElementById("output");

const citati = [
  { name: "First, solve the problem. Then, write the code. – John Johnson" },
  { name: "Java is to JavaScript what car is to Carpet. – Chris Heilmann" },
  {
    name: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  },
  {
    name: "Code is like humor. When you have to explain it, it’s bad. – Cory House",
  },
  {
    name: "Optimism is an occupational hazard of programming: feedback is the treatment. - Kent Beck",
  },
  { name: "Simplicity is the soul of efficiency. – Austin Freeman" },
  {
    name: "Before software can be reusable it first has to be usable. – Ralph Johnson",
  },
  { name: "It’s harder to read code than to write it. — Joel Spolsky" },
  { name: "Deleted code is debugged code. - Jeff Sickel" },
];

btn.addEventListener("click", function () {
  let randomQuote = citati[Math.floor(Math.random() * citati.length)].name;
  output.innerHTML = randomQuote;
});

const list = document.getElementById("list");

function setList(group) {
  clearList();
  for (const citat of group) {
    const item = document.createElement("li");
    const text = document.createTextNode(citat.name);
    item.appendChild(text);
    list.appendChild(item);
  }
  if (group.length === 0) {
    setNoResults();
  }
}

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function setNoResults() {
  const item = document.createElement("li");
  const text = document.createTextNode("No results found");
  item.appendChild(text);
  list.appendChild(item);
}

function getRelevancy(value, term, searchTerm) {
  if (value === searchTerm) {
    return 2;
  } else if (value.startsWith(term)) {
    return 1;
  } else if (value.match(searchTerm)) {
    return 0;
  }
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (event) => {
  let value = event.target.value;
  if (value && value.trim().length > 0) {
    // value = value.trim().toLowerCase();
    setList(
      citati
        .filter((citat) => {
          return citat.name.match(value);
        })
        .sort((citatA, citatB) => {
          return (
            getRelevancy(citatB.name, value) - getRelevancy(citatA.name, value)
          );
        })
    );
  } else {
    clearList();
  }
});
