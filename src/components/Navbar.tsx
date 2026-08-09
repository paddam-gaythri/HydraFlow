import React, { useState, useEffect } from 'react';
import {
  Droplet,
  LayoutDashboard,
  Calendar,
  History as HistoryIcon,
  Settings,
  Sparkles,
  Globe,
  Sun,
  Moon,
  Laptop,
  Menu,
  X,
  Clock,
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { getTranslation } from '../i18n/translations';
import { getISTDisplayClock } from '../utils/time';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  theme,
  setTheme,
}) => {
  const [istTime, setIstTime] = useState<string>(getISTDisplayClock());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIstTime(getISTDisplayClock());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const t = (key: string) => getTranslation(language, key);

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'schedule', label: t('schedule'), icon: Calendar },
    { id: 'history', label: t('history'), icon: HistoryIcon },
    { id: 'settings', label: t('settings'), icon: Settings },
    { id: 'upgrade', label: t('upgrade'), icon: Sparkles, highlight: true },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/15 bg-white/10 dark:bg-slate-950/40 backdrop-blur-2xl transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')} id="nav-brand-logo">
            <div className="w-10 h-10 rounded-xl bg-white/20 p-2 border border-white/30 shadow-lg flex items-center justify-center">
              <Droplet className="w-6 h-6 text-teal-200 fill-teal-200" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                Hydra<span className="font-light text-teal-200">IST</span>
              </span>
              <span className="hidden sm:inline-block text-xs text-teal-100/70 ml-2 font-medium">
                {t('appTagline')}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/20 text-white font-bold border border-white/30 shadow-sm backdrop-blur-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  } ${item.highlight ? 'text-amber-200 font-semibold' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-200' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Clock Badge, Language & Theme */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* IST Clock Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/20 border border-white/15 text-xs font-semibold text-teal-200 shadow-inner" id="ist-clock-badge">
              <Clock className="w-3.5 h-3.5 text-teal-300 animate-spin-slow" />
              <span>{istTime}</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setThemeMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white flex items-center space-x-1 text-xs font-semibold"
                id="language-selector-btn"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-teal-300" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900/90 border border-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl py-1 z-50 text-white">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        language === l.code
                          ? 'bg-teal-500/30 text-teal-200 font-bold border-l-2 border-teal-300'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                      id={`lang-option-${l.code}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeMenuOpen(!themeMenuOpen);
                  setLangMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white"
                id="theme-toggle-btn"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-amber-300" />
                ) : theme === 'light' ? (
                  <Sun className="w-4 h-4 text-amber-200" />
                ) : (
                  <Laptop className="w-4 h-4 text-teal-200" />
                )}
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-900/90 border border-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl py-1 z-50 text-white">
                  <button
                    onClick={() => {
                      setTheme('light');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center space-x-2 ${
                      theme === 'light' ? 'text-teal-200 font-bold' : 'text-white/80 hover:bg-white/10'
                    }`}
                    id="theme-option-light"
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>{t('themeLight')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center space-x-2 ${
                      theme === 'dark' ? 'text-teal-200 font-bold' : 'text-white/80 hover:bg-white/10'
                    }`}
                    id="theme-option-dark"
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>{t('themeDark')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('system');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center space-x-2 ${
                      theme === 'system' ? 'text-teal-200 font-bold' : 'text-white/80 hover:bg-white/10'
                    }`}
                    id="theme-option-system"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>{t('themeSystem')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/20 bg-slate-900/90 backdrop-blur-2xl px-4 pt-2 pb-4 space-y-2 text-white">
          <div className="px-3 py-2 bg-black/30 rounded-xl text-xs font-semibold text-teal-200 flex items-center justify-between mb-2">
            <span>{t('istNotice')}</span>
            <span>{istTime}</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-teal-400 text-teal-950 font-bold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
                id={`mobile-nav-item-${item.id}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/80 border-t border-white/20 backdrop-blur-2xl flex items-center justify-around py-2 shadow-2xl text-white">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center text-[10px] font-medium py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-teal-300 font-bold' : 'text-white/60'
              }`}
              id={`bottom-nav-item-${item.id}`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-teal-300' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
