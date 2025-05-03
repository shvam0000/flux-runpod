import runpod
import torch
from huggingface_hub import login
from diffusers import FluxPipeline
from io import BytesIO
import base64
import os

hf_token=os.getenv("HF_TOKEN")
login(token=hf_token)

pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-dev", torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload()

def handler(job):
    job_input = job['input']
    prompt = job_input.get("prompt", "A team of pandas playing soccer on a sunny beach.")

    image = pipe(
        prompt,
        height=1024,
        width=1024,
        guidance_scale=3.5,
        num_inference_steps=50,
        max_sequence_length=512,
        generator=torch.Generator("cpu").manual_seed(0)
    ).images[0]
    
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    image_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return {
        "image": image_str,
        "prompt": prompt
    }

if __name__ == '__main__':
    runpod.serverless.start({'handler': handler })