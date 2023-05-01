var source = document.getElementById("source-language");
var dest = document.getElementById("destination-language");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("apply changes was clicked");
  if (source.selectedIndex == 0 || dest.selectedIndex == 0) {
    alert("please select a language");
  }
  source.options[source.selectedIndex].defaultValue = true;
  dest.options[dest.selectedIndex].defaultValue = true;
  //using forms

  const formData = new FormData(form);
});

form.addEventListener("formdata", async (event) => {
  console.log("formdata created");
  const data = event.formData;
  await Promise.all([
    chrome.storage.sync.set({ source: data.get("source") }),
    chrome.storage.sync.set({ destination: data.get("dest") }),
  ]);
  window.close();
});

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("source", (data) => {
    console.log(data);
    if (data.source) {
      const $select = document.querySelector("#source-language");
      $select.value = data.source;
    }
  });
  chrome.storage.sync.get("destination", (data) => {
    console.log(data);
    if (data.destination) {
      const $select = document.querySelector("#destination-language");
      $select.value = data.destination;
    }
  });
});

const iso_dict = [
  { English: "Arabic", alpha2: "ar" },
  { English: "German", alpha2: "de" },
  { English: "Spanish", alpha2: "es" },
  { English: "French", alpha2: "fr" },
  { English: "Irish", alpha2: "ga" },
  { English: "Hindi", alpha2: "hi" },
  { English: "Italian", alpha2: "it" },
  { English: "Japanese", alpha2: "ja" },
  { English: "Korean", alpha2: "ko" },
  { English: "Latin", alpha2: "la" },
  { English: "Dutch; Flemish", alpha2: "nl" },
  { English: "Polish", alpha2: "pl" },
  { English: "Portuguese", alpha2: "pt" },
  { English: "Russian", alpha2: "ru" },
  { English: "Swedish", alpha2: "sv" },
  { English: "Thai", alpha2: "th" },
  { English: "Turkish", alpha2: "tr" },
  { English: "Ukrainian", alpha2: "uk" },
  { English: "Vietnamese", alpha2: "vi" },
  { English: "Chinese", alpha2: "zh" },
];

for (var i = 0; i < iso_dict.length; i++) {
  var opt = document.createElement("option");
  opt.value = iso_dict[i].alpha2;
  opt.innerHTML = iso_dict[i].English;
  let clone = opt.cloneNode(true);
  source.appendChild(opt);
  dest.appendChild(clone);
}
// source.onclick = function () {
//   this.size = 7;
// };

// source.onfocus = function () {
//   this.size = 7;
// };

// source.onchange = function () {
//   this.size = 1;
// };

// source.onblur = function () {
//   this.size = 1;
// };
// dest.onclick = function () {
//   this.size = 7;
// };
// dest.onfocus = function () {
//   this.size = 7;
// };
// dest.onchange = function () {
//   this.size = 1;
// };
// dest.onblur = function () {
//   this.size = 1;
// };
