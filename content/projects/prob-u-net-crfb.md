---
title: Probabilistic U-Net + CRFB
category: Medical Imaging
year: 2022
summary: Adding a Cross Residual Fusion Block to Probabilistic U-Net.
tags: [Probabilistic U-Net, KiU-Net, Segmentation]
links:
  - label: Code on GitHub
    url: https://github.com/rizalmaulanaa/Prob-U-Net-CRFB
---

Inspired by [probabilistic_unet](https://github.com/SimonKohl/probabilistic_unet) and [KiU-Net-pytorch](https://github.com/jeya-maria-jose/KiU-Net-pytorch). The main architecture is the same as Probabilistic U-Net, but the U-Net part gets a **Cross Residual Fusion Block (CRFB)**. CRFB up-samples the input image so the segmentation works at a larger size, which helps the result.

Only one CRFB is added because of resource limits. A natural next step would be to replace the U-Net entirely with KiU-Net.

See the original papers for details: [A Probabilistic U-Net for Segmentation of Ambiguous Images](https://arxiv.org/abs/1806.05034) and [KiU-Net: Towards Accurate Segmentation of Biomedical Images using Over-complete Representations](https://arxiv.org/abs/2006.04878).
