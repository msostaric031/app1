"use strict";

const citati = [{
  name: "First, solve the problem. Then, write the code. - John Johnson"
}, {
  name: "Java is to JavaScript what car is to Carpet. - Chris Heilmann"
}, {
  name: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler"
}, {
  name: "Code is like humor. When you have to explain it, it's bad. - Cory House"
}, {
  name: "Optimism is an occupational hazard of programming: feedback is the treatment. - Kent Beck"
}, {
  name: "Simplicity is the soul of efficiency. - Austin Freeman"
}, {
  name: "Before software can be reusable it first has to be usable. - Ralph Johnson"
}, {
  name: "It's harder to read code than to write it. — Joel Spolsky"
}, {
  name: "Deleted code is debugged code. - Jeff Sickel"
}]; // Funkcija za nasumično generiranje citata

document.querySelector(".randomQuote").addEventListener("click", function () {
  document.querySelector(".txt").textContent = citati[Math.floor(Math.random() * citati.length)].name;
});
const list = document.querySelector(".list-group");

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
  const text = document.createTextNode("Nema rezultata.");
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

const searchInput = document.querySelector(".search");
searchInput.addEventListener("input", event => {
  let value = event.target.value;

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    setList(citati.filter(citat => {
      return citat.name.toLowerCase().match(value);
    }).sort((citatA, citatB) => {
      return getRelevancy(citatB.name, value) - getRelevancy(citatA.name, value);
    }));
  } else {
    clearList();
  }
}); // --CRUD--
// Create

document.querySelector(".create").addEventListener("click", function () {
  citati.push({
    name: prompt("Unesite citat i autora u obliku: citat - autor")
  });
}); // Read

document.querySelector(".read").addEventListener("click", function () {
  const outputTxt = document.querySelector(".txt").textContent;
  const index = citati.findIndex(x => x.name === outputTxt);
  alert(outputTxt + "  -> Index: " + index);
}); // Update citat

document.querySelector(".update").addEventListener("click", function () {
  const outputTxt = document.querySelector(".txt").textContent;
  const index = citati.findIndex(x => x.name === outputTxt);
  console.log(index);

  if (index >= 0) {
    citati[index] = {
      name: prompt("Unesite citat i autora u obliku: citat - autor")
    };
  } else {
    alert("Prvo generirajte citat koji želite promijeniti!");
  }
}); // Delete

document.querySelector(".delete").addEventListener("click", function () {
  const outputTxt = document.querySelector(".txt").textContent;
  const index = citati.findIndex(x => x.name === outputTxt);

  if (index >= 0) {
    citati.splice(index, 1);
  } else {
    alert("Prvo generirajte citat koji želite obrisati!");
  }
});