<script module>
  export const pageConfig = {
    title: 'Chapter 6 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 6 Quiz: Modalities</h1>

<p>
  This graded quiz has 12 questions that cover every chapter objective. You need 70 percent to pass,
  and you have three attempts. Your best attempt counts.
</p>

<!-- q1: objective O1 -->
<MultipleChoice
  id="q1"
  question={"A product team plans to serve four models. Which model generates its output by iterative denoising?"}
  options={["Embedding model that converts product descriptions into vectors", "Image generation model that renders product photos from text", "Text-to-speech model that reads product descriptions aloud", "Vision language model that answers questions about product photos"]}
  correct={1}
  optionFeedback={["Embedding models are transformer encoders or LLM backbones. They process tokens in a single pass and do not refine noise.", "Correct. Image and video generation models start from random noise and refine it over many denoising steps.", "Modern TTS models are fine-tuned LLMs that generate audio tokens autoregressively.", "A VLM pairs a vision encoder with an LLM, which generates its text answer autoregressively."]}
/>

<!-- q2: objective O1 -->
<MultipleChoice
  id="q2"
  question={"A voice assistant converts each LLM reply into speech with a TTS model. Which latency metric best reflects how long the user waits to hear a useful response?"}
  options={["Real-time factor", "Time to first sentence", "Time to first token", "Tokens per second"]}
  correct={1}
  optionFeedback={["Real-time factor measures how fast long audio files are transcribed. It describes ASR batch work, not speech output.", "Correct. A single audio token is not useful to a listener. Time to first sentence measures when meaningful speech begins.", "TTFT fits a chat LLM, where one text token is visible. One audio token is too short for a listener to use.", "Tokens per second measures decode speed. Above the real-time rate it no longer changes what the listener experiences."]}
/>

<!-- q3: objective O2 -->
<MultipleChoice
  id="q3"
  question={"A VLM receives a 4-second cinematic clip at 24 frames per second. At full resolution, each frame takes about 1,000 tokens. About how many input tokens does the clip produce before downsampling?"}
  options={["4,000", "24,000", "96,000", "960,000"]}
  correct={2}
  optionFeedback={["This counts one frame per second. The clip has 4 × 24 = 96 frames.", "This counts only one second of video. The clip lasts four seconds.", "Correct. 4 seconds × 24 frames = 96 frames, and 96 × 1,000 = 96,000 tokens. This is why downsampling is practically obligatory for video.", "This is ten times too large. Recheck the multiplication: 96 frames × 1,000 tokens."]}
/>

<!-- q4: objective O2 -->
<MultipleChoice
  id="q4"
  question={"A support assistant lets a customer upload one photo of a damaged part and then ask three follow-up questions about that photo. Which optimization avoids recomputing the photo's visual tokens on every turn?"}
  options={["Disaggregation", "KV cache quantization", "Prefix caching", "Speculative decoding"]}
  correct={2}
  optionFeedback={["Disaggregation moves prefill to separate workers. The photo is still prefilled again on every turn.", "KV cache quantization shrinks the cache in memory. It does not keep the cache across turns.", "Correct. Prefix caching reuses the stored KV cache for the photo in later turns of the chat.", "Speculation accelerates decode. The repeated work in this scenario is the prefill of the photo."]}
/>

<!-- q5: objective O3 -->
<MultipleChoice
  id="q5"
  question={"A team quantizes its embedding model's weights to FP8. Which comparison best confirms that the quantized model preserved output quality?"}
  options={["Cosine similarity of the original and quantized models' vectors for the same inputs", "Cosine similarity of the quantized model's vectors and another model's vectors of equal length", "Inference latency of the original and quantized models under the same load", "Vector dimensionality of the original and quantized models' outputs"]}
  correct={0}
  optionFeedback={["Correct. Run the same inputs through both models. A cosine similarity of at least 99 percent gives confidence in the quantization.", "Vectors from different embedding models live in different semantic spaces, so the comparison is meaningless even at equal length.", "Latency shows whether quantization sped the model up. It says nothing about whether the vectors changed.", "Quantization does not change the output length, so dimensionality reveals nothing about quality."]}
/>

<!-- q6: objective O3 -->
<MultipleChoice
  id="q6"
  question={"An embedding model with 600 million parameters runs on one GPU and can no longer keep up with rising query traffic. Which scaling approach does the chapter recommend?"}
  options={["Disaggregate the workload into separate prefill and decode pools", "Enable prefix caching to reuse work across similar queries", "Run each added GPU as an independent replica of the full model", "Shard the model across GPUs with Tensor Parallelism"]}
  correct={2}
  optionFeedback={["Embedding models process tokens in parallel and do not decode, so disaggregation is not relevant.", "Embedding models process tokens in parallel, so prefix caching is not a relevant optimization.", "Correct. Embedding models are small, so high-traffic deployments scale horizontally with each GPU as its own replica.", "Parallelism across GPUs is not effective for models this small. Replicas scale better."]}
/>

<!-- q7: objective O4 -->
<MultipleChoice
  id="q7"
  question={"A long-file transcription pipeline transcribes a 2-hour recording in 9 seconds. What is its real-time factor?"}
  options={["13X", "80X", "800X", "1,600X"]}
  correct={2}
  optionFeedback={["This divides 120 minutes by 9 seconds without converting units. Convert 2 hours to 7,200 seconds first.", "This is ten times too small. Recheck the division: 7,200 ÷ 9.", "Correct. 2 hours is 7,200 seconds, and 7,200 ÷ 9 = 800X.", "This doubles the correct result. The 2 hours is already counted when you convert the duration to 7,200 seconds."]}
/>

<!-- q8: objective O4 -->
<MultipleChoice
  id="q8"
  question={"In a parallel long-file pipeline, one chunk's transcript repeats the same phrase eight times in a row, and its words-per-minute rate is far above normal speech. Which repair does the chapter recommend for that chunk?"}
  options={["Merge the chunk with its neighbor into one 60-second chunk", "Re-run the chunk at a higher temperature", "Re-run the chunk at a lower temperature", "Re-run the chunk with the previous chunk's transcript as a prefix"]}
  correct={1}
  optionFeedback={["Whisper accepts at most 30 seconds per chunk. The chapter recommends smaller chunks, not larger ones.", "Correct. A higher temperature is counterintuitive, but it breaks the cycle of repeated words and produces a different output.", "Lower temperature makes the output more deterministic, which tends to reproduce the same loop.", "Chunks in a parallel pipeline run at the same time, so the previous transcript is not available as a prefix."]}
/>

<!-- q9: objective O5 -->
<MultipleChoice
  id="q9"
  question={"A TTS model needs about 90 tokens per second to produce real-time speech. An optimization raises single-stream decode speed from 100 to 300 tokens per second. What is the main benefit of this optimization?"}
  options={["Each listener hears the speech three times faster", "The audio decoder no longer needs dynamic batching", "The GPU can serve more concurrent real-time streams", "The model synthesizes long documents without speech degradation"]}
  correct={2}
  optionFeedback={["Audio plays at a fixed speed. Generating tokens faster than real time does not change what one listener hears.", "The audio decoder still converts tokens to waveforms and still benefits from short-timeout dynamic batching.", "Correct. Above the real-time rate, extra speed becomes capacity for more concurrent streams, which lowers the per-user cost.", "Speech degrades after about 30 seconds of input because of the model, not because of decode speed."]}
/>

<!-- q10: objective O6 -->
<MultipleChoice
  id="q10"
  question={"A 40-step image generation run uses classifier-free guidance. The engineer turns guidance off for the last 10 steps. How many passes through the denoiser does the run make?"}
  options={["50", "60", "70", "80"]}
  correct={2}
  optionFeedback={["This counts one pass per step plus the 10 changed steps. Guided steps take two passes each: 30 × 2 + 10 × 1.", "This subtracts two passes for each unguided step. An unguided step still takes one pass.", "Correct. 30 guided steps × 2 passes + 10 unguided steps × 1 pass = 70 passes, compared with 80 without the change.", "This is the pass count with guidance on for all 40 steps. Turning guidance off saves one pass per step."]}
/>

<!-- q11: objective O7 -->
<MultipleChoice
  id="q11"
  question={"An engineer wants to quantize attention in a video generation model while protecting output quality. Which plan follows the chapter's selective quantization guidance?"}
  options={["Keep early steps and the first and last layers in FP16; quantize later steps and hidden layers", "Keep later steps and hidden layers in FP16; quantize early steps and the first and last layers", "Quantize attention uniformly across steps and layers with one per-tensor scale", "Quantize the linear-layer weights and keep attention in FP16"]}
  correct={0}
  optionFeedback={["Correct. Early steps set the outline and prompt adherence, and the first and last layers handle input and output. Hidden layers and later steps tolerate approximation.", "This reverses the guidance. It quantizes exactly the steps and layers that matter most for quality.", "Uniform quantization ignores which parts are sensitive. The chapter recommends blockwise microscaling formats and selective quantization.", "Weight quantization helps bandwidth-bound LLMs. In video models attention dominates compute, so attention is the quantization target."]}
/>

<!-- q12: objective O7 -->
<MultipleChoice
  id="q12"
  question={"On an eight-GPU node, how does Context Parallelism divide the work of generating one video?"}
  options={["Each GPU computes part of each matrix multiplication from a shard of the weights", "Each GPU generates a separate video from the same prompt", "Each GPU runs a different group of denoising steps and passes the latent onward", "Each GPU stores full weights and computes attention for one slice of the shared latent space"]}
  correct={3}
  optionFeedback={["This describes Tensor Parallelism, which splits the weights. Context Parallelism replicates them.", "Video models run one video at a time across all eight GPUs, a batch size of one.", "Denoising steps depend on each other in order, so they cannot be split across GPUs this way.", "Correct. Context Parallelism replicates the weights and splits the attention calculation, coordinated by a mechanism such as ring attention."]}
/>
