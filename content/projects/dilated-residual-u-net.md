---
title: Tree Detection with Dilated Residual U-Net
category: Computer Vision
year: 2022
featured: true
summary: Tree detection from aerial images with a dilated U-Net bottleneck.
tags: [U-Net, Aerial Imagery, Segmentation]
links:
  - label: Code on GitHub
    url: https://github.com/rizalmaulanaa/Dilated-Residual-U-Net
---

Mostly the same as Deep Residual U-Net, but the bottleneck adds the **Dilated Block** from Dilated LinkNet.

Residual connections minimise information loss during segmentation, and the dilated block gives a bigger receptive field with few extra weights. Used for tree detection from aerial imagery.
