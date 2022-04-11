"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var citati = [{
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
var list = document.querySelector(".list-group");

function setList(group) {
  clearList();

  var _iterator = _createForOfIteratorHelper(group),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var citat = _step.value;
      var item = document.createElement("li");
      var text = document.createTextNode(citat.name);
      item.appendChild(text);
      list.appendChild(item);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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
  var item = document.createElement("li");
  var text = document.createTextNode("Nema rezultata.");
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

var searchInput = document.querySelector(".search");
searchInput.addEventListener("input", function (event) {
  var value = event.target.value;

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    setList(citati.filter(function (citat) {
      return citat.name.toLowerCase().match(value);
    }).sort(function (citatA, citatB) {
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
  var outputTxt = document.querySelector(".txt").textContent;
  var index = citati.findIndex(function (x) {
    return x.name === outputTxt;
  });
  alert(outputTxt + "  -> Index: " + index);
}); // Update citat

document.querySelector(".update").addEventListener("click", function () {
  var outputTxt = document.querySelector(".txt").textContent;
  var index = citati.findIndex(function (x) {
    return x.name === outputTxt;
  });
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
  var outputTxt = document.querySelector(".txt").textContent;
  var index = citati.findIndex(function (x) {
    return x.name === outputTxt;
  });

  if (index >= 0) {
    citati.splice(index, 1);
  } else {
    alert("Prvo generirajte citat koji želite obrisati!");
  }
});