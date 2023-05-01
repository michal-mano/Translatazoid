var source_language;
var dest_language;
let translation_wrapper = document.createElement("div");
let translation_box = document.createElement("div");
let arrow_box = document.createElement("div");
let translation_text = document.createElement("div");
let inner_arrow = document.createElement("div");
let outer_arrow = document.createElement("div");
translation_box.appendChild(translation_text);
arrow_box.appendChild(outer_arrow);
arrow_box.appendChild(inner_arrow);
translation_wrapper.appendChild(translation_box);
translation_wrapper.appendChild(arrow_box);
document.body.appendChild(translation_wrapper);
translation_wrapper.setAttribute("class", "translation-wrapper");
translation_box.setAttribute("class", "translation-box");
arrow_box.setAttribute("class", "arrow-wrapper");
inner_arrow.setAttribute("class", "bubble-arrow-inner");
outer_arrow.setAttribute("class", "bubble-arrow-outer");
translation_wrapper.style.display = "none";
chrome.storage.onChanged.addListener(function (changes, area) {
  if (changes.source?.newValue) {
    source_language = changes.source.newValue;
    console.log(source_language);
  }

  if (changes.destination?.newValue) {
    dest_language = changes.destination.newValue;
    console.log(dest_language);
  }
});

document.body.onload = function () {
  chrome.storage.sync.get(null, function (items) {
    source_language = items.source ? items.source : null;
    dest_language = items.destination ? items.destination : null;
  });
};
document.addEventListener("mouseup", (event) => {
  let selection = document.getSelection
    ? document.getSelection().toString()
    : document.selection.createRange().toString();
  if (!selection) {
    translation_wrapper.style.display = "none";
    return;
  } else {
    setPositions(translation_wrapper, inner_arrow, outer_arrow);

    if (!(source_language && dest_language)) {
      translation_text.textContent = "Please Select a Language";
    } else {
      translation_text.textContent = "Searching for translation...";

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "31a5ac964dmshd278e791bb43188p18fb56jsncd02899bd119",
          "X-RapidAPI-Host":
            "translated-mymemory---translation-memory.p.rapidapi.com",
        },
      };

      fetch(
        `https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${source_language}%7C${dest_language}&q=${selection}&mt=1&onlyprivate=0&de=a%40b.c`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          translation_text.textContent = response.responseData.translatedText;
        })
        .catch((err) => console.error(err));
    }
  }
});

function getPosition() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
  return {
    left: rangeBounds.left + rangeBounds.width / 2,
    top: rangeBounds.top + window.pageYOffset,
  };
}

function setPositions(translation_wrapper, inner_arrow, outer_arrow) {
  translation_wrapper.style.display = "block";
  let positions = getPosition();
  translation_wrapper.style.left = positions.left + "px";
  translation_wrapper.style.top = positions.top + "px";
}
