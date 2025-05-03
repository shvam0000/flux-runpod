# RunPod Text-to-Image Inference

> Deployed Link - https://flux-runpod.vercel.app/

## Environment Setup

1. Model Used: black-forest-labs/FLUX.1-dev

2. Platform: RunPod Serverless

3. Auth: Hugging Face token passed via environment variable (HF_TOKEN)

## Frameworks:

```
transformers
torch
runpod
```

## Handler Code Summary

```py
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

```

### 🧪 Testing the Handler

```sh
curl --location 'http://localhost:8080/generate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <your_token>' \
--data '{
  "input": {
    "prompt": "A futuristic city floating in the sky, illuminated by neon lights and flying cars."
  }
}'
```

## Prerequisites

### System requirement :

1. Any system with basic configuration.
2. Operating System : Any (Windows / Linux / Mac).

### Software requirement :

1. Node.js installed (If not download it [here](https://nodejs.org/en/download/)).
2. Any text editor of your choice.

## Installation

### Client

Install Dependencies

```
$ cd frontend && npm install
```

Run the frontend locally

```
$ npm run dev
```

### Server

Install Dependencies

```
$ cd backend && npm install
```

Run the backend locally

```
$ npm run start
```

## Tech Stack

1. Next.js with JavaScript (Frontend)
2. Node.js / Express.js with JavaScript (Backend)
3. MongoDB (Persistence Storage for Gallery)
4. Hugging Face (for text-to-image model)
5. RunPod (to run the inference)
