# Noise Reduction in Urban Environmental Data

## Overview
This project reduces background noise in urban audio signals (e.g., traffic, construction) using **Short-Time Fourier Transform (STFT)** and **Spectral Subtraction** techniques.  

---

## Features
- Load and analyze audio signals.  
- Reduce noise while preserving speech or desired sounds.  
- Visualize waveforms and spectrograms before and after noise reduction.  

---

## Prerequisites
Install the required libraries:  
```bash
pip install librosa numpy matplotlib
```

---

## Usage
Add an audio file (e.g., example_audio.wav) to the project directory.
Run the script:
```bash
python noise_reduction.py
```

The code will:
- Load and visualize the audio.
- Reduce noise using spectral subtraction.
- Visualize the cleaned audio signal.

---

## Example Code
Load and visualize audio
```bash
audio, sr = load_audio('example_audio.wav')
plot_audio(audio, sr, title="Original Audio")
```

Perform noise reduction
```bash
denoised_audio = reduce_noise(audio, sr)
```

Visualize the cleaned audio
```bash
plot_audio(denoised_audio, sr, title="Denoised Audio")
```

---

## Results
The output shows reduced background noise in both waveform and spectrogram visualizations.
