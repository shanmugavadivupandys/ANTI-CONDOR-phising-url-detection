chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkURL") {
      fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ url: request.url })
      })
      .then(response => response.json())
      .then(data => sendResponse({ result: data.result }))
      .catch(error => console.error("Error fetching ML model:", error));
      return true;  // Keeps sendResponse alive for async requests
  }
});
