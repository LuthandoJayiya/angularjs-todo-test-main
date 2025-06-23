import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<any>(this.getLightTheme());

  toggleDarkMode() {
    const isDark = this.isDarkMode();
    if (isDark) {
      document.documentElement.classList.remove('dark');
      this.currentTheme.next(this.getLightTheme());
    } else {
      document.documentElement.classList.add('dark');
      this.currentTheme.next(this.getDarkTheme());
    }

    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }

  loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      this.currentTheme.next(this.getDarkTheme());
    } else {
      this.currentTheme.next(this.getLightTheme());
    }
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  getCurrentTheme() {
    return this.currentTheme.value;
  }

  themeChanges() {
    return this.currentTheme.asObservable();
  }

  private getLightTheme() {
    return {
      //Background gradient for the overall application, soft icy blue tones
      bg: 'linear-gradient(135deg, #F0F5F8 0%, #E6F0F5 100%)', // Very light cool blue to slightly darker
      // Card background with a subtle gradient for depth, slightly more pronounced icy blue
      cardBg: 'linear-gradient(145deg, #E6F0F5, #F0F5F8)',
      // Soft, subtle shadow for cards - important for the "neu" effect in icy tones
      cardShadow: '6px 6px 12px #cdd9e2, -6px -6px 12px #ffffff',
      // Button background, similar to cardBg for consistent soft feel
      buttonBg: 'linear-gradient(145deg, #E6F0F5, #F0F5F8)',
      // Softer shadow for buttons in icy blue
      buttonShadow: '4px 4px 8px #cdd9e2, -4px -4px 8px #ffffff',
      // Button pressed state background, slightly darker icy blue to indicate press
      buttonPressedBg: 'linear-gradient(145deg, #cdd9e2, #E6F0F5)',
      // Inset shadow for button pressed state, creating a "pushed in" look
      buttonPressedShadow: 'inset 4px 4px 8px #cdd9e2, inset -4px -4px 8px #ffffff',
      // Primary text color, dark cool blue for good readability
      textPrimary: '#2F4F6F', // A dark desaturated blue
      // Secondary text color, slightly lighter cool blue
      textSecondary: '#5A7D9D', // A medium desaturated blue
      // Muted text color for less important information
      textMuted: '#8BA6BE', // A lighter desaturated blue
      // Accent color, a vibrant, clear blue for interactive elements
      accent: '#2196F3', // Standard Material Design Blue 500
      // Accent color on hover, slightly darker clear blue
      accentHover: '#1976D2', // Standard Material Design Blue 700
      // Surface color (e.g., for main content areas)
      surface: '#F0F5F8',
      // Alternative surface color for subtle differentiation
      surfaceAlt: '#E6F0F5'
    };
  }

  private getDarkTheme() {
    return {
      //Dark background gradient, deep desaturated icy blue
      bg: 'linear-gradient(135deg, #1A2E3D 0%, #294050 100%)', // Very dark icy blue to slightly lighter
      // Dark card background with subtle gradient
      cardBg: 'linear-gradient(145deg, #294050, #1A2E3D)',
      // Dark mode card shadow, maintaining the "light source" feel in icy tones
      cardShadow: '6px 6px 12px #101B24, -6px -6px 12px #3c5d76',
      // Dark mode button background
      buttonBg: 'linear-gradient(145deg, #294050, #1A2E3D)',
      // Dark mode button shadow
      buttonShadow: '4px 4px 8px #101B24, -4px -4px 8px #3c5d76',
      // Dark mode button pressed state background
      buttonPressedBg: 'linear-gradient(145deg, #101B24, #294050)',
      // Dark mode button pressed state inset shadow
      buttonPressedShadow: 'inset 4px 4px 8px #101B24, inset -4px -4px 8px #3c5d76',
      // Primary text color for dark mode, light icy blue for readability
      textPrimary: '#EBF2F7', // Very light icy blue
      // Secondary text color for dark mode, slightly darker light icy blue
      textSecondary: '#C8D8E5', // Light icy blue
      // Muted text color for dark mode
      textMuted: '#9ABDD4', // Medium icy blue
      // Accent color, same vibrant clear blue as light theme for consistency
      accent: '#2196F3', // Standard Material Design Blue 500
      // Accent color on hover for dark mode, a brighter variant for better pop
      accentHover: '#42A5F5', // Standard Material Design Blue 400
      // Surface color for dark mode
      surface: '#1A2E3D',
      // Alternative surface color for dark mode
      surfaceAlt: '#294050'
    };
  }
}