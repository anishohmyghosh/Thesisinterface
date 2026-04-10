import { useNavigate } from 'react-router';

const songs = [
  { id: 'my-song-2', name: 'My song 2', tempo: '120 BPM', key: 'C Major' },
  { id: 'chord-ideas', name: 'Chord ideas', tempo: '95 BPM', key: 'G Minor' },
  { id: 'jazz-melody', name: 'Jazz Melody', tempo: '140 BPM', key: 'E♭ Major' },
  { id: 'my-song-1', name: 'My song #1', tempo: '110 BPM', key: 'D Major' },
  { id: 'collaboration-project', name: 'Collaboration project', tempo: '128 BPM', key: 'A Minor' },
];

export function LibraryPage() {
  const navigate = useNavigate();

  const handleSongClick = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-12">Library</h1>

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-3 text-sm opacity-60 border-b border-white/10">
            <div>Song Name</div>
            <div>Tempo</div>
            <div>Key</div>
          </div>

          {/* Song List */}
          {songs.map((song) => (
            <button
              key={song.id}
              onClick={() => handleSongClick(song.id)}
              className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-4 w-full text-left rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="group-hover:text-[#F47321] transition-colors">{song.name}</div>
              <div className="opacity-80">{song.tempo}</div>
              <div className="opacity-80">{song.key}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
