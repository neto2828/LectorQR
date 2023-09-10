 // Acceder a la cámara
 const videoElement = document.getElementById("video");
 navigator.mediaDevices
     .getUserMedia({ video: { facingMode: "environment" } })
     .then(function (stream) {
         videoElement.srcObject = stream;
     })
     .catch(function (error) {
         console.error("Error al acceder a la cámara:", error);
     });

 // Función para procesar el código QR escaneado
 function handleQRCode(decodedResult) {
     const qrResultInput = document.getElementById("qr-result");
     qrResultInput.value = decodedResult;
 }

 // Escuchar los frames de la cámara y procesar los códigos QR
 videoElement.addEventListener("play", function () {
     const canvasElement = document.createElement("canvas");
     const canvasContext = canvasElement.getContext("2d");

     setInterval(function () {
         if (videoElement.paused || videoElement.ended) return;

         canvasElement.width = videoElement.videoWidth;
         canvasElement.height = videoElement.videoHeight;
         canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

         const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
         const code = jsQR(imageData.data, imageData.width, imageData.height);
         if (code) {
             handleQRCode(code.data);
         }
     }, 100);
 });