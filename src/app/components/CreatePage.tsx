import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { Toast } from './ui/toast';
import { Info, Wand2, Upload, Music, X, ChevronDown, ChevronUp, Play, Plus, Trash2, Pause } from 'lucide-react';
import { STANDARD_WAVEFORMS } from '../utils/waveform';
import { useTheme } from '../contexts/ThemeContext';

const musicGenres = [
  'Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Hip Hop', 'R&B', 'Country', 'Blues',
  'Reggae', 'Folk', 'Latin', 'Metal', 'Punk', 'Indie', 'Alternative', 'Soul', 'Funk',
  'Disco', 'House', 'Techno', 'Trance', 'Dubstep', 'Drum and Bass', 'Ambient', 'Lo-Fi',
  'Trap', 'Grime', 'K-Pop', 'J-Pop', 'Ska', 'Grunge', 'Emo', 'Hardcore', 'Experimental',
  'Synthwave', 'Vaporwave', 'Chillwave', 'Dream Pop', 'Shoegaze', 'Post-Rock', 'Math Rock',
];

const models = [
  { id: 'small', name: 'MusicGen Small', description: 'Fast generation, good quality' },
  { id: 'medium', name: 'MusicGen Medium', description: 'Balanced speed and quality' },
  { id: 'large', name: 'MusicGen Large', description: 'Best quality, slower generation' },
];

const existingProjects = [
  { id: 1, name: 'Electronic Exploration' },
  { id: 2, name: 'Jazz Variations' },
  { id: 3, name: 'Pop Song Studies' },
];

export function CreatePage() {
  const navigate = useNavigate();
  const { accentColor } = useTheme();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showGenreSuggestions, setShowGenreSuggestions] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [selectedModel, setSelectedModel] = useState('small');
  const [creativity, setCreativity] = useState([50]);
  const [structure, setStructure] = useState([50]);
  const [styleInfluence, setStyleInfluence] = useState([50]);
  const [duration, setDuration] = useState([30]);
  const [generatedAudio, setGeneratedAudio] = useState(false);
  const [showOutputPreview, setShowOutputPreview] = useState(false);
  const [showAddToProjectModal, setShowAddToProjectModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [outputPreviewName, setOutputPreviewName] = useState('');
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleCreate = () => {
    setGeneratedAudio(true);
    setShowOutputPreview(true);
  };

  const handleAddToProject = () => setShowAddToProjectModal(true);

  const handleSaveToProject = () => {
    setShowAddToProjectModal(false);
    setShowSaveToast(true);
  };

  const handleDelete = () => {
    setGeneratedAudio(false);
    setShowOutputPreview(false);
  };

  const filteredGenres = musicGenres.filter(
    genre => genre.toLowerCase().includes(genreInput.toLowerCase()) && !selectedGenres.includes(genre)
  );

  const handleGenreSelect = (genre: string) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenreInput('');
    setShowGenreSuggestions(false);
  };

  const handleGenreInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreInput(e.target.value);
    setShowGenreSuggestions(e.target.value.length > 0);
  };

  const handleGenreKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && genreInput.trim()) {
      e.preventDefault();
      if (filteredGenres.length > 0) {
        handleGenreSelect(filteredGenres[0]);
      } else if (!selectedGenres.includes(genreInput.trim())) {
        setSelectedGenres([...selectedGenres, genreInput.trim()]);
        setGenreInput('');
        setShowGenreSuggestions(false);
      }
    }
  };

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genre));
  };

  useEffect(() => {
    const currentRef = audioRef.current;
    if (currentRef) {
      currentRef.addEventListener('ended', () => setIsPlaying(false));
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, []);

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-4xl mb-2">Create</h1>
      <p className="mb-12" style={{ color: 'var(--brand-muted)' }}>
        Generate music with AI — experiment and learn
      </p>

      <div className="space-y-6">
        {/* ── Intent Box ── */}
        <div
          className="backdrop-blur-sm rounded-3xl p-8 border"
          style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
        >
          <h2 className="text-xl mb-6 flex items-center gap-2">
            <Wand2 className="w-5 h-5" style={{ color: accentColor }} />
            Intent
          </h2>

          {/* Prompt */}
          <div className="mb-6">
            <label className="block text-sm mb-2" style={{ color: 'var(--brand-muted)' }}>
              Your Prompt
            </label>
            <Textarea
              placeholder="Describe the music you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none focus-visible:ring-0"
              style={{
                background: 'var(--brand-input)',
                borderColor: 'var(--brand-input-border)',
                color: 'var(--brand-text)',
              }}
            />
          </div>

          {/* Genre Tags */}
          <div className="mb-6">
            <label className="block text-sm mb-2" style={{ color: 'var(--brand-muted)' }}>
              Style / Genre Tags
            </label>
            {selectedGenres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedGenres.map((genre) => (
                  <div
                    key={genre}
                    className="px-3 py-1 rounded-full text-xs flex items-center gap-2 text-white"
                    style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                  >
                    <span>{genre}</span>
                    <button
                      onClick={() => removeGenre(genre)}
                      className="hover:opacity-70 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                value={genreInput}
                onChange={handleGenreInputChange}
                onKeyDown={handleGenreKeyDown}
                onFocus={() => setShowGenreSuggestions(genreInput.length > 0)}
                onBlur={() => setTimeout(() => setShowGenreSuggestions(false), 200)}
                placeholder="Type to search genres..."
                className="w-full border-b py-2 outline-none transition-colors text-sm"
                style={{
                  background: 'transparent',
                  borderColor: 'var(--brand-input-border)',
                  color: 'var(--brand-text)',
                }}
              />
              {showGenreSuggestions && filteredGenres.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-10 max-h-48 overflow-y-auto border"
                  style={{ background: 'var(--brand-modal)', borderColor: 'var(--brand-border)' }}
                >
                  {filteredGenres.slice(0, 10).map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreSelect(genre)}
                      className="w-full text-left px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--brand-text)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-card-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reference Audio */}
          <div className="mb-6">
            <label className="text-xs mb-2 block" style={{ color: 'var(--brand-muted)' }}>
              Reference Audio
            </label>
            <button
              onClick={() => setShowDemoWarning(true)}
              className="w-full rounded-xl border px-4 py-3 text-sm transition-colors text-left"
              style={{
                background: 'var(--brand-input)',
                borderColor: 'var(--brand-input-border)',
                color: 'var(--brand-muted)',
              }}
            >
              Upload Reference
            </button>
          </div>

          {/* Advanced Settings */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--brand-border)' }}>
            <button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="w-full flex items-center justify-between p-4 rounded-2xl transition-colors"
              style={{
                background: 'var(--brand-card-hover)',
                color: 'var(--brand-text)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-card-strong)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-card-hover)')}
            >
              <span className="text-lg">Advanced Settings</span>
              {showAdvancedSettings ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showAdvancedSettings && (
              <div className="mt-6 space-y-6">
                {/* Model Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm" style={{ color: 'var(--brand-text)' }}>Model</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="inline-flex items-center justify-center">
                          <Info className="w-4 h-4" style={{ color: 'var(--brand-subtle)' }} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Different models balance speed and quality. Larger models produce better results but take longer.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className="p-3 rounded-xl text-xs transition-all border"
                        style={
                          selectedModel === model.id
                            ? {
                                background: 'var(--brand-active)',
                                borderColor: 'var(--brand-active-border)',
                                color: 'var(--brand-text)',
                              }
                            : {
                                background: 'var(--brand-card)',
                                borderColor: 'var(--brand-border)',
                                color: 'var(--brand-muted)',
                              }
                        }
                      >
                        <div className="font-semibold mb-1">{model.name}</div>
                        <div className="text-[10px] opacity-70">{model.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="block text-sm" style={{ color: 'var(--brand-text)' }}>Duration</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="inline-flex items-center justify-center">
                          <Info className="w-4 h-4" style={{ color: 'var(--brand-subtle)' }} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Length of the generated audio clip in seconds.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider value={duration} onValueChange={setDuration} min={15} max={60} step={1} />
                  <div className="text-center text-sm mt-2" style={{ color: accentColor }}>
                    {duration[0]}s
                  </div>
                </div>

                {/* Creativity */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="block text-sm" style={{ color: 'var(--brand-text)' }}>Creativity</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="inline-flex items-center justify-center">
                          <Info className="w-4 h-4" style={{ color: 'var(--brand-subtle)' }} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Controls how experimental the AI is. Higher values produce more unique but less predictable results.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider value={creativity} onValueChange={setCreativity} max={100} step={1} />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--brand-subtle)' }}>
                    <span>Conservative</span>
                    <span>Experimental</span>
                  </div>
                </div>

                {/* Structure */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="block text-sm" style={{ color: 'var(--brand-text)' }}>
                      Structure / Coherence
                    </label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="inline-flex items-center justify-center">
                          <Info className="w-4 h-4" style={{ color: 'var(--brand-subtle)' }} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        How well-organized and musically consistent the output is.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider value={structure} onValueChange={setStructure} max={100} step={1} />
                </div>

                {/* Style Influence */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="block text-sm" style={{ color: 'var(--brand-text)' }}>
                      Style Influence
                    </label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="inline-flex items-center justify-center">
                          <Info className="w-4 h-4" style={{ color: 'var(--brand-subtle)' }} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        How closely the model follows the style tags you provided.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider value={styleInfluence} onValueChange={setStyleInfluence} max={100} step={1} />
                </div>

                {/* Lyrics */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--brand-muted)' }}>
                    Add Lyrics (Optional)
                  </label>
                  <Textarea
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    placeholder="Enter lyrics for the song..."
                    className="min-h-[80px] resize-none focus-visible:ring-0"
                    style={{
                      background: 'var(--brand-input)',
                      borderColor: 'var(--brand-input-border)',
                      color: 'var(--brand-text)',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="mt-6">
            <button
              className="w-full rounded-full py-4 text-lg text-white transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))',
                fontFamily: 'var(--font-body)',
              }}
              onClick={handleCreate}
            >
              Generate Music
            </button>
          </div>
        </div>

        {/* ── Output Preview ── */}
        {showOutputPreview && generatedAudio && (
          <div
            className="backdrop-blur-sm rounded-3xl p-8 border"
            style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
          >
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <Music className="w-5 h-5" style={{ color: accentColor }} />
              Output Preview
            </h2>

            <div
              className="mb-6 p-4 rounded-2xl"
              style={{ background: 'var(--brand-card-hover)' }}
            >
              <div className="h-32 flex items-center">
                {STANDARD_WAVEFORMS.medium.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-px"
                    style={{
                      height: `${height}%`,
                      background: 'linear-gradient(to top, var(--brand-waveform-from), var(--brand-waveform-to))',
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 rounded-full border px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-colors"
                style={{
                  background: 'var(--brand-card-hover)',
                  borderColor: 'var(--brand-border)',
                  color: 'var(--brand-text)',
                }}
                onClick={() => setShowDemoWarning(true)}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                Preview / Play
              </button>
              <button
                className="flex-1 rounded-full px-4 py-2.5 text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                onClick={handleAddToProject}
              >
                <Plus className="w-4 h-4" />
                Add to Project
              </button>
              <button
                className="flex-1 rounded-full border px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-colors"
                style={{
                  background: 'var(--brand-card-hover)',
                  borderColor: 'var(--brand-border)',
                  color: 'var(--brand-muted)',
                }}
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add to Project Modal ── */}
      {showAddToProjectModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowAddToProjectModal(false)}
        >
          <div
            className="rounded-3xl p-8 max-w-lg w-full border"
            style={{ background: 'var(--brand-modal)', borderColor: 'var(--brand-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-6">Add to Project</h2>

            <div className="mb-6">
              <label className="block text-sm mb-2" style={{ color: 'var(--brand-muted)' }}>
                Name Your Output
              </label>
              <input
                type="text"
                value={outputPreviewName}
                onChange={(e) => setOutputPreviewName(e.target.value)}
                placeholder="e.g., Lo-Fi Beat Experiment 1"
                className="w-full rounded-xl px-4 py-3 outline-none border transition-colors"
                style={{
                  background: 'var(--brand-input)',
                  borderColor: 'var(--brand-input-border)',
                  color: 'var(--brand-text)',
                }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>
                Select Project
              </label>
              <div className="space-y-2 mb-4">
                {existingProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setIsCreatingNewProject(false);
                    }}
                    className="w-full text-left p-4 rounded-xl border transition-all"
                    style={
                      selectedProjectId === project.id && !isCreatingNewProject
                        ? {
                            background: 'var(--brand-active)',
                            borderColor: 'var(--brand-active-border)',
                            color: 'var(--brand-text)',
                          }
                        : {
                            background: 'var(--brand-card)',
                            borderColor: 'var(--brand-border)',
                            color: 'var(--brand-muted)',
                          }
                    }
                  >
                    {project.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsCreatingNewProject(true);
                  setSelectedProjectId(null);
                }}
                className="w-full text-left p-4 rounded-xl border transition-all"
                style={
                  isCreatingNewProject
                    ? {
                        background: 'var(--brand-active)',
                        borderColor: 'var(--brand-active-border)',
                        color: 'var(--brand-text)',
                      }
                    : {
                        background: 'var(--brand-card)',
                        borderColor: 'var(--brand-border)',
                        color: 'var(--brand-muted)',
                      }
                }
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create New Project
              </button>

              {isCreatingNewProject && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter new project name..."
                    className="w-full rounded-xl px-4 py-3 outline-none border transition-colors"
                    style={{
                      background: 'var(--brand-input)',
                      borderColor: 'var(--brand-input-border)',
                      color: 'var(--brand-text)',
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 rounded-full border px-4 py-3 text-sm transition-colors"
                style={{
                  background: 'var(--brand-card)',
                  borderColor: 'var(--brand-border)',
                  color: 'var(--brand-muted)',
                }}
                onClick={() => setShowAddToProjectModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 rounded-full px-4 py-3 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                onClick={handleSaveToProject}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDemoWarning && (
        <Toast
          message="This is an educational prototype."
          onClose={() => setShowDemoWarning(false)}
        />
      )}
      {showSaveToast && (
        <Toast
          message="Saved projects will appear in the Projects section. This demo only shows workflow."
          onClose={() => setShowSaveToast(false)}
        />
      )}
    </div>
  );
}