(async function() {
    let url = window.location.href;
    console.log("Checking URL:", url);
  
    let apiEndpoint = "http://127.0.0.1:5000/predict";  // Update with your deployed API URL
  
    try {
      let response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: url }) // Send URL as form data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      let text = await response.text(); // Flask returns HTML
      console.log("Prediction:", text);
  
      if (text.includes("Phishing")) {
        alert("⚠️ Warning: This site may be a phishing site!");
      } else if (text.includes("Legitimate")) {
        console.log("✅ Safe website");
      } else {
        alert("⚠️ Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error fetching ML model:", error);
      alert("❌ Error: Could not check the URL. See console for details.");
    }
  })();
  