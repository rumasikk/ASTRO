import { useState } from 'react';
import gamesData from './data/games.json';
import { Rocket, ArrowLeft, Search, Sparkles } from 'lucide-react';

export default function App() {
  const [games] = useState(gamesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative overflow-hidden">
      {/* Astro Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-black -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent -z-10 blur-3xl"></div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-950/60 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg shadow-indigo-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="relative">
              <Rocket className="w-8 h-8 text-indigo-400 group-hover:-translate-y-1 transition-transform duration-300" />
              <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
              ASTRO
            </h1>
          </div>
          
          {!selectedGame && (
            <div className="relative hidden sm:block w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-indigo-400/70" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-indigo-500/30 rounded-full leading-5 bg-slate-900/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 sm:text-sm transition-all duration-300 shadow-inner"
                placeholder="Search the cosmos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedGame ? (
          <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-indigo-500/20 border border-transparent hover:border-indigo-500/30"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Return to Orbit</span>
              </button>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                {selectedGame.title}
              </h2>
            </div>
            <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-indigo-500/30 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] relative group">
              <div className="absolute inset-0 border border-indigo-400/20 rounded-2xl pointer-events-none z-10"></div>
              <iframe
                src={selectedGame.iframeUrl}
                title={selectedGame.title}
                className="w-full h-full border-0 relative z-0"
                allow="autoplay; fullscreen; gamepad"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="sm:hidden mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-indigo-400/70" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-indigo-500/30 rounded-full leading-5 bg-slate-900/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 text-base transition-all duration-300 shadow-inner"
                placeholder="Search the cosmos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredGames.length === 0 ? (
              <div className="text-center py-32 flex flex-col items-center">
                <div className="relative">
                  <Rocket className="w-16 h-16 text-slate-700 mb-4" />
                  <Sparkles className="w-6 h-6 text-slate-600 absolute -top-2 -right-4" />
                </div>
                <p className="text-slate-400 text-lg font-medium">No signals found for "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-6 py-2 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors border border-indigo-500/20"
                >
                  Clear radar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-8">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group cursor-pointer bg-slate-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-400/60 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] hover:-translate-y-2"
                  >
                    <div className="aspect-square bg-black/50 relative overflow-hidden flex items-center justify-center p-6">
                      {/* Starry background effect for thumbnails */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {game.textIcon ? (
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-fuchsia-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)] group-hover:scale-110 transition-transform duration-700 ease-out">
                            {game.textIcon}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(game.title)}&background=0f172a&color=818cf8&size=256`;
                          }}
                        />
                      )}
                    </div>
                    <div className="p-5 border-t border-indigo-500/10 bg-gradient-to-b from-transparent to-slate-900/80">
                      <h3 className="font-bold text-slate-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all truncate text-center">
                        {game.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
