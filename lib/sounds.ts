"use client"

// Web Audio API based sound effects
class SoundManager {
    private audioContext: AudioContext | null = null
    private isEnabled: boolean = true

    private getContext(): AudioContext | null {
        if (typeof window === "undefined") return null

        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        }
        return this.audioContext
    }

    setEnabled(enabled: boolean) {
        this.isEnabled = enabled
    }

    // Soft click sound
    playClick() {
        if (!this.isEnabled) return
        const ctx = this.getContext()
        if (!ctx) return

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.setValueAtTime(800, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05)

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.05)
    }

    // Hover sound - soft whoosh
    playHover() {
        if (!this.isEnabled) return
        const ctx = this.getContext()
        if (!ctx) return

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        oscillator.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(600, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08)

        filter.type = "lowpass"
        filter.frequency.setValueAtTime(1000, ctx.currentTime)

        gainNode.gain.setValueAtTime(0.03, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.08)
    }

    // Success/positive feedback
    playSuccess() {
        if (!this.isEnabled) return
        const ctx = this.getContext()
        if (!ctx) return

        const notes = [523.25, 659.25, 783.99] // C5, E5, G5

        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator()
            const gainNode = ctx.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(ctx.destination)

            oscillator.type = "sine"
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)

            gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
            gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + i * 0.08 + 0.02)
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15)

            oscillator.start(ctx.currentTime + i * 0.08)
            oscillator.stop(ctx.currentTime + i * 0.08 + 0.15)
        })
    }

    // Scroll tick
    playTick() {
        if (!this.isEnabled) return
        const ctx = this.getContext()
        if (!ctx) return

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.setValueAtTime(1200, ctx.currentTime)
        gainNode.gain.setValueAtTime(0.02, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.02)
    }

    // Swoosh for transitions
    playSwoosh() {
        if (!this.isEnabled) return
        const ctx = this.getContext()
        if (!ctx) return

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        // Create noise
        const bufferSize = ctx.sampleRate * 0.2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1
        }

        const noise = ctx.createBufferSource()
        noise.buffer = buffer

        noise.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        filter.type = "bandpass"
        filter.frequency.setValueAtTime(500, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15)
        filter.Q.setValueAtTime(1, ctx.currentTime)

        gainNode.gain.setValueAtTime(0.04, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

        noise.start(ctx.currentTime)
        noise.stop(ctx.currentTime + 0.15)
    }
}

export const soundManager = new SoundManager()

// React hook for sound effects
export function useSoundEffect() {
    return {
        playClick: () => soundManager.playClick(),
        playHover: () => soundManager.playHover(),
        playSuccess: () => soundManager.playSuccess(),
        playTick: () => soundManager.playTick(),
        playSwoosh: () => soundManager.playSwoosh(),
        setEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
    }
}
