document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const stylizeButton = document.getElementById('stylizeButton');
    const originalPreview = document.getElementById('originalPreview');
    const stylizedPreview = document.getElementById('stylizedPreview');
    const downloadLink = document.getElementById('downloadLink');
    const downloadButton = document.getElementById('downloadButton');
    const loadingIndicator = document.getElementById('loading');

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            originalPreview.src = URL.createObjectURL(file);
            originalPreview.style.display = 'block'; // Show original preview
            stylizedPreview.style.display = 'none'; // Hide stylized preview until processed
            downloadLink.style.display = 'none'; // Hide download link initially
        } else {
            originalPreview.src = '#';
            originalPreview.style.display = 'none';
            stylizedPreview.style.display = 'none';
            downloadLink.style.display = 'none';
        }
    });

    stylizeButton.addEventListener('click', async () => {
        const file = imageUpload.files[0];
        if (!file) {
            alert("Please upload an image first.");
            return;
        }

        loadingIndicator.style.display = 'flex'; // Show loading indicator
        stylizedPreview.style.display = 'none'; // Hide previous stylized image
        downloadLink.style.display = 'none'; // Hide download link

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/stylize', { // Backend endpoint (Flask in this example)
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob(); // Get image as blob
                const imageURL = URL.createObjectURL(blob);
                stylizedPreview.src = imageURL;
                stylizedPreview.style.display = 'block';
                downloadLink.style.display = 'block';
                downloadButton.href = imageURL; // Set download link
                loadingIndicator.style.display = 'none'; // Hide loading indicator

            } else {
                console.error('Error from backend:', response.statusText);
                alert('Stylization failed. Please try again.');
                loadingIndicator.style.display = 'none'; // Hide loading indicator
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Stylization failed. Please check console for details.');
            loadingIndicator.style.display = 'none'; // Hide loading indicator
        }
    });
});
