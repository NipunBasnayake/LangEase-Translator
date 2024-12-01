const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const txtInputText = document.getElementById("txtInputText");
const outputText = document.getElementById("outputText");
const loadingSpinner2 = document.getElementById("loadingSpinner2");
const englishButtonContainerFrom = document.getElementById("englishButtonFrom");
const englishButtonContainerTo = document.getElementById("englishButtonTo");

function populateLanguages() {
    [select1, select2].forEach((select, index) => {
        for (let countryCode in countries) {
            const isSelected = (index === 0 && countryCode === "en-GB") || (index === 1 && countryCode === "si-LK");
            const option = `<option value="${countryCode}" ${isSelected ? "selected" : ""}>${countries[countryCode]}</option>`;
            select.insertAdjacentHTML("beforeend", option);
        }
    });
}

function toggleSpinner(spinner, show) {
    if (show) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
}

function updateEnglishButton() {
    if (select1.value === "en-GB") {
        englishButtonContainerFrom.innerHTML = `<button class="btn btn-light" onclick="voice('from')"><i class="bi bi-volume-up"></i></button>`;
    } else {
        englishButtonContainerFrom.innerHTML = '';
    }

    if (select2.value === "en-GB") {
        englishButtonContainerTo.innerHTML = `<button class="btn btn-light" onclick="voice('to')"><i class="bi bi-volume-up"></i></button>`;
    } else {
        englishButtonContainerTo.innerHTML = '';
    }
}

function translates() {
    const inputText = txtInputText.value;
    const select1Value = select1.value;
    const select2Value = select2.value;

    if (!inputText) {
        outputText.value = "";
        return;
    }

    toggleSpinner(loadingSpinner2, true);

    fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${select1Value}|${select2Value}`)
        .then((response) => response.json())
        .then((result) => {
            outputText.value = result.responseData?.translatedText || "Translation not available.";
        })
        .catch(() => {
            outputText.value = "Error translating text.";
        })
        .finally(() => {
            toggleSpinner(loadingSpinner2, false);
        });
}

function voice(target) {
    const textToSpeak = target === 'from' ? txtInputText.value.trim() : outputText.value.trim();

    if (!textToSpeak) {
        alert("Please enter some text to speak.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    utterance.pitch = 1;
    if ("speechSynthesis" in window) {
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Speech synthesis is not supported in this browser.");
    }
}

txtInputText.addEventListener("input", translates);
select1.addEventListener("change", () => {
    updateEnglishButton();
    translates();
});
select2.addEventListener("change", () => {
    updateEnglishButton();
    translates();
});

populateLanguages();
updateEnglishButton();
