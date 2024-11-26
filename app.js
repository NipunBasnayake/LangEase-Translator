let selectTag = document.querySelectorAll("select");
let outputText = document.getElementById("outputText");

selectTag.forEach((tag, id) => {
    for (let countyCode in countries) {
        let selected;
        if (id == 0 && countyCode == "en-GB") {
            selected = "selected";
        } else if (id == 1 && countyCode == "si-LK"){
            selected = "selected";
        }
        let option = `<option value= "${countyCode}" ${selected}>${countries[countyCode]}</option>`
        tag.insertAdjacentHTML("beforeend", option);
    }
});

let apiResponce;

function translates() {

    let txtInputText = document.getElementById("txtInputText").value;
    let select1Value = document.getElementById("select1").value;
    let select2Value = document.getElementById("select2").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`https://api.mymemory.translated.net/get?q=${txtInputText}!&langpair=${select1Value}|${select2Value}`)
        .then((response) => response.json())
        .then((result) => {
            // console.log(result.responseData.translatedText)
            apiResponce = result.responseData.translatedText;
            // console.log(apiResponce);
            displayBody = `${apiResponce}`;
            outputText.innerHTML = displayBody;
        })
        .catch((error) => console.error(error));
}

