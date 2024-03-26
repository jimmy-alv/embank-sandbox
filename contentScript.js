console.log("loaded content");

const send_button = document.querySelector('button[data-testid="send-button"]');
const prompt_textarea = document.getElementById("prompt-textarea");
const url =
  "https://2aj7zi48ul.execute-api.eu-west-1.amazonaws.com/dev/screen-prompt";

let prompt_text = "";

prompt_textarea.addEventListener("keyup", function (event) {
  if (this.value != "") {
    prompt_text = this.value;
  }
  if (event.code == "Enter") {
    console.log(prompt_text);
    checkPII(prompt_text);
  }
});

// [
//   {
//       "type": "PII",
//       "detected": true,
//       "prompt": "jiame@email.com",
//       "detected_entities": [
//           {
//               "Score": 0.9999960660934448,
//               "Type": "EMAIL",
//               "BeginOffset": 0,
//               "EndOffset": 15
//           }
//       ]
//   }
// ]

document.addEventListener("keydown", function (event) {
  if (event.metaKey && event.key == "Enter") {
    event.preventDefault();
  }
});

async function checkPII(prompt) {
  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  let result = await response.json();
  console.log(result);
  if (result[0].detected) {
    chrome.runtime.sendMessage({ message: result });
  }
}
