const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const txtInputText = document.getElementById("txtInputText");
const outputText = document.getElementById("outputText");
const loadingSpinner = document.getElementById("loadingSpinner");
const englishButtonContainer = document.getElementById("englishButton");

function populateLanguages() {
    [select1, select2].forEach((select, index) => {
        for (let countryCode in countries) {
            const isSelected = (index === 0 && countryCode === "en-GB") || (index === 1 && countryCode === "si-LK");
            const option = `<option value="${countryCode}" ${isSelected ? "selected" : ""}>${countries[countryCode]}</option>`;
            select.insertAdjacentHTML("beforeend", option);
        }
    });
}

function updateEnglishButton() {
    if (select1.value === "en-GB") {
        englishButtonContainer.innerHTML = `
                                            <button class="btn btn-light" onclick="voice()"><i class="bi bi-megaphone"></i></button>
                                        `;
    } else {
        englishButtonContainer.innerHTML = ``;
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

    loadingSpinner.style.display = "block";

    fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${select1Value}|${select2Value}`)
        .then((response) => response.json())
        .then((result) => {
            if (result.responseData && result.responseData.translatedText) {
                outputText.value = result.responseData.translatedText;
            } else {
                outputText.value = "Translation not available.";
            }
        })
        .catch((error) => {
            console.error("Error fetching translation:", error);
            outputText.value = "Error translating text.";
        })
        .finally(() => {
            loadingSpinner.style.display = "none";
        });
}

txtInputText.addEventListener("input", translates);
select1.addEventListener("change", () => {
    updateEnglishButton();
    translates();
});
select2.addEventListener("change", translates);

populateLanguages();
updateEnglishButton();


function voice() {
    if (select1.value === "en-GB") {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-GB";

        recognition.onresult = (event) => {
            txtInputText.value = event.results[0][0].transcript;
            charCount.textContent = `${txtInputText.value.length} / 5000`;
            translates();
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.start();
    } else {
        alert("Voice recognition is only available for English!");
    }
}