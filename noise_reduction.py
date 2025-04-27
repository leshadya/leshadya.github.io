import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt
import soundfile as sf
import tkinter as tk
from tkinter import filedialog, messagebox
from tkinter.ttk import Button, Label

def load_audio(file_path):
    audio, sr = librosa.load(file_path, sr=None)
    return audio, sr

def plot_audio(audio, sr, title='Audio Signal'):
    plt.figure(figsize=(8, 4))
    plt.subplot(2, 1, 1)
    librosa.display.waveshow(audio, sr=sr)
    plt.title(f"{title}")
    
    plt.subplot(2, 1, 2)
    D = librosa.amplitude_to_db(np.abs(librosa.stft(audio)), ref=np.max)
    librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log', cmap='viridis')
    plt.title(f"{title} - Spectrogram")
    plt.colorbar(format="%+2.0f dB")
    plt.tight_layout()
    plt.show()

def reduce_noise(audio, sr, noise_duration=1.0):
    noise_sample = audio[:int(noise_duration * sr)]
    
    stft_audio = librosa.stft(audio)
    stft_noise = librosa.stft(noise_sample)
    
    mag_audio, phase_audio = np.abs(stft_audio), np.angle(stft_audio)
    mag_noise = np.mean(np.abs(stft_noise), axis=1, keepdims=True)
    
    mag_denoised = np.maximum(mag_audio - mag_noise, 0)
    stft_denoised = mag_denoised * np.exp(1j * phase_audio)
    
    denoised_audio = librosa.istft(stft_denoised)
    return denoised_audio

def save_audio(audio, sr):
    save_path = filedialog.asksaveasfilename(defaultextension='.wav', filetypes=[('WAV files', '*.wav')])
    if save_path:
        sf.write(save_path, audio, sr)
        messagebox.showinfo("Success", f"Audio saved to {save_path}")
    else:
        messagebox.showwarning("Save Cancelled", "Audio file was not saved.")

def select_file():
    file_path = filedialog.askopenfilename(filetypes=[("Audio Files", "*.wav")])
    if file_path:
        file_label.config(text=f"Selected: {file_path}")
        process_button.config(state="normal")
        save_button.config(state="disabled")
        return file_path
    else:
        messagebox.showwarning("No File", "Please select an audio file.")
        return None

def process_audio():
    file_path = file_label.cget("text").replace("Selected: ", "")
    if file_path:
        global denoised_audio, sr
        audio, sr = load_audio(file_path)
        denoised_audio = reduce_noise(audio, sr)

        plt.figure(figsize=(12, 6))
        
        # Plot original audio
        plt.subplot(2, 2, 1)
        librosa.display.waveshow(audio, sr=sr)
        plt.title("Original Audio - Waveform")
        
        plt.subplot(2, 2, 2)
        D = librosa.amplitude_to_db(np.abs(librosa.stft(audio)), ref=np.max)
        librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log', cmap='viridis')
        plt.title("Original Audio - Spectrogram")
        plt.colorbar(format="%+2.0f dB")
        
        # Plot denoised audio
        plt.subplot(2, 2, 3)
        librosa.display.waveshow(denoised_audio, sr=sr)
        plt.title("Denoised Audio - Waveform")
        
        plt.subplot(2, 2, 4)
        D_denoised = librosa.amplitude_to_db(np.abs(librosa.stft(denoised_audio)), ref=np.max)
        librosa.display.specshow(D_denoised, sr=sr, x_axis='time', y_axis='log', cmap='viridis')
        plt.title("Denoised Audio - Spectrogram")
        plt.colorbar(format="%+2.0f dB")
        
        plt.tight_layout()
        plt.show()

        save_button.config(state="normal")

def save_audio_button():
    global denoised_audio, sr
    if 'denoised_audio' in globals() and 'sr' in globals():
        save_audio(denoised_audio, sr)

root = tk.Tk()
root.title("Audio Noise Reduction")

width, height = 400, 165
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

x = (screen_width - width) // 2
y = (screen_height - height) // 2

root.geometry(f"{width}x{height}+{x}+{y}")

frame = tk.Frame(root, padx=100, pady=100)
frame.pack()

file_label = Label(root, text="No file selected")
file_label.pack(pady=10)

select_button = Button(root, text="Select Audio File", command=select_file)
select_button.pack(pady=5)

process_button = Button(root, text="Process Audio", command=process_audio, state="disabled")
process_button.pack(pady=5)

save_button = Button(root, text="Save Audio", command=save_audio_button, state="disabled")
save_button.pack(pady=5)

root.mainloop()

    
