---
layout: post
title:  "Workers AI on Zed"
date:   2025-01-25
categories: jekyll update
---

For the longest time, I have never liked change when it came to code editors. I had invested heavily in setting up Sublime Text and I would go to extreme lengths to keep using it. So much so that I even wrote my entire [**thesis**](https://thatskevinjain.github.io/jekyll/update/2023/08/20/serverless-intel-amd.html) in Sublime Text (hooked up with LaTeX + Skim PDF reader with live reload). It was fast and snappy (sorry VSCode) and had a gentle learning curve. All this changed when [**Zed**](https://zed.dev) arrived in town. It is written in Rust and has a rich LSP out of the box. With the advent of AI, it recently added support for chat interfaces and enabled users to setup their own neighborhood LLM provider. I switched to Zed six months ago and not looked back since.

### Workers AI

From their [website](https://developers.cloudflare.com/workers-ai/), *"Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code -- whether that be from Workers, Pages, or anywhere via the Cloudflare API".*

They host a wide range of open-source ML models, which are run in a datacenter geographically closer to the user. Cloudflare offers a generous [free tier](https://developers.cloudflare.com/workers-ai/platform/pricing/#free-allocation), allowing 10,000 tokens per day across any text-generation model. While there are several LLM providers offering free tiers, I will be using Cloudflare's Workers AI for the purpose of this post.

### Setup
In the following guide, we will set up Zed editor to use Workers AI. Get your API token and Account ID using this [guide here](https://developers.cloudflare.com/workers-ai/get-started/rest-api/).

For our setup, we will use the [**Llama-3.3-70b** model](https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast)

#### Test your API
Replace the command below with your account id and auth token
```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "prompt": "Why is my pizza so good" }'
```

Workers AI also supports [Open AI Compatible Endpoints](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/). You can test it out here:
```bash
curl --request POST \
--url https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
--header "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "messages": [
    {
      "role": "user",
      "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
    }
  ],
  "stream": true
}'
```

If the above commands work for you, we're ready to configure Zed!

#### Zed Assistant
Assuming you have already installed Zed from their website, you can configure the assistant by pressing `Command ⌘ + Shift + P` --> Type `assistant` and select `show configuration`

Zed supports reading LLM responses from the OpenAI chat completions format, so add the CF API key in the box below
<img src="/assets/zed/1.png"/>

Press `Command ⌘ + ,` to open Zed settings and add the following block to the json config

```json
{
  ...
  "assistant": {
    "default_model": {
      "provider": "openai",
      "model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    },
    "version": "2"
  },
  "language_models": {
    "openai": {
      "version": "1",
      "api_url": "https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT_ID}/ai/v1",
      "available_models": [
        {
          "provider": "openai",
          "name": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
          "max_tokens": 131072
        }
      ]
    }
  }
}
```
Replace `{CF_ACCOUNT_ID}` with your account id.

You are all set! Open a new chat context by pressing `Command ⌘ + Shift + ?`

<img src="/assets/zed/3.png"/>

Paste a code in a new HTML file, which gives you a bouncy hello world!
<img src="/assets/zed/2.gif"/>

<br>

*This blog was written in Zed and proofread for grammatical correctness by the Llama-3.3-70B model. I hope you found this article useful; if you have any questions or need help setting up, please don't hesitate to reach out to me via email.*
