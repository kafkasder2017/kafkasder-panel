import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ICONS } from '../constants/icons';
import ThemeToggle from './ThemeToggle';
import { Search, Bell, Settings, Menu, Sparkles, Bot, User, Heart } from 'lucide-react';

interface HeaderProps {
  unreadCount: number;
  title: string;
  onMenuClick: () => void;
  onSmartSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ unreadCount, title, onMenuClick, onSmartSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSmartSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <header className="h-20 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl border-b border-blue-100/50 dark:border-zinc-700/50 flex items-center justify-between px-6 lg:px-8 fixed top-0 left-0 right-0 z-40 lg:left-80 shadow-lg shadow-blue-500/10 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-indigo-50/30 dark:from-zinc-800/50 dark:to-zinc-900/50"></div>
      
      <div className="relative flex items-center space-x-4 z-10">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-3 rounded-2xl text-gray-600 dark:text-zinc-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-105 group" 
          aria-label="Menüyü aç"
        >
          <Menu className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 animate-pulse">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              {title}
            </h2>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">AI Destekli Panel</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Smart Search */}
      <div className="relative flex-1 px-4 lg:px-8 max-w-2xl">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🤖 AI Destekli Arama (örn: 'Ankara'daki aktif gönüllüler')"
              className="block w-full bg-gradient-to-r from-white to-blue-50/50 dark:from-zinc-800 dark:to-zinc-700 border border-blue-200 dark:border-zinc-600 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent shadow-md hover:shadow-lg focus:shadow-xl transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-zinc-400"
              aria-label="AI destekli akıllı arama"
              role="searchbox"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <Bot className="h-3 w-3 text-white" />
                <span className="text-xs text-white font-bold">AI</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <div className="relative flex items-center space-x-3 z-10">
        <ThemeToggle />
        
        {/* Notifications with enhanced design */}
        <ReactRouterDOM.NavLink 
          to="/bildirimler" 
          className="relative p-3 rounded-2xl text-gray-500 dark:text-zinc-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 group"
          aria-label={`Bildirimler ${unreadCount > 0 ? `(${unreadCount} okunmamış)` : ''}`}
        >
          <Bell className="h-6 w-6 group-hover:animate-bounce" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 flex">
              <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-xs font-bold text-white shadow-lg shadow-red-500/50 animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </div>
          )}
        </ReactRouterDOM.NavLink>
        
        {/* Settings with enhanced design */}
        <ReactRouterDOM.NavLink 
          to="/ayarlar/genel" 
          className="p-3 rounded-2xl text-gray-500 dark:text-zinc-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 group"
          aria-label="Sistem ayarları"
        >
          <Settings className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </ReactRouterDOM.NavLink>
        
        {/* Profile button */}
        <ReactRouterDOM.NavLink 
          to="/profil" 
          className="p-3 rounded-2xl text-gray-500 dark:text-zinc-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 group"
          aria-label="Kullanıcı profili"
        >
          <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </ReactRouterDOM.NavLink>
      </div>
    </header>
  );
};
