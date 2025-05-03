import runpod
from huggingface_hub import InferenceClient
from io import BytesIO
import base64
import os

# Initialize client once — outside the handler
hf_token = os.getenv("HF_TOKEN")
client = InferenceClient(
    provider="together",
    api_key=hf_token,
)

def handler(job):
    job_input = job['input']
    prompt = job_input.get("prompt", "A team of pandas playing soccer on a sunny beach.")

    # Call the hosted model
    image = client.text_to_image(
        prompt,
        model="black-forest-labs/FLUX.1-dev"
    )

    # Convert to base64
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    image_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return {
        "image": image_str,
        "prompt": prompt
    }

if __name__ == "__main__":
    runpod.serverless.start({"handler": handler})
