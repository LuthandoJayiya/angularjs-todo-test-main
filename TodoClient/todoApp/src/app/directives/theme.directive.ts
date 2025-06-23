import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/theme.service';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appTheme') themeKey: string = '';
  private themeSub?: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Apply initial theme
    this.applyTheme(this.themeService.getCurrentTheme());

    // Listen for theme changes
    this.themeSub = this.themeService.themeChanges().subscribe((theme) => {
      this.applyTheme(theme);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['themeKey']) {
      this.applyTheme(this.themeService.getCurrentTheme());
    }
  }

  private applyTheme(theme: any) {
    const styles = this.resolveStyles(theme);

    for (const [key, value] of Object.entries(styles)) {
      this.renderer.setStyle(this.el.nativeElement, key, value);
    }
  }

  private resolveStyles(theme: any): { [key: string]: string } {
    switch (this.themeKey) {
      case 'bg':
        return { background: theme.bg };
      case 'card':
        return {
          background: theme.cardBg,
          boxShadow: theme.cardShadow,
          color: theme.textPrimary
        };
      case 'button':
        return {
          background: theme.buttonBg,
          boxShadow: theme.buttonShadow,
          color: theme.textPrimary
        };
      case 'button-pressed':
        return {
          background: theme.buttonPressedBg,
          boxShadow: theme.buttonPressedShadow,
          color: theme.textPrimary
        };
      case 'textPrimary':
        return { color: theme.textPrimary };
      case 'textSecondary':
        return { color: theme.textSecondary };
      case 'textMuted':
        return { color: theme.textMuted };
      case 'surface':
        return { background: theme.surface };
      case 'surfaceAlt':
        return { background: theme.surfaceAlt };
      default:
        return {};
    }
  }

  ngOnDestroy() {
    this.themeSub?.unsubscribe();
  }
}
