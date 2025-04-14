// Grab the form elements
const nameInput = document.querySelector('#name-input');
const dateInput = document.querySelector('#date-input');
const signatureInput = document.querySelector('#signature-input');
const downloadButton = document.querySelector('#download-button');

// Listen for form submission
downloadButton.addEventListener('click', function() {
  // Validate form inputs
  if (!nameInput.value || !dateInput.value) {
    alert('Please fill in all the required fields.');
    return;
  }

  // Get form data
  const name = nameInput.value;
  const date = dateInput.value;
  const signature = signatureInput.value;

  // Render the certificate
  renderCertificate(name, date, signature);

  // Download the certificate
  downloadImage();
});

// Function to render the certificate
function renderCertificate(name, date, signature) {
  // Get the certificate image
  const certificateImage = new Image();
  certificateImage.src = 'certificate.png';

  // Create a canvas to draw the filled certificate
  const canvas = document.createElement('canvas');
  canvas.width = certificateImage.width;
  canvas.height = certificateImage.height;
  const context = canvas.getContext('2d');

  // Draw the certificate image
  context.drawImage(certificateImage, 0, 0);

  // Add the name and date
  context.font = '40px Arial';
  context.fillStyle = '#000000';
  context.textAlign = 'center';
  context.fillText(name, canvas.width / 2, 120);
  context.fillText(date, canvas.width / 2, 160);

  // Add the signature
  const signatureImage = new Image();
  signatureImage.src = signature;
  signatureImage.onload = function() {
    context.drawImage(signatureImage, 120, 320);
  }

  // Display the filled certificate
  const container = document.querySelector('#certificate-container');
  container.innerHTML = '';
  container.appendChild(canvas);
}

// Function to download the certificate
function downloadImage() {
  const canvas = document.querySelector('#certificate-container canvas');
  const image = canvas.toDataURL('image/png');

  // Remove the canvas to prevent it from being saved
  canvas.style.display = 'none';

  // Create a link to download the image
  const link = document.createElement('a');
  link.href = image;
  link.download = 'certificate.png';
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Remove the link
  link.remove();

  // Show the canvas again
  canvas.style.display = 'block';
}
// Once the signature is uploaded
signatureInput.addEventListener('change', () => {
    // Create a new img element and set the src to the uploaded signature
    const signatureImage = new Image();
    signatureImage.src = signatureInput.value;
  
    // Wait for the image to load
    signatureImage.onload = () =>{
      // Draw the signature image on the canvas
      context.drawImage(signatureImage, 100, 500);
  
      // Hide the signature image preview
      signatureImage.style.display = 'none';
  
      // Make the canvas downloadable
      document.getElementById('certificate-canvas').setAttribute('download', 'certificate.png');
  
      // Toast.fire({
      //   type: 'success',
      //   title: 'Certificate generated successfully!'
      // });
    };
  
    signatureImage.onerror = () => {
      console.log('Error loading signature image');
  
      // Toast.fire({
      //   type: 'error',
      //   title: 'Error loading signature image'
      // });
    };
  });
  
  // Download the certificate
  document.getElementById('download').addEventListener('click', () => {
    // Make the canvas downloadable
    document.getElementById('certificate-canvas').setAttribute('download', 'certificate.png');
  
    // Click on the canvas to initiate the download
    document.getElementById('certificate-canvas').click();
  });
  // Download the certificate
document.getElementById('certificate-canvas').addEventListener('click', () => {
    const certificateDownloadLink = document.createElement('a');
    certificateDownloadLink.href = document.getElementById('certificate-canvas').toDataURL();
    certificateDownloadLink.download = 'certificate.png';
    certificateDownloadLink.click();
    certificateDownloadLink.remove();
  });