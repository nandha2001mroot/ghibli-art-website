from flask import Flask, request, send_file
from PIL import Image
import io
import os
# Import your style transfer model here (TensorFlow, PyTorch, etc.)
# For this conceptual example, we'll use a placeholder function

app = Flask(__name__)

# --- Placeholder Style Transfer Function ---
def apply_ghibli_style(image):
    """
    This is a placeholder function.
    In a real application, this would use a machine learning model
    to apply Ghibli style transfer to the image.
    For now, it just converts the image to grayscale as a simple example.
    """
    img_pil = Image.open(image).convert('L') # Convert to grayscale (placeholder effect)
    return img_pil
# -----------------------------------------


@app.route('/stylize', methods=['POST'])
def stylize_image():
    if 'image' not in request.files:
        return "No image part", 400

    file = request.files['image']
    if file.filename == '':
        return "No selected image", 400

    try:
        # Apply Ghibli style transfer (using the placeholder or your actual model)
        stylized_image = apply_ghibli_style(file)

        # Save the stylized image to a byte buffer
        img_byte_arr = io.BytesIO()
        stylized_image.save(img_byte_arr, format='PNG') # Or JPEG, etc.
        img_byte_arr = img_byte_arr.getvalue()

        # Send the stylized image back to the frontend as a file
        return send_file(
            io.BytesIO(img_byte_arr),
            mimetype='image/png', # Adjust mimetype based on image format
            download_name='ghibli_art.png' # Optional: filename for download
        )

    except Exception as e:
        print("Error processing image:", e)
        return "Error processing image", 500


if __name__ == '__main__':
    app.run(debug=True) # Run Flask development server
