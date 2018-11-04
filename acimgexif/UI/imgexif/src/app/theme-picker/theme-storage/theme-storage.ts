import {Injectable, EventEmitter} from '@angular/core';

export interface AppSiteTheme {
  name: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}


@Injectable()
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current-name';

  onThemeUpdate: EventEmitter<AppSiteTheme> = new EventEmitter<AppSiteTheme>();

  storeTheme(theme: AppSiteTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch { }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch { }
  }
}
