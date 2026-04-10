import { useState } from 'react';
import { Music2, Sparkles, BarChart3, FileText } from 'lucide-react';
import { Button } from './ui/button';

const stems = ['Drums', 'Bass', 'Guitar', 'Vocals'];
const promptWords = ['upbeat', 'electronic', 'pop', 'catchy'];

export function AnalyzePage() {
  const [selectedStem, setSelectedStem] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-4">Analyze</h1>
      <p className="text-white/60 mb-12">Break down generated audio and understand AI decisions</p>

      <div className="grid grid-cols-3 gap-8">
        {/* Left: Waveform and Stems */}
        <div className="col-span-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-6">
            <h2 className="text-xl mb-6">Stem Separation</h2>
            
            {/* Main Waveform */}
            <div className="mb-6 p-4 bg-white/5 rounded-2xl">
              <div className="text-sm text-white/60 mb-2">Full Mix</div>
              <div className="h-24 flex items-center">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-px bg-gradient-to-t from-[#F47321] to-[#005030]"
                    style={{
                      height: `${Math.random() * 80 + 20}%`,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Individual Stems */}
            <div className="space-y-4">
              {stems.map((stem) => (
                <div
                  key={stem}
                  onClick={() => setSelectedStem(stem === selectedStem ? null : stem)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    selectedStem === stem
                      ? 'bg-[#F47321]/20 border-2 border-[#F47321]'
                      : 'bg-white/5 border-2 border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Music2 className="w-5 h-5 text-[#F47321]" />
                      <span className="font-semibold">{stem}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs bg-white/10 hover:bg-white/20 rounded-full"
                    >
                      Play
                    </Button>
                  </div>
                  <div className="h-12 flex items-center">
                    {Array.from({ length: 80 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 mx-px"
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          background: selectedStem === stem ? '#F47321' : '#005030',
                          opacity: selectedStem === stem ? 0.9 : 0.5,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h2 className="text-xl mb-6">Prompt-to-Output Mapping</h2>
            <p className="text-sm text-white/60 mb-6">
              See which parts of your prompt influenced different aspects of the generation
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {promptWords.map((word) => (
                <button
                  key={word}
                  onClick={() => setSelectedWord(word === selectedWord ? null : word)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedWord === word
                      ? 'bg-[#F47321] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>

            {selectedWord && (
              <div className="p-4 bg-white/5 rounded-xl">
                <h4 className="text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F47321]" />
                  How "{selectedWord}" influenced the output
                </h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Affected overall tempo and energy level</li>
                  <li>• Influenced instrument selection</li>
                  <li>• Shaped melodic patterns and rhythm</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Insights Panel */}
        <div className="col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-6">
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#F47321]" />
              Audio Features
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Energy</span>
                  <span className="text-[#F47321]">78%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F47321] to-[#005030]" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Rhythm</span>
                  <span className="text-[#F47321]">85%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F47321] to-[#005030]" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Harmony</span>
                  <span className="text-[#F47321]">62%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F47321] to-[#005030]" style={{ width: '62%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Structure</span>
                  <span className="text-[#F47321]">71%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F47321] to-[#005030]" style={{ width: '71%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#F47321]" />
              AI Insights
            </h2>

            <div className="space-y-4 text-sm text-white/70">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-white mb-1">Strong Elements</div>
                <div>Rhythmic patterns align well with prompt intent</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-white mb-1">Model Decision</div>
                <div>Selected electronic instruments based on style tags</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-white mb-1">Confidence</div>
                <div>High confidence (87%) in genre classification</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
