---
title: Probabilistic MCTrans
category: Medical Imaging
year: 2022
summary: A probabilistic transformer for ambiguous biomedical image segmentation.
tags: [PyTorch, Transformer, Segmentation, Brain MRI]
links:
  - label: Code on GitHub
    url: https://github.com/rizalmaulanaa/Probabilistic-MCTrans
---

**Probabilistic Multi-Compound Transformer** modifies and combines code from [Probabilistic-Unet-Pytorch](https://github.com/stefanknegt/Probabilistic-Unet-Pytorch) and [MCTrans](https://github.com/JiYuanFeng/MCTrans): it adds the probabilistic model from Probabilistic U-Net into the transformer-based MCTrans.

MCTrans handles long-range dependencies, while Probabilistic U-Net captures the ambiguity in biomedical images. I used it for automatic segmentation of white matter hyperintensities.

For installation, see the [MCTrans](https://github.com/JiYuanFeng/MCTrans) repository.
