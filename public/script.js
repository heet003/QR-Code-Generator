const qrForm = document.getElementById("qrForm");
const qrCodeContainer = document.getElementById("qrCodeContainer");
const qrCodeImg = document.getElementById("qrCode");
const downloadQRBtn = document.getElementById("downloadQR");
const fullScreenQRBtn = document.getElementById("fullScreenQR");

qrForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = document.getElementById("urlInput").value;

  // Make a POST request to generate the QR code
  fetch("/generateQR", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `URL=${encodeURIComponent(url)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the QR code
      qrCodeImg.src = data.qrCode;
      qrCodeContainer.style.display = "flex";

      // Set the download link
      downloadQRBtn.onclick = function () {
        const a = document.createElement("a");
        a.href = data.qrCode;
        a.download = "ourQR.png";
        a.click();
      };

      // Set full screen view
      fullScreenQRBtn.onclick = function () {
        const newWindow = window.open();
        newWindow.document.write(
          `<img src="${data.qrCode}" style="width: 100%; height: 100%;">`
        );
      };
    })
    .catch((error) => {
      console.error("Error generating QR:", error);
    });
});
