<script module>
  export const pageConfig = {
    title: 'Chapter 3 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 3 Quiz: Hardware</h1>
<p>
  This graded quiz has 14 questions and covers all nine chapter objectives. Three questions ask for a number. Type
  digits only, without units or commas. A score of 70 percent passes. You have three attempts, and your best score
  counts. The quiz reports your score but does not mark individual answers.
</p>

<MultipleChoice
  id="q1"
  question="GPU T and GPU U have the same memory bandwidth and the same Tensor Core throughput. GPU T has 50 percent more CUDA Cores. A team runs FP8 prefill on long prompts, a compute-bound workload. How do the two GPUs compare?"
  options={[
    'GPU T, about 50 percent faster, because prefill is compute-bound',
    'Both about the same, because prefill matrix math runs on Tensor Cores',
    'GPU U, faster, because fewer CUDA Cores leave more bandwidth for Tensor Cores',
    'GPU T, slightly faster, because its extra CUDA Cores add FP8 matrix throughput',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Prefill is compute-bound, but its compute is matrix multiply and accumulate work on the Tensor Cores, which are equal on both GPUs.',
    'Correct. The matrix multiplications that dominate prefill run on Tensor Cores. Equal Tensor Core throughput gives about equal prefill speed.',
    'Incorrect. CUDA Cores do not take memory bandwidth away from Tensor Cores, and the two GPUs have the same bandwidth.',
    'Incorrect. CUDA Cores perform scalar arithmetic. FP8 matrix throughput comes from the Tensor Cores.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="During decode, a model's 16 GB of weights must reach the Tensor Cores once for every generated token. The GPU has a 50 MB L2 cache. Why can the L2 cache not remove the VRAM bandwidth limit?"
  options={[
    'The L2 cache belongs to a single SM, so the other SMs cannot read the data it holds',
    'The L2 cache holds only instructions, not model data',
    'The L2 cache sits off-chip in HBM, so it runs at VRAM speed',
    'The weights far exceed its capacity, so they stream from VRAM each step',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. L1 belongs to one SM. L2 is shared by every SM, but it is far too small to hold the weights.',
    'Incorrect. The L0 cache holds instructions. L2 caches data, but 50 MB cannot hold 16 GB of weights.',
    'Incorrect. L2 is on-chip SRAM, much faster than VRAM. Its problem is capacity, not location.',
    'Correct. 16 GB is hundreds of times larger than 50 MB, so each decode step must stream most of the weights from VRAM again.',
  ]}
/>

<NumericQuestion
  id="q3"
  question="A spec sheet lists 3,600 teraFLOPS of FP8 Tensor Core compute with sparsity. Treat a sparse figure as twice the dense figure, and treat each halving of precision as doubling the rate. What dense FP16 rate, in teraFLOPS, should you use when comparing this GPU with others?"
  answer={900}
  unit="teraFLOPS"
  incorrectFeedback="Remove sparsity: 3,600 ÷ 2 = 1,800 teraFLOPS dense FP8. Move to FP16, which doubles the precision and halves the rate: 1,800 ÷ 2 = 900 teraFLOPS dense FP16."
/>

<MultipleChoice
  id="q4"
  question="GPU M lists 1,300 teraFLOPS at FP16, dense. GPU N lists 2,500 teraFLOPS at FP4, dense. Treat each halving of precision as doubling the rate. Which comparison of dense FP8 compute is correct?"
  options={[
    'GPU M leads, about 2,600 versus 1,250 teraFLOPS',
    'GPU M leads, about 2,600 versus 2,500 teraFLOPS',
    'GPU N leads, about 1,250 versus 650 teraFLOPS',
    'GPU N leads, about 2,500 versus 1,300 teraFLOPS',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. GPU M: FP8 halves the precision of FP16, so 1,300 × 2 = 2,600 teraFLOPS dense FP8. GPU N: FP8 doubles the precision of FP4, so 2,500 ÷ 2 = 1,250 teraFLOPS dense FP8.',
    'Incorrect. This converts GPU M but leaves GPU N at FP4. Moving from FP4 to FP8 halves its figure to 1,250.',
    'Incorrect. This halves GPU M. Moving from FP16 to FP8 halves the precision, which doubles the rate to 2,600.',
    'Incorrect. These are the raw figures at two different precisions. Normalize both to dense FP8 before you compare.',
  ]}
/>

<NumericQuestion
  id="q5"
  question="A team will serve a 34-billion-parameter model with FP8 weights and sizes memory with a planning factor of 1.5. What is the minimum VRAM, in gigabytes?"
  answer={51}
  unit="GB"
  incorrectFeedback="FP8 uses 1 byte per parameter, so the weights occupy 34 GB. Then 1.5 × 34 GB = 51 GB."
/>

<MultipleChoice
  id="q6"
  question="A team must serve a 90-billion-parameter model with FP16 weights and sizes memory with a planning factor of 1.5. Which option has the least total VRAM that still meets the minimum?"
  options={[
    'Two H100 GPUs, 160 GB in total',
    'One B200 GPU, 180 GB in total',
    'Two H200 GPUs, 282 GB in total',
    'Four H100 GPUs, 320 GB in total',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. The weights alone occupy 90 × 2 = 180 GB, so 160 GB cannot even load them.',
    'Incorrect. 180 GB holds the weights but leaves no headroom. The minimum is 1.5 × 180 = 270 GB.',
    'Correct. The minimum is 1.5 × 180 GB = 270 GB, and 282 GB is the smallest listed total that meets it.',
    'Incorrect. 320 GB meets the 270 GB minimum, but two H200s meet it with less memory.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="Two GPUs rent at the same hourly price. GPU R offers 2,000 teraFLOPS of dense FP8 compute and 4 TB/s of memory bandwidth. GPU S offers 1,500 teraFLOPS of dense FP8 compute and 6 TB/s. A chat service decodes in FP8 at a batch of about 12. Which GPU serves it faster, and why?"
  options={[
    'GPU R, because decode at this batch is compute-bound on both GPUs',
    'GPU R, because its higher ops:byte ratio lets decode use more of its FLOPS',
    'GPU S, because decode at this batch is memory-bound on both GPUs',
    'GPU S, because its lower ops:byte ratio makes decode compute-bound on it',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Decode at a batch of 12 in FP8 has an intensity of about 24 FLOPs per byte, far below both ridge points of 500 and 250.',
    'Incorrect. A higher ops:byte ratio means decode sits further below the ridge, so GPU R leaves even more of its FLOPS idle.',
    'Correct. An intensity of about 24 sits far below both ridge points, so bandwidth sets the speed, and GPU S has 1.5 times the bandwidth.',
    'Incorrect. GPU S\'s ridge is 1,500 ÷ 6 = 250 FLOPs per byte. An intensity of about 24 is still far below it, so decode stays memory-bound.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="An offline batch job decodes 640 sequences together in FP16 on H100 GPUs, whose FP16 ops:byte ratio is about 295. Which upgrade would speed up the linear layers of this job the most?"
  options={[
    'A GPU with a larger L2 cache and the same FLOPS and bandwidth',
    'A GPU with more dense FP16 FLOPS and the same bandwidth',
    'A GPU with more memory bandwidth and the same FLOPS',
    'A GPU with more VRAM and the same FLOPS and bandwidth',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A larger cache does not raise either ceiling of the roofline. This job is limited by compute.',
    'Correct. In FP16 the linear-layer intensity is about the batch size, 640, which exceeds the ridge of 295. The job is compute-bound, so more FLOPS help most.',
    'Incorrect. Bandwidth limits decode only below the ridge. At a batch of 640 the intensity exceeds 295, so compute is the limit.',
    'Incorrect. More VRAM allows larger models or more KV cache, but it does not raise either throughput ceiling.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A team needs one system that runs NVFP4 weights in hardware and reloads offloaded KV caches from CPU memory far faster than PCIe allows. Which product meets both requirements?"
  options={[
    'A B200 in a standard x86 server',
    'A GB200 superchip system',
    'A GH200 superchip system',
    'An L40S in a PCIe server',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The B200 supports NVFP4, but a standard x86 host reaches it over PCIe, so offloaded data returns at PCIe speed.',
    'Correct. GB200 pairs a Grace CPU, linked by NVLink Chip to Chip, with Blackwell GPUs that support NVFP4.',
    'Incorrect. GH200 has the fast Grace link, but its Hopper GPU supports FP8, not FP4 or the microscaling formats.',
    'Incorrect. The L40S is a Lovelace GPU without FP4 support, and it connects to its host over PCIe.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A deployment runs prefill on one H100 node and decode on a second H100 node. After prefill, each request's KV cache moves from a GPU in the first node to a GPU in the second. Each GPU has 900 GB/s of NVLink bandwidth and one 400 Gb/s NIC. Which link limits this transfer?"
  options={[
    'NVLink inside the decode node',
    'NVSwitch inside the prefill node',
    'PCIe between each host and its GPUs',
    'The network link between the two nodes',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. NVLink moves about 450 GB/s in each direction, far more than the network carries.',
    'Incorrect. NVSwitch runs at NVLink speed inside the node. The transfer must also leave the node.',
    'Incorrect. A PCIe Gen5 x16 link moves about 64 GB/s in each direction, more than the 50 GB/s the NIC provides.',
    'Correct. A 400 Gb/s NIC moves 50 GB/s in each direction, the slowest link on the path from one node to the other.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="A team needs one tensor-parallel group of 16 Blackwell GPUs and places all 16 inside one GB200 NVL72 rack. Which link carries the tensor-parallel traffic between any two GPUs in the group?"
  options={[
    'An 800 Gb/s NIC, because 16 GPUs exceed one eight-GPU node',
    'NVLink Chip to Chip, because each GPU pairs with a Grace CPU',
    'NVLink, because all 72 GPUs share one NVLink domain',
    'PCIe Gen5, because the rack joins its servers through the host CPUs',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Sixteen GPUs would need a network fabric in standard eight-GPU nodes, but the NVL72 extends NVLink across the whole rack.',
    'Incorrect. NVLink Chip to Chip joins each Grace CPU to its GPUs. GPU-to-GPU traffic uses NVLink.',
    'Correct. The NVL72 places 72 GPUs in a single NVLink domain, so the group communicates at NVLink speed, about 900 GB/s in each direction, with no network hop.',
    'Incorrect. PCIe joins a CPU to a GPU in a standard server. The NVL72 joins its GPUs with NVLink.',
  ]}
/>

<NumericQuestion
  id="q12"
  question="How many 1g.20gb MIG instances can one 80 GB H100 hold at the same time?"
  answer={4}
  unit="instances"
  incorrectFeedback="Each 1g.20gb instance uses one of seven compute slices and two of eight memory slices. Compute allows 7 instances and memory allows 8 ÷ 2 = 4. The smaller limit, 4, wins."
/>

<MultipleChoice
  id="q13"
  question="A language-learning app gives live pronunciation feedback that must work during flights and keep recordings on the device. Most of its users own phones that are three or more years old. Which deployment best fits?"
  options={[
    'On-device: a small speech model tested on older phones',
    'On-device: an 8-billion-parameter speech model tuned on a flagship phone',
    'Hybrid: a small on-device model that sends hard cases to a cloud model',
    'Cloud: a speech model on Blackwell GPUs with encrypted uploads',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Only an on-device model works offline and keeps recordings private, and a small model tested on older phones serves the median user.',
    'Incorrect. Phones struggle with models above a few billion parameters, and tuning on a flagship phone overstates performance for older devices.',
    'Incorrect. Sending hard cases to the cloud fails during flights and sends recordings off the device.',
    'Incorrect. Cloud inference fails without a connection, and encryption does not keep recordings on the device.',
  ]}
/>

<MultipleChoice
  id="q14"
  question="A search company serves a 1.5-billion-parameter reranking model. At peak, requests arrive fast enough to keep several H100s busy at batch sizes of several hundred inputs, and the company already rents H100 nodes. Which deployment best balances cost and performance?"
  options={[
    'A Cerebras WSE-3 system, chosen for its decode speed',
    'A dedicated eight-GPU node with tensor parallelism',
    'H100 MIG slices of the 1g.10gb profile, seven per GPU',
    'Separate full-H100 replicas, one model copy per GPU',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. A reranking model runs one forward pass per input, much like prefill, so a decode-speed edge brings little benefit for its cost.',
    'Incorrect. The model needs about 3 GB of weights and fits on one GPU, so tensor parallelism adds per-layer communication without adding memory the model needs.',
    'Incorrect. MIG helps when a model cannot fill a GPU. This traffic fills whole GPUs, and seven 1g.10gb slices leave the leftover SMs idle, so they deliver less throughput per GPU than one full copy.',
    'Correct. A small model that saturates whole GPUs needs no partitioning. One copy per GPU uses every SM, and the replicas scale independently with traffic.',
  ]}
/>
