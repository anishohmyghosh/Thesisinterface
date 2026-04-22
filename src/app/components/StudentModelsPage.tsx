import { useState, useEffect } from 'react';
import { Music, User, Play, Heart, Music2, Clapperboard, Layers, Target, Music4, Gamepad2 } from 'lucide-react';
import { Toast } from './ui/toast';
import { generateWaveformData } from '../utils/waveform';
import { useTheme } from '../contexts/ThemeContext';

const studentModels = [
  { id: 1, name: 'VariGen', author: 'Chenyu Gao', style: 'MIDI Variation', description: 'Generates MIDI variations for melodies', liked: false, date: 'May 2026', icon: 'music2' },
  { id: 2, name: 'UpmixAI', author: 'Nicholas Tong', style: 'Audio Upmixing', description: 'Automatic conversion of stereo to multi-channel surround sound', liked: false, date: 'May 2025', icon: 'clapperboard' },
  { id: 3, name: 'StemSplit', author: 'Brandon Ferrante', style: 'Source Separation', description: 'Real-time music source separation for live performance and production', liked: false, date: 'May 2025', icon: 'layers' },
  { id: 4, name: 'Measure By Measure', author: 'Eli Yaroch', style: 'Difficulty Assessment', description: 'AI-driven music difficulty estimation for educational applications', liked: false, date: 'May 2025', icon: 'music4' },
  { id: 5, name: 'Audiovisual Zooming', author: 'Sourav Pande', style: 'Audio Enhancement', description: 'Selective audio amplification and noise reduction using ML', liked: false, date: 'May 2024', icon: 'target' },
  { id: 6, name: 'ProceduralFX', author: 'Ashay Dave', style: 'Procedural Audio', description: 'Real-time object-based sound synthesis for virtual environments', liked: false, date: 'May 2024', icon: 'gamepad' },
];

export function StudentModelsPage() {
  const { accentColor, accentWarm } = useTheme();
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [likedModels, setLikedModels] = useState(studentModels.filter(m => m.liked).map(m => m.id));
  const [showDemoWarning, setShowDemoWarning] = useState(false);

  useEffect(() => {
    if (selectedModel) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedModel]);

  const toggleLike = (modelId: number) => {
    setLikedModels(prev =>
      prev.includes(modelId) ? prev.filter(id => id !== modelId) : [...prev, modelId]
    );
  };

  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case 'music2': return Music2;
      case 'clapperboard': return Clapperboard;
      case 'layers': return Layers;
      case 'target': return Target;
      case 'music4': return Music4;
      case 'gamepad': return Gamepad2;
      default: return Music;
    }
  };

  const model = selectedModel ? studentModels.find(m => m.id === selectedModel) : null;

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div
      className="p-4 rounded-xl"
      style={{ background: 'var(--brand-card-hover)' }}
    >
      <div className="mb-2" style={{ color: 'var(--brand-text)', fontFamily: 'var(--font-subheading)' }}>
        {title}
      </div>
      <div className="text-sm" style={{ color: 'var(--brand-muted)' }}>{children}</div>
    </div>
  );

  const PlayBtn = ({ label, primary = false, onClick }: { label: string; primary?: boolean; onClick: () => void }) => (
    <button
      className="rounded-full px-8 py-2.5 text-sm flex items-center gap-2 text-white transition-opacity hover:opacity-90"
      style={{
        background: primary
          ? `linear-gradient(135deg, ${accentColor}, ${accentWarm})`
          : 'var(--brand-card-hover)',
        border: primary ? 'none' : '1px solid var(--brand-border)',
        color: primary ? 'white' : 'var(--brand-muted)',
      }}
      onClick={onClick}
    >
      <Play className="w-4 h-4" />
      {label}
    </button>
  );

  if (model) {
    const isLiked = likedModels.includes(model.id);
    const isVariGen = model.id === 1;
    const isUpmixAI = model.id === 2;
    const isStemSplit = model.id === 3;
    const isAudioZoom = model.id === 5;
    const isMeasureByMeasure = model.id === 4;
    const isProceduralFX = model.id === 6;
    const ModelIcon = getModelIcon(model.icon);

    return (
      <div className="p-12 max-w-7xl mx-auto">
        <button
          className="mb-8 text-sm flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: 'var(--brand-muted)' }}
          onClick={() => setSelectedModel(null)}
        >
          ← Back to Models
        </button>

        <div className="grid grid-cols-3 gap-8">
          {/* Left: Model Info */}
          <div className="col-span-1">
            <div
              className="backdrop-blur-sm rounded-3xl p-8 border"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentWarm})` }}
              >
                <ModelIcon className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-3xl mb-2">{model.name}</h1>
              <div className="flex items-center gap-2 mb-2 text-sm" style={{ color: 'var(--brand-muted)' }}>
                <User className="w-4 h-4" />
                <span>{model.author}</span>
              </div>
              <div className="text-xs mb-6" style={{ color: 'var(--brand-subtle)' }}>{model.date}</div>

              <div className="mb-6">
                <div className="text-sm mb-1" style={{ color: 'var(--brand-muted)' }}>Style</div>
                <div className="text-lg" style={{ color: 'var(--brand-text)' }}>{model.style}</div>
              </div>

              <div className="mb-8">
                <div className="text-sm mb-2" style={{ color: 'var(--brand-muted)' }}>Description</div>
                <p style={{ color: 'var(--brand-muted)' }}>{model.description}</p>
              </div>

              <button
                onClick={() => toggleLike(model.id)}
                className="w-full rounded-full py-3 text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={
                  isLiked
                    ? { background: `linear-gradient(135deg, ${accentColor}, ${accentWarm})`, color: 'white' }
                    : { background: 'var(--brand-card-hover)', border: '1px solid var(--brand-border)', color: 'var(--brand-muted)' }
                }
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like Model'}
              </button>
            </div>
          </div>

          {/* Right: Preview + Info */}
          <div className="col-span-2 space-y-6">
            {/* Test Model Section - VariGen Only */}
            {isVariGen && (
              <div
                className="backdrop-blur-sm rounded-3xl p-8 border"
                style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
              >
                <h2 className="text-xl mb-4">Test Model</h2>
                <div className="space-y-4">
                  <p className="text-sm mb-4" style={{ color: 'var(--brand-muted)' }}>
                    Upload a MIDI file to generate a variation using VariGen
                  </p>

                  <div className="flex items-center gap-4">
                    <label
                      className="flex-1 cursor-pointer rounded-xl border-2 border-dashed p-6 transition-colors hover:opacity-80 text-center"
                      style={{ borderColor: 'var(--brand-border)', background: 'var(--brand-card-hover)' }}
                    >
                      <input
                        type="file"
                        accept=".mid,.midi"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // TODO: Add API call here when backend is ready
                            // Example API call structure:
                            /*
                            const formData = new FormData();
                            formData.append('midi_file', file);

                            fetch('YOUR_API_ENDPOINT_HERE', {
                              method: 'POST',
                              body: formData,
                            })
                            .then(response => response.json())
                            .then(data => {
                              // Handle the generated variation
                              console.log('Generated variation:', data);
                            })
                            .catch(error => {
                              console.error('Error:', error);
                            });
                            */

                            // For now, just show a demo warning
                            setShowDemoWarning(true);
                            console.log('MIDI file selected:', file.name);
                          }
                        }}
                      />
                      <Music className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--brand-muted)' }} />
                      <div className="text-sm" style={{ color: 'var(--brand-muted)' }}>
                        Click to upload MIDI file
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--brand-subtle)' }}>
                        .mid or .midi files only
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Card */}
            <div
              className="backdrop-blur-sm rounded-3xl p-8 border"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
            >
              <h2 className="text-xl mb-4">
                {isMeasureByMeasure ? 'Model Output' : isAudioZoom || isProceduralFX ? 'Video Preview' : 'Audio Preview'}
              </h2>

              {/* VariGen */}
              {isVariGen && (
                <div className="space-y-6">
                  {[
                    { label: 'Original Uploaded Melody', seed: 30, primary: false, btnLabel: 'Play Original' },
                    { label: 'Generated Variation', seed: 35, primary: true, btnLabel: 'Play Variation' },
                  ].map(({ label, seed, primary, btnLabel }) => (
                    <div key={label}>
                      <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>{label}</div>
                      <div className="mb-4 p-4 rounded-2xl" style={{ background: 'var(--brand-card-hover)' }}>
                        <div className="h-24 flex items-center">
                          {generateWaveformData(60, seed).map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 mx-px"
                              style={{
                                height: `${height}%`,
                                background: primary
                                  ? `linear-gradient(to top, ${accentColor}, ${accentWarm})`
                                  : 'linear-gradient(to top, var(--brand-accent), rgba(124,95,160,0.4))',
                                opacity: 0.8,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <PlayBtn label={btnLabel} primary={primary} onClick={() => setShowDemoWarning(true)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* UpmixAI */}
              {isUpmixAI && (
                <div className="space-y-6">
                  <div>
                    <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>Original Stereo Mix</div>
                    <div className="mb-4 p-4 rounded-2xl" style={{ background: 'var(--brand-card-hover)' }}>
                      <div className="h-32 flex items-center gap-3">
                        {['L', 'R'].map((ch) => (
                          <div key={ch} className="flex-1 rounded-lg p-2" style={{ background: 'var(--brand-stat)' }}>
                            <div className="text-xs text-center mb-1" style={{ color: 'var(--brand-subtle)' }}>{ch}</div>
                            <div className="flex items-center h-20 gap-px">
                              {Array.from({ length: 50 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 rounded-full"
                                  style={{
                                    height: `${Math.abs(Math.sin(i * 0.3 + (ch === 'R' ? 0.5 : 0)) * 70 + Math.random() * 20) + 10}%`,
                                    background: `linear-gradient(to top, var(--brand-accent), rgba(124,95,160,0.4))`,
                                    opacity: 0.8,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-center mt-2" style={{ color: 'var(--brand-subtle)' }}>2.0 Stereo</div>
                    </div>
                    <div className="flex justify-center">
                      <PlayBtn label="Play Stereo" onClick={() => setShowDemoWarning(true)} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>Upmixed Surround Sound</div>
                    <div className="mb-4 p-4 rounded-2xl" style={{ background: 'var(--brand-card-hover)' }}>
                      <div className="h-32 flex items-center gap-2">
                        {['FL', 'FR', 'C', 'LFE', 'SL', 'SR'].map((channel, channelIdx) => (
                          <div key={channelIdx} className="flex-1 rounded-lg p-2" style={{ background: 'var(--brand-stat)' }}>
                            <div className="text-xs text-center mb-1" style={{ color: 'var(--brand-subtle)' }}>{channel}</div>
                            <div className="flex items-center h-20 gap-px">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 rounded-full"
                                  style={{
                                    height: `${Math.abs(Math.sin((i + channelIdx * 5) * 0.4) * 75 + Math.random() * 15) + 10}%`,
                                    background: `linear-gradient(to top, ${accentColor}, ${accentWarm})`,
                                    opacity: 0.85,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-center mt-2" style={{ color: 'var(--brand-subtle)' }}>5.1 Surround Sound</div>
                    </div>
                    <div className="flex justify-center">
                      <PlayBtn label="Play Surround" primary onClick={() => setShowDemoWarning(true)} />
                    </div>
                  </div>
                </div>
              )}

              {/* MeasureByMeasure */}
              {isMeasureByMeasure && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl border" style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}>
                    <div className="text-sm mb-4" style={{ color: 'var(--brand-muted)' }}>Sample Analysis Output</div>
                    <div className="space-y-3">
                      {[
                        { name: 'Mozart - Sonata No. 16', score: '4.2/5' },
                        { name: 'Chopin - Nocturne Op. 9', score: '3.8/5' },
                        { name: 'Bach - Prelude in C', score: '2.5/5' },
                      ].map(({ name, score }) => (
                        <div
                          key={name}
                          className="flex justify-between items-center p-3 rounded-xl"
                          style={{ background: 'var(--brand-card)' }}
                        >
                          <span className="text-sm" style={{ color: 'var(--brand-text)' }}>{name}</span>
                          <span style={{ color: accentColor }}>Difficulty: {score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-center" style={{ color: 'var(--brand-subtle)' }}>
                    This model analyzes MusicXML files and provides difficulty ratings
                  </p>
                </div>
              )}

              {/* AudioZoom / ProceduralFX */}
              {(isAudioZoom || isProceduralFX) && (
                <div>
                  <div
                    className="mb-4 p-4 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed"
                    style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentWarm})` }}
                      >
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>
                        {isAudioZoom ? 'Audiovisual Enhancement Demo' : 'Procedural Audio Demo'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <PlayBtn label="Play Video" primary onClick={() => setShowDemoWarning(true)} />
                  </div>
                </div>
              )}

              {/* Default (StemSplit + generic) */}
              {!isVariGen && !isUpmixAI && !isMeasureByMeasure && !isAudioZoom && !isProceduralFX && (
                <>
                  {isStemSplit ? (
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>Full Song</div>
                        <div className="mb-4 p-4 rounded-2xl" style={{ background: 'var(--brand-card-hover)' }}>
                          <div className="h-24 flex items-center">
                            {generateWaveformData(80, 40).map((height, i) => (
                              <div
                                key={i}
                                className="flex-1 mx-px"
                                style={{
                                  height: `${height}%`,
                                  background: `linear-gradient(to top, var(--brand-waveform-from), var(--brand-waveform-to))`,
                                  opacity: 0.8,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <PlayBtn label="Play Full Mix" onClick={() => setShowDemoWarning(true)} />
                        </div>
                      </div>

                      <div>
                        <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>Separated Stems</div>
                        <div className="space-y-3">
                          {[
                            { name: 'Drums', seed: 45 },
                            { name: 'Bass', seed: 50 },
                            { name: 'Guitar', seed: 55 }
                          ].map(({ name, seed }) => (
                            <div key={name}>
                              <div className="text-xs mb-2" style={{ color: 'var(--brand-subtle)' }}>{name}</div>
                              <div className="mb-2 p-3 rounded-xl" style={{ background: 'var(--brand-card-hover)' }}>
                                <div className="h-16 flex items-center">
                                  {generateWaveformData(60, seed).map((height, i) => (
                                    <div
                                      key={i}
                                      className="flex-1 mx-px"
                                      style={{
                                        height: `${height}%`,
                                        background: `linear-gradient(to top, var(--brand-waveform-from), var(--brand-waveform-to))`,
                                        opacity: 0.7,
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-center">
                                <PlayBtn label={`Play ${name}`} onClick={() => setShowDemoWarning(true)} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 p-4 rounded-2xl" style={{ background: 'var(--brand-card-hover)' }}>
                        <div className="h-24 flex items-center">
                          {generateWaveformData(60, 40).map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 mx-px"
                              style={{
                                height: `${height}%`,
                                background: `linear-gradient(to top, ${accentColor}, ${accentWarm})`,
                                opacity: 0.7,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <PlayBtn label="Play Sample" primary onClick={() => setShowDemoWarning(true)} />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* About Card */}
            <div
              className="backdrop-blur-sm rounded-3xl p-8 border"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
            >
              <h2 className="text-xl mb-4">About This Model</h2>
              <div className="space-y-4 text-sm">
                {isVariGen && (
                  <>
                    <InfoCard title="Research Overview">VariGen is a deep learning model that generates musical variations from input melodies using variational autoencoders and sequence-to-sequence architectures. The model learns to capture melodic structure while introducing controlled variations.</InfoCard>
                    <InfoCard title="Training Approach">The model was trained on a large corpus of MIDI melodies, learning to encode melodic patterns into a latent space and decode them with variations that preserve musical coherence while introducing creative diversity.</InfoCard>
                    <InfoCard title="Applications">Ideal for music composition assistance, generating thematic variations, exploring melodic possibilities, and educational purposes in understanding algorithmic composition and music generation techniques.</InfoCard>
                    <InfoCard title="Publication">Part of ongoing research by {model.author} at the University of York, focusing on AI-assisted music composition and melodic variation generation.</InfoCard>
                  </>
                )}
                {isUpmixAI && (
                  <>
                    <InfoCard title="Research Overview">UpmixAI is a deep learning system that automatically converts stereo audio recordings to multi-channel surround sound formats. Using advanced neural network architectures, it intelligently separates and spatializes audio content to create immersive listening experiences.</InfoCard>
                    <InfoCard title="Technical Approach">The model employs sophisticated audio source separation and spatial audio processing techniques to analyze stereo content and generate appropriate surround channel assignments, preserving the original mix's artistic intent while expanding the soundstage.</InfoCard>
                    <InfoCard title="Applications">Ideal for remastering legacy stereo recordings for modern surround sound systems, creating immersive audio experiences from existing content, and educational applications in spatial audio production and mixing techniques.</InfoCard>
                    <InfoCard title="Publication">Developed by {model.author} at the University of Miami's Frost School of Music as part of research in AI-assisted audio production and spatial sound processing.</InfoCard>
                  </>
                )}
                {isStemSplit && (
                  <>
                    <InfoCard title="Research Overview">StemSplit implements real-time music source separation using knowledge distillation techniques. This system separates mixed audio into individual instrumental stems with minimal latency, making it suitable for live performance and interactive production environments.</InfoCard>
                    <InfoCard title="Technical Approach">Based on a causal modification of X-UMX trained with knowledge distillation, the system uses a teacher-student framework where a non-causal model guides the training of a causal model, bridging the performance gap between real-time and non-real-time source separation.</InfoCard>
                    <InfoCard title="Applications">Enables live remixing, karaoke systems, assistive listening devices, real-time music production workflows, and educational tools for understanding musical arrangements.</InfoCard>
                    <InfoCard title="Publication">M.S. thesis by {model.author} at the University of Miami's Frost School of Music (May 2025), supervised by Professor Christopher Bennett.</InfoCard>
                  </>
                )}
                {isAudioZoom && (
                  <>
                    <InfoCard title="Research Overview">AudioZoom is an advanced audio enhancement system that selectively amplifies specific audio signals while minimizing background noise. This system uses machine learning to intelligently focus on target sound sources.</InfoCard>
                    <InfoCard title="Technical Approach">The system integrates audiovisual processing to enhance targeted audio signals without complex hardware. Evaluation using STOI and PESQ metrics demonstrates effectiveness in improving clarity and quality of focused audio sources.</InfoCard>
                    <InfoCard title="Applications">Applicable to mobile devices, surveillance systems, hearing aids, video conferencing, and any scenario requiring selective audio enhancement in diverse acoustic environments.</InfoCard>
                    <InfoCard title="Publication">Research conducted at the University of Miami's Frost School of Music (April 2024), supervised by Professor Tom Collins.</InfoCard>
                  </>
                )}
                {isMeasureByMeasure && (
                  <>
                    <InfoCard title="Research Overview">Measure By Measure presents an AI algorithm designed to accurately estimate music difficulty from symbolic music representations extracted from MusicXML files, affecting lesson planning, student evaluation, and personalized learning experiences.</InfoCard>
                    <InfoCard title="Technical Approach">Two primary machine learning models were explored: linear regression as a baseline, and a CNN for capturing nonlinear relationships. The CNN achieved 69.1% accuracy compared to approximately 37% variance explained by the baseline.</InfoCard>
                    <InfoCard title="Applications">Significant implications for music education including adaptive learning systems, automated lesson planning, and real-time student feedback.</InfoCard>
                    <InfoCard title="Publication">M.S. thesis in Music Engineering by {model.author} at the University of Miami's Frost School of Music (May 2025), supervised by Dr. Tom Collins.</InfoCard>
                  </>
                )}
                {isProceduralFX && (
                  <>
                    <InfoCard title="Research Overview">ProceduralFX integrates neural network-based 3D object detection (YOLO) with procedural audio synthesis to generate real-time object-specific sounds in virtual environments.</InfoCard>
                    <InfoCard title="Technical Approach">The system employs an object detection network to classify 3D game objects and apply corresponding audio characteristics. A listening study validated that procedurally generated audio demonstrated high plausibility.</InfoCard>
                    <InfoCard title="Applications">Ideal for video games, virtual reality experiences, architectural visualization, and any virtual environment requiring dynamic, context-aware audio that adapts to procedurally generated content.</InfoCard>
                    <InfoCard title="Publication">M.S. thesis in Music Engineering Technology by {model.author} at the University of Miami's Frost School of Music (May 2024), supervised by Professor Tom Collins.</InfoCard>
                  </>
                )}
                {!isVariGen && !isUpmixAI && !isStemSplit && !isAudioZoom && !isMeasureByMeasure && !isProceduralFX && (
                  <>
                    <InfoCard title="Training Data">This model was trained on a curated dataset emphasizing {model.style.toLowerCase()} characteristics and patterns.</InfoCard>
                    <InfoCard title="Best For">Creating {model.style.toLowerCase()} tracks with authentic style and sound design.</InfoCard>
                    <InfoCard title="Created By">{model.author} as part of their AI Music Research project.</InfoCard>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {showDemoWarning && (
          <Toast message="This is an educational prototype." onClose={() => setShowDemoWarning(false)} />
        )}
      </div>
    );
  }

  const likedModelsList = studentModels.filter(m => likedModels.includes(m.id));

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-4">Student Models</h1>
      <p className="mb-12" style={{ color: 'var(--brand-muted)' }}>
        Explore and interact with models created by students
      </p>

      {/* Liked Models */}
      {likedModelsList.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6">Your Liked Models</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {likedModelsList.map((m) => {
                const Icon = getModelIcon(m.icon);
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className="min-w-[280px] backdrop-blur-sm rounded-3xl p-6 border transition-all cursor-pointer group"
                    style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand-active-border)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--brand-border)')}
                  >
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentWarm})` }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg mb-2" style={{ color: 'var(--brand-text)' }}>{m.name}</h3>
                    <div className="flex items-center gap-2 mb-1 text-xs" style={{ color: 'var(--brand-muted)' }}>
                      <User className="w-4 h-4" />
                      <span>{m.author}</span>
                    </div>
                    <div className="text-xs mb-3" style={{ color: 'var(--brand-subtle)' }}>{m.date}</div>
                    <div className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>{m.style}</div>
                    <p className="text-sm line-clamp-2" style={{ color: 'var(--brand-muted)' }}>{m.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* All Models Grid */}
      <h2 className="text-2xl mb-6">All Models</h2>
      <div className="grid grid-cols-3 gap-6">
        {studentModels.map((m) => {
          const isLiked = likedModels.includes(m.id);
          const Icon = getModelIcon(m.icon);
          return (
            <div
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className="backdrop-blur-sm rounded-3xl p-6 border transition-all cursor-pointer group relative"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand-active-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--brand-border)')}
            >
              {/* Like Button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(m.id); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: isLiked ? `linear-gradient(135deg, ${accentColor}, ${accentWarm})` : 'var(--brand-card-hover)',
                  border: isLiked ? 'none' : '1px solid var(--brand-border)',
                }}
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? 'fill-current text-white' : ''}`}
                  style={{ color: isLiked ? 'white' : 'var(--brand-muted)' }}
                />
              </button>

              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentWarm})` }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl mb-2 pr-8" style={{ color: 'var(--brand-text)' }}>{m.name}</h3>

              <div className="flex items-center gap-2 mb-1 text-sm" style={{ color: 'var(--brand-muted)' }}>
                <User className="w-4 h-4" />
                <span>{m.author}</span>
              </div>
              <div className="text-xs mb-3" style={{ color: 'var(--brand-subtle)' }}>{m.date}</div>

              <div className="text-sm mb-4" style={{ color: 'var(--brand-muted)' }}>{m.style}</div>
              <p className="text-sm mb-6" style={{ color: 'var(--brand-muted)' }}>{m.description}</p>

              <button
                className="w-full rounded-full py-2 text-xs border transition-colors"
                style={{
                  background: 'var(--brand-card-hover)',
                  borderColor: 'var(--brand-border)',
                  color: 'var(--brand-muted)',
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}