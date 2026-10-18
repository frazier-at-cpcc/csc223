<script module>
  export const pageConfig = {
    title: 'Chapter 3 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 3 Quiz: Hardware</h1>
<p>
  This graded quiz has 11 questions and covers every chapter objective. A score of 70 percent passes. You have three
  attempts, and your best score counts. Feedback for each option appears in the review after you submit.
</p>

<MultipleChoice
  id="q1"
  question="A government agency installs GPUs in its own building. The GPUs have no connection to any outside network, and staff must be physically present to run inference. Which deployment mode does this describe?"
  options={['Air-gapped', 'Cloud', 'On-premise with network access']}
  correct={0}
  optionFeedback={[
    'Correct. An air-gapped deployment is installed on-premise and requires physical access to the GPUs to run inference.',
    'Incorrect. Cloud deployments rent GPUs in another company\'s datacenter and reach them over the network.',
    'Incorrect. A standard on-premise deployment sits in a datacenter you control but is reachable over a network. The lack of any external path makes this deployment air-gapped.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="Why do inference engineers measure GPU compute in Tensor Core FLOPS rather than CUDA Core throughput?"
  options={[
    'CUDA Cores are reserved for graphics workloads',
    'Tensor Cores execute the MMA operations that dominate inference',
    'Tensor Cores run the softmax function in attention layers',
    'Tensor Cores use sparse operations, which inference uses by default',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. CUDA Cores are general-purpose scalar units, not graphics-only units. They are not the units that run matrix math.',
    'Correct. Inference is a series of matrix multiplications, and Tensor Cores execute the MMA instructions that perform them.',
    'Incorrect. Softmax relies on Special Function Units for operations such as exponentials. Tensor Cores perform matrix multiplication.',
    'Incorrect. Inference is dense by default. Read Tensor Core FLOPS without sparsity.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="GPU A lists 4,000 teraFLOPS at FP8 with sparsity. GPU B lists 1,200 teraFLOPS at FP16, dense. Assume sparsity doubles a figure and halving precision doubles a figure. Which comparison of dense FP8 compute is correct?"
  options={[
    'GPU A leads, about 2,000 versus 1,200 teraFLOPS',
    'GPU A leads, about 4,000 versus 1,200 teraFLOPS',
    'GPU A leads, about 4,000 versus 2,400 teraFLOPS',
    'GPU B leads, about 2,400 versus 2,000 teraFLOPS',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. This removes sparsity from GPU A but leaves GPU B at FP16. Converting GPU B to FP8 doubles it to about 2,400 teraFLOPS.',
    'Incorrect. This compares the raw spec-sheet numbers, which mix sparse with dense and FP8 with FP16.',
    'Incorrect. This converts GPU B to FP8 but leaves GPU A\'s sparse figure in place. GPU A\'s dense rate is about 2,000 teraFLOPS.',
    'Correct. GPU A\'s dense FP8 rate is about 4,000 / 2 = 2,000 teraFLOPS. GPU B\'s FP8 rate is about 1,200 × 2 = 2,400 teraFLOPS.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="A model's weights occupy 60 GB. The sizing guideline calls for KV cache headroom equal to 50 percent or more of the weight size. Which listed GPU is the smallest that meets this minimum?"
  options={['L40 (48 GB)', 'H100 (80 GB)', 'H200 (141 GB)', 'B200 (192 GB)']}
  correct={2}
  optionFeedback={[
    'Incorrect. 48 GB cannot hold even the 60 GB of weights, so the model fails to load with an OOM error.',
    'Incorrect. 80 GB holds the weights but leaves only 20 GB of headroom. The minimum is 60 GB + 30 GB = 90 GB.',
    'Correct. The minimum is 60 GB + 30 GB = 90 GB, and 141 GB is the smallest listed capacity that meets it.',
    'Incorrect. 192 GB meets the minimum, but the H200 also meets it with less memory.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="A chatbot runs LLM decode at a batch size of two and must generate more tokens per second. Two candidate GPUs have identical dense FP8 FLOPS. Which difference should decide the choice?"
  options={['Faster host CPU', 'Higher memory bandwidth', 'Higher sparse FLOPS', 'Larger L2 cache']}
  correct={1}
  optionFeedback={[
    'Incorrect. The host CPU handles work outside the GPU. Decode speed depends on how fast the GPU reads its weights.',
    'Correct. Decode at low to medium batch sizes is memory-bound, so higher memory bandwidth produces more tokens per second.',
    'Incorrect. Inference is dense by default, and decode is limited by memory bandwidth rather than compute.',
    'Incorrect. L2 holds tens of megabytes. Decode streams every weight from VRAM, so the VRAM transfer rate sets the pace.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="A cloud provider retires its A100 fleet and offers H100 and H200 instances. Which statement correctly describes how the three GPUs relate?"
  options={[
    'The A100 and H100 share a generation, and the H200 is newer',
    'The A100 and H200 share a generation, and the H100 is newer',
    'The A100, H100, and H200 share a generation and differ in size',
    'The H100 and H200 share a generation, and the A100 is older',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. The A100 and H100 have different letters. The H100 directly replaces the A100 in a new generation.',
    'Incorrect. The A100 and H200 have different letters, so they belong to different generations.',
    'Incorrect. The letter identifies the architecture. A marks Ampere and H marks Hopper, so the GPUs span two generations.',
    'Correct. The shared letter H means both use Hopper. The H200 is a larger Hopper GPU, and the A100 belongs to the earlier Ampere generation.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="An inference service stores LoRA adapter weights in CPU memory and loads them onto the GPU on demand. Which hardware choice most reduces the time to fetch these weights?"
  options={[
    'A GH200 superchip with NVLink Chip to Chip',
    'A GPU with a larger L2 cache',
    'A GPU with FP4 Tensor Cores',
    'A host with more CPU cores',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. NVLink Chip to Chip links the Grace CPU and the GPU at up to 900 GB/s, several times faster than PCIe.',
    'Incorrect. L2 is an on-chip cache measured in megabytes. It does not speed transfers from CPU memory.',
    'Incorrect. FP4 Tensor Cores speed computation on the GPU. They do not change the CPU-to-GPU link.',
    'Incorrect. More CPU cores add host compute. The bottleneck is the bandwidth of the link between CPU memory and the GPU.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="In NVIDIA's standard configuration, a model is split across 16 B200 GPUs in two nodes. Which interconnect carries traffic between GPUs in different nodes?"
  options={['InfiniBand', 'NVLink Chip to Chip', 'NVSwitch', 'PCIe']}
  correct={0}
  optionFeedback={[
    'Correct. InfiniBand is the standard node-to-node interconnect for NVIDIA GPUs, at up to 400 Gb/s per NIC.',
    'Incorrect. NVLink Chip to Chip connects a Grace CPU to its GPU, not one node to another.',
    'Incorrect. NVSwitch coordinates all-to-all traffic among the eight GPUs inside one node.',
    'Incorrect. PCIe connects a GPU to its host system. It does not link separate nodes.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="An engineer creates a three-slice multi-instance GPU partition on an 80 GB H100. Which resources does the partition receive?"
  options={[
    'About 1/7 of the compute and 10 GB of VRAM',
    'About 3/8 of the compute and 30 GB of VRAM',
    'About 3/7 of the compute and 30 GB of VRAM',
    'About 3/7 of the compute and up to 40 GB of VRAM',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. One compute slice and one memory slice describe the smallest partition, not a three-slice partition.',
    'Incorrect. An H100 has seven compute slices, not eight, so three slices give about 3/7 of the compute.',
    'Incorrect. The compute share is right, but a three-slice partition can access up to half of the VRAM, or 40 GB, not three 10 GB memory slices.',
    'Correct. Three of the seven compute slices give about 3/7 of the compute, and the partition can access up to half of the VRAM, or 40 GB.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A team's workload is LLM decode at a low batch size, and the team is free to choose any cloud platform. Which alternative accelerator is built around the edge that targets this bottleneck most directly?"
  options={['AWS Inferentia', 'Cerebras WSE-3', 'Furiosa RNGD', 'Google TPU']}
  correct={1}
  optionFeedback={[
    'Incorrect. Inferentia competes on platform integration with AWS. The workload needs memory bandwidth, not cloud integration.',
    'Correct. The WSE-3 is a wafer-scale chip with extremely high memory bandwidth, built to remove decode bottlenecks.',
    'Incorrect. RNGD competes on power efficiency, which lowers operating cost but does not target the decode bottleneck.',
    'Incorrect. The TPU competes on integration with Google Cloud and Google models, not specifically on decode bandwidth.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="A language-learning app needs live transcription of spoken practice that works offline on airplanes and keeps recordings private. Most users own recent smartphones. Which deployment best fits?"
  options={[
    'Cloud inference on Blackwell GPUs',
    'Cloud inference on MIG partitions',
    'On-device inference with a small speech model',
    'On-device inference with an 8-billion-parameter model',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Cloud inference fails without a network connection and sends recordings off the device.',
    'Incorrect. MIG lowers cloud cost, but the app still needs a network connection and still sends recordings off the device.',
    'Correct. On-device inference works offline and keeps data private, and some small speech models run in real time on modern phones.',
    'Incorrect. Even high-end phones struggle with models above one or two billion parameters.',
  ]}
/>
