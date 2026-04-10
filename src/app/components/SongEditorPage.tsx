import { useParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { Volume2, Music, Timer, Download, Minus, Plus, Music2, FileText, Play, AlertCircle } from 'lucide-react';
import { Toast } from './ui/toast';
import { generateWaveformData } from '../utils/waveform';
import { useTheme } from '../contexts/ThemeContext';

// Track colors driven by brand accent/warm plus a third
const TRACK_COLORS = ['#7c5fa0', '#c47a8a', '#5b8fa8'];
const TRACK_COLORS_DARK = ['#c4a0e0', '#e8b4b0', '#7bbcd4'];

const stems = ['Drums', 'Bass', 'Guitar'];

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const KEYS = ['C Major', 'C# Major', 'D Major', 'D# Major', 'E Major', 'F Major', 'F# Major', 'G Major', 'G# Major', 'A Major', 'A# Major', 'B Major'];
const BASE_CHORDS = ['C', 'F', 'G', 'Am', 'C', 'F', 'G', 'C'];

function transposeChord(chord: string, semitones: number): string {
  const isMinor = chord.includes('m');
  const baseNote = chord.replace('m', '');
  const noteIndex = NOTES.indexOf(baseNote);
  if (noteIndex === -1) return chord;
  const newIndex = (noteIndex + semitones + 12) % 12;
  return NOTES[newIndex] + (isMinor ? 'm' : '');
}

function getTransposedChords(targetKey: string): string[] {
  const keyIndex = KEYS.indexOf(targetKey);
  return BASE_CHORDS.map(chord => transposeChord(chord, keyIndex));
}

export function SongEditorPage() {
  const { songId } = useParams();
  const { isDark, accentColor } = useTheme();
  const songName = songId?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'My song';
  const trackColors = isDark ? TRACK_COLORS_DARK : TRACK_COLORS;

  const [muteStates, setMuteStates] = useState<{ [key: string]: boolean }>({});
  const [soloStates, setSoloStates] = useState<{ [key: string]: boolean }>({});
  const [showMetronome, setShowMetronome] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [key, setKey] = useState('C Major');
  const [metronomeOn, setMetronomeOn] = useState(false);
  const [countIn, setCountIn] = useState(false);
  const [exportFormat, setExportFormat] = useState('MP3');
  const [viewMode, setViewMode] = useState<'stems' | 'sheets'>('stems');
  const [showDemoWarning, setShowDemoWarning] = useState(false);

  const metronomeRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (metronomeRef.current && !metronomeRef.current.contains(event.target as Node)) setShowMetronome(false);
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) setShowExport(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMute = (trackName: string) => setMuteStates(prev => ({ ...prev, [trackName]: !prev[trackName] }));
  const toggleSolo = (trackName: string) => setSoloStates(prev => ({ ...prev, [trackName]: !prev[trackName] }));

  const keys = KEYS;
  const cycleKey = (direction: 'up' | 'down') => {
    const ci = keys.indexOf(key);
    setKey(direction === 'up' ? keys[(ci + 1) % keys.length] : keys[(ci - 1 + keys.length) % keys.length]);
  };

  const transposedChords = getTransposedChords(key);

  const DropdownPanel = ({ children }: { children: React.ReactNode }) => (
    <div
      className="absolute top-full mt-2 right-0 w-80 rounded-2xl p-6 z-50 shadow-2xl border"
      style={{ background: 'var(--brand-modal)', borderColor: 'var(--brand-border)' }}
    >
      {children}
    </div>
  );

  const ToggleRow = ({ label, icon: Icon, active, onClick }: { label: string; icon: React.ElementType; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
      style={
        active
          ? { background: 'var(--brand-active)', borderColor: 'var(--brand-active-border)' }
          : { background: 'var(--brand-card-hover)' }
      }
    >
      <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--brand-text)' }}>
        <Icon className="w-4 h-4" style={{ color: accentColor }} />
        {label}
      </span>
      <div
        className="w-10 h-6 rounded-full relative transition-colors"
        style={{ background: active ? accentColor : 'var(--brand-border)' }}
      >
        <div
          className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
          style={{ transform: active ? 'translateX(18px)' : 'translateX(2px)' }}
        />
      </div>
    </button>
  );

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">{songName}</h1>

        <div className="flex gap-4 relative">
          {/* Metronome */}
          <div className="relative" ref={metronomeRef}>
            <button
              className="rounded-full border px-4 py-2.5 text-sm flex items-center gap-2 transition-colors"
              style={{
                background: 'var(--brand-card)',
                borderColor: 'var(--brand-border)',
                color: 'var(--brand-muted)',
              }}
              onClick={() => { setShowMetronome(!showMetronome); setShowExport(false); }}
            >
              <Timer className="w-4 h-4" />
              Metronome
            </button>

            {showMetronome && (
              <DropdownPanel>
                <div className="mb-6">
                  <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>BPM</div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setBpm(Math.max(40, bpm - 1))}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-text)' }}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-4xl w-24 text-center" style={{ color: 'var(--brand-text)', fontFamily: 'var(--font-heading)' }}>
                      {bpm}
                    </div>
                    <button
                      onClick={() => setBpm(Math.min(300, bpm + 1))}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-text)' }}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>Key</div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => cycleKey('down')}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-text)' }}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-xl w-32 text-center" style={{ color: 'var(--brand-text)' }}>{key}</div>
                    <button
                      onClick={() => cycleKey('up')}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-text)' }}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--brand-border)' }}>
                  <ToggleRow label="Metronome" icon={Timer} active={metronomeOn} onClick={() => setMetronomeOn(!metronomeOn)} />
                  <ToggleRow label="Count In" icon={Timer} active={countIn} onClick={() => setCountIn(!countIn)} />
                </div>
              </DropdownPanel>
            )}
          </div>

          {/* Export */}
          <div className="relative" ref={exportRef}>
            <button
              className="rounded-full px-4 py-2.5 text-sm flex items-center gap-2 text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, var(--brand-accent), var(--brand-warm))` }}
              onClick={() => { setShowExport(!showExport); setShowMetronome(false); }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            {showExport && (
              <DropdownPanel>
                <div className="mb-6">
                  <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>File Format</div>
                  <div className="flex gap-2">
                    {['MP3', 'M4A', 'WAV'].map((format) => (
                      <button
                        key={format}
                        onClick={() => setExportFormat(format)}
                        className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm"
                        style={
                          exportFormat === format
                            ? { background: accentColor, color: 'white' }
                            : { background: 'var(--brand-card-hover)', color: 'var(--brand-muted)' }
                        }
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>Stems</div>
                  <div className="space-y-2">
                    {stems.map((stem) => (
                      <button
                        key={stem}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-sm"
                        style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-text)' }}
                      >
                        <Music2 className="w-4 h-4" style={{ color: accentColor }} />
                        <span>{stem}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'var(--brand-border)' }}>
                  <button
                    className="w-full py-3 px-4 rounded-lg text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, var(--brand-accent), var(--brand-warm))` }}
                  >
                    <Download className="w-4 h-4" />
                    Export All Stems
                  </button>
                  <button
                    className="w-full py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-muted)' }}
                  >
                    <FileText className="w-4 h-4" />
                    Export Lead Sheets
                  </button>
                  <button
                    className="w-full py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    style={{ background: 'var(--brand-card-hover)', color: 'var(--brand-muted)' }}
                  >
                    <Music className="w-4 h-4" />
                    Export Mix
                  </button>
                </div>
              </DropdownPanel>
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Panel */}
      <div
        className="backdrop-blur-sm rounded-3xl p-8 border"
        style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
      >
        {viewMode === 'stems' ? (
          <>
            {/* Bars/Beats header */}
            <div className="mb-6 flex items-center gap-4">
              <div className="w-24" />
              <div className="w-16" />
              <div className="flex-1 h-8 flex items-center border-b" style={{ borderColor: 'var(--brand-border)' }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={`bar-${i}`} className="flex-1 relative">
                    <div
                      className="absolute left-0 top-0 h-2 w-px"
                      style={{ background: 'var(--brand-border)' }}
                    />
                    <span className="absolute left-1 top-0 text-xs" style={{ color: 'var(--brand-subtle)' }}>
                      {i + 1}
                    </span>
                    <div className="flex justify-around mt-4">
                      {[1, 2, 3, 4].map((beat) => (
                        <div key={`beat-${i}-${beat}`} className="w-px h-1" style={{ background: 'var(--brand-border)' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {stems.map((stemName, idx) => {
                const color = trackColors[idx];
                return (
                  <div key={stemName} className="flex items-center gap-4">
                    <div className="w-24 flex items-center gap-2">
                      <span className="text-sm" style={{ color: 'var(--brand-text)' }}>{stemName}</span>
                    </div>

                    <div className="flex gap-2">
                      {['M', 'S'].map((btn, bIdx) => {
                        const active = bIdx === 0 ? muteStates[stemName] : soloStates[stemName];
                        const toggle = bIdx === 0 ? () => toggleMute(stemName) : () => toggleSolo(stemName);
                        return (
                          <button
                            key={btn}
                            onClick={toggle}
                            className="w-8 h-8 rounded border flex items-center justify-center text-xs transition-colors"
                            style={
                              active
                                ? { background: color, color: 'white', borderColor: color }
                                : { background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }
                            }
                          >
                            {btn}
                          </button>
                        );
                      })}
                    </div>

                    <div
                      className="flex-1 h-24 rounded-xl overflow-hidden relative"
                      style={{ background: `${color}18` }}
                    >
                      <div className="h-full flex items-center px-4">
                        {generateWaveformData(80, 10 + idx * 5).map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 mx-px"
                            style={{ 
                              height: `${height}%`, 
                              background: 'linear-gradient(to top, var(--brand-waveform-from), var(--brand-waveform-to))',
                              opacity: 0.8
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="space-y-16 py-8">
            {[0, 1].map((staffIndex) => (
              <div key={staffIndex} className="relative px-8">
                <div className="relative" style={{ height: '80px' }}>
                  {[0, 1, 2, 3, 4].map((lineIndex) => (
                    <div
                      key={lineIndex}
                      className="absolute w-full"
                      style={{ top: `${lineIndex * 20}px`, height: '1px', background: 'var(--brand-border)' }}
                    />
                  ))}

                  <div className="absolute" style={{ left: '0px', top: '-8px', fontSize: '100px', lineHeight: '1', color: 'var(--brand-text)', opacity: 0.8 }}>
                    𝄞
                  </div>

                  <div className="absolute flex flex-col items-center" style={{ left: '55px', top: '14px', color: 'var(--brand-text)' }}>
                    <span className="text-2xl leading-none">4</span>
                    <span className="text-2xl leading-none">4</span>
                  </div>

                  <div className="absolute flex" style={{ left: '90px', right: '0', top: '0', height: '80px' }}>
                    {transposedChords.slice(staffIndex * 4, staffIndex * 4 + 4).map((chord, i) => (
                      <div key={i} className="flex-1 relative">
                        <div
                          className="absolute text-base"
                          style={{ top: '-28px', left: '12px', color: accentColor, fontFamily: 'var(--font-subheading)' }}
                        >
                          {chord}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-around px-4">
                          {[1, 2, 3, 4].map((beat) => (
                            <span
                              key={beat}
                              className="text-2xl"
                              style={{ transform: 'rotate(20deg)', color: 'var(--brand-muted)' }}
                            >
                              /
                            </span>
                          ))}
                        </div>
                        <div className="absolute right-0" style={{ top: 0, bottom: 0, width: '1px', background: 'var(--brand-border)' }} />
                      </div>
                    ))}
                  </div>

                  {staffIndex === 1 && (
                    <>
                      <div className="absolute" style={{ top: 0, bottom: 0, right: '-2px', width: '1px', background: 'var(--brand-border)' }} />
                      <div className="absolute" style={{ top: 0, bottom: 0, right: 0, width: '3px', background: 'var(--brand-muted)' }} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t" style={{ borderColor: 'var(--brand-border)' }}>
          <div className="flex gap-4 items-center">
            <button
              className="rounded-full px-8 py-2.5 text-sm text-white flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, var(--brand-accent), var(--brand-warm))` }}
              onClick={() => setShowDemoWarning(true)}
            >
              <Play className="w-4 h-4" />
              Play
            </button>

            <div
              className="flex gap-2 rounded-full p-1"
              style={{ background: 'var(--brand-card-hover)' }}
            >
              {[
                { mode: 'stems' as const, Icon: Music2, label: 'Stem View' },
                { mode: 'sheets' as const, Icon: FileText, label: 'Sheet View' },
              ].map(({ mode, Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm"
                  style={
                    viewMode === mode
                      ? { background: 'var(--brand-card-strong)', color: 'var(--brand-text)' }
                      : { color: 'var(--brand-muted)' }
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {viewMode === 'stems' && (
            <div className="flex gap-4">
              {['Chords', 'Lyrics'].map((btn) => (
                <button
                  key={btn}
                  className="rounded-full px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, var(--brand-accent), var(--brand-warm))` }}
                >
                  {btn}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDemoWarning && (
        <Toast message="This is an educational prototype." onClose={() => setShowDemoWarning(false)} />
      )}
    </div>
  );
}