document.getElementById("checkForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    let url = document.getElementById("url").value.trim();
    if (!url) return;

    let apiEndpoint = "http://127.0.0.1:5000/predict";  // Update with your deployed API URL

    try {
        let response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ url: url })
        });

        let text = await response.text();
        document.getElementById("resultText").innerText = text.includes("Phishing")
            ? `⚠️ The URL "${url}" is classified as a Phishing site!`
            : `✅ The URL "${url}" is Safe.`;

        document.getElementById("resultContainer").style.display = "block";
    } catch (error) {
        document.getElementById("resultText").innerText = "Error checking URL!";
        console.error(error);
    }
});
