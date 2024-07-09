---
layout: post
title:  "Serverless: Intel and AMD"
date:   2023-08-20
categories: jekyll update
---

With advancements in cloud technology, serverless applications are gaining popularity as they relieve developers from server management, scaling, and load balancing. While Intel CPUs dominate the cloud market, AMD’s CPUs rise in popularity is increasing heterogeneity in cloud servers. This diversity makes it challenging for developers to optimize performance for specific hardware. Cloud service providers lack mechanisms for automatic hardware selection to ensure maximum performance. This results in unpredictable performance differences and cost fluctuations across different machines.

The idea for this project came up when I was [building a scheduler](https://github.com/thatsKevinJain/gpu-isolation) for running applications in resource constrained environments like edge devices. I wondered how serverless functions are being managed by the cloud service providers now that there are so many hardware options to chose from.

---

Firstly, it turns out, they rarely allow end users to see where their code is being run, forget having any control over it.

Secondly, running serverless functions is easy, but it comes at a cost.

![sentiment-analysis costs](https://i.ibb.co/1rpvSXM/Screenshot-2023-08-29-at-12-39-05-PM.png)

Lastly, with the rise in heterogeneity in cloud environments due to competition from Intel and AMD CPU's, cloud providers need a mechanism to select hardware based on the type of workload being run.

This prompted me to dive deeper into understanding the performance differences of various serverless workloads so that we can formulate ways for cloud service providers to improve the quality of their services.

We chose comparable Intel and AMD CPU's for our study, found nine serverless apps that performed a wide variety of operations, and profiled their performance metrics using "perf".

<img class="portrait-image" src="https://i.ibb.co/1sj3SJf/Whats-App-Image-2023-08-29-at-12-49-25-PM.jpg" alt="setup"/>

---

Check out my thesis for a more detailed discussion -- <br>

"<b>[Characterization of serverless workloads for improved performance on different CPU architectures](https://drive.google.com/file/d/1Y9HlXO7cFUaCQAhf4S3dlUao_aKisYVh/view?usp=sharing)</b>"

---

<b>TL;DR</b>

![results](https://i.ibb.co/0KyzYxK/fig18.png)

We found that Intel performed <b>25% faster</b> in applications that were configured to utilize <b>single-core</b> of the CPU compiled with O0 flag, although AMD performed <b>13% faster</b> in applications that were configured to utilized <b>multiple-cores</b> compiled with O3 flag. AMD showed performance improvements for applications that utilize <b>vector instructions</b>, these involve optimizing for-loops and complex arithmetic operations to be broken down into tasks that can be executed parallely.

With the rise in CPU heterogeneity, cloud service providers can smartly provision workloads based on this data for improved performance. If developers are given a choice to pick the underlying execution hard- ware, this knowledge can help them build their apps specific to the hardware allowing more predictable and efficient performance at reduced costs.

---
