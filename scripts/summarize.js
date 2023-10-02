importScripts("config.js");

async function summarize(info, tab){
    console.log(info);
    console.log(tab);
    console.log(info.selectionText);
    summarized_text = await get_summary(info.selectionText);
    console.log(summarized_text)

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: displayPopup,
        args: [summarized_text]
    });
}

async function get_summary(text){
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
            "role": "system",
            "content": "Summarize the following text by into 25% the amount of characters. Ensure that it is 25%, and if it is not then redo it."
            },
            {
            "role": "user",
            "content": text
            }
        ],
        "temperature": 1,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${config.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok){
        return "There was an error with the server, try again later";
    }
    const summary = await response.json();
    console.log("SUMMARIZED: ", summary.choices[0].message.content);
    return summary.choices[0].message.content;

}
// function displayPopup(text){
//     let x, y;
//     document.onmousemove = function(e){
//         x = e.clientX;
//         y = e.clientY;
//     }
//     console.log(x, y);
//     const popup = document.createElement('div');
//     popup.textContent = text;
//     popup.style.position = 'fixed';
//     popup.style.top = y + 'px';
//     popup.style.left = x + 'px';
//     popup.style.transform = 'translate(-50%, -50%)';
//     popup.style.backgroundColor = 'white';
//     popup.style.padding = '20px';
//     popup.style.border = '1px solid black';
//     popup.style.zIndex = '1000'; // Ensure the popup appears above other elements

//     console.log("displayPopup Ran");

//     document.body.appendChild(popup);

//     // Remove the popup after a few seconds
//     setTimeout(function() {
//         document.body.removeChild(popup);
//     }, 5000);
// }

function displayPopup(text){
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid black';

    console.log("displayPopup Ran");

    document.body.appendChild(popup);
    
    setTimeout(function() {
        document.body.removeChild(popup);
    }, 5000);
}