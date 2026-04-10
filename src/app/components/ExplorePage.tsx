import { useState } from 'react';
import { Layers, Database, TrendingUp, GitBranch, Info, Home, Truck, Tv } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

type Tab = 'ethics' | 'energy' | 'originality' | 'about';

const originalityData = [
  { name: 'Baseline', value: 0.1 },
  { name: 'Competitor 1', value: 0.35 },
  { name: 'Model 1', value: 0.5 },
  { name: 'Model 2', value: 0.65 },
  { name: 'Human', value: 0.95 },
];

const energyData = [
  { month: 'Sep', value: 0.1 },
  { month: 'Oct', value: 0.3 },
  { month: 'Nov', value: 0.25 },
  { month: 'Dec', value: 0.35 },
  { month: 'Jan', value: 0.5 },
];

export function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('ethics');
  const { chartGridColor, chartAxisColor, chartTickColor, chartLineColor, accentColor } = useTheme();

  const tabActive = `rounded-full px-8 border transition-colors`;
  const tabInactive = `rounded-full px-8 transition-colors`;

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-4">Explore</h1>
      <p className="mb-12" style={{ color: 'var(--brand-muted)' }}>Understand how AI music systems work</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {(['ethics', 'energy', 'originality', 'about'] as Tab[]).map((tab) => {
          const labels: Record<Tab, string> = {
            ethics: 'Ethics & Royalties',
            energy: 'Energy Consumption',
            originality: 'Model Originality',
            about: 'About',
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${isActive ? tabActive : tabInactive} px-8 py-2 rounded-full text-sm transition-colors`}
              style={
                isActive
                  ? {
                      background: 'var(--brand-active)',
                      borderColor: 'var(--brand-active-border)',
                      color: 'var(--brand-text)',
                    }
                  : {
                      background: 'var(--brand-card)',
                      border: '1px solid var(--brand-border)',
                      color: 'var(--brand-muted)',
                    }
              }
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Content Panel */}
      <div
        className="backdrop-blur-sm rounded-3xl p-8 border"
        style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
      >
        {/* ── Ethics Tab ── */}
        {activeTab === 'ethics' && (
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl mb-6">User Rights</h2>
              <div className="space-y-4" style={{ color: 'var(--brand-muted)' }}>
                <p>
                  Here are some details about the user's rights when using this platform to generate or edit audio.
                </p>
                <p>
                  This includes information about upload privacy, ownership of generated content, and monetization
                  rights related to works processed through this platform.
                </p>
                <p>
                  All generated content is yours to use. You maintain full ownership and can freely use, modify,
                  and distribute your creations for both personal and commercial purposes.
                </p>
                <p className="text-sm" style={{ color: 'var(--brand-subtle)' }}>
                  We believe in open access and making AI music tools accessible to learners and researchers.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-6">Company Ethics & Royalties</h2>
              <div className="space-y-4" style={{ color: 'var(--brand-muted)' }}>
                <p>
                  Here are some details about the company's efforts to compensate artists and ethically source data
                  for training models.
                </p>
                <p>
                  Including but not limited to information about participating artist royalties and the data
                  collection process.
                </p>
                <p>
                  All models used in this platform are built on open source foundations, ensuring transparency
                  and accessibility for educational purposes. We utilize open source and peer-reviewed research
                  software, promoting ethical AI development and academic integrity.
                </p>
                <p className="text-sm" style={{ color: 'var(--brand-subtle)' }}>
                  This is meant for transparency with users.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Energy Tab ── */}
        {activeTab === 'energy' && (
          <div className="grid grid-cols-2 gap-8">
            {/* Top-left: User Consumption Graph */}
            <div>
              <h2 className="text-xl mb-6">User Consumption</h2>
              <ResponsiveContainer width="100%" height={200} key="energy-chart">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis dataKey="month" stroke={chartAxisColor} tick={{ fill: chartTickColor }} />
                  <YAxis
                    stroke={chartAxisColor}
                    tick={{ fill: chartTickColor }}
                    label={{ value: 'KgsCO2', angle: -90, position: 'insideLeft', fill: chartTickColor }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={chartLineColor}
                    strokeWidth={3}
                    dot={{ fill: chartLineColor, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top-right: Icon Stats */}
            <div className="flex flex-col justify-center">
              <div className="space-y-5">
                {[
                  { Icon: Home, value: '4.11%', label: 'Of a U.S citizen weekly energy emissions' },
                  { Icon: Truck, value: '21.06', label: 'Kilometers ridden' },
                  { Icon: Tv, value: '2.15', label: 'Days of watching TV' },
                ].map(({ Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div
                      className="rounded-lg p-3"
                      style={{ background: 'var(--brand-stat)' }}
                    >
                      <Icon className="w-8 h-8" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <div className="text-2xl" style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}>
                        {value}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--brand-muted)' }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-left: Company Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl mb-4">Company Consumption</h2>
              <div className="space-y-3 text-sm" style={{ color: 'var(--brand-muted)' }}>
                <p>Here are some details about the company's efforts to make their tech more sustainable.</p>
                <p>
                  Including but not limited to information about model size, data centers used, and some statistics
                  on the overall current energy use.
                </p>
                <p className="text-xs" style={{ color: 'var(--brand-subtle)' }}>
                  This is meant for transparency with users.
                </p>
              </div>
            </div>

            {/* Bottom-right: Circular Stats - Centered */}
            <div className="flex items-center justify-center">
              <div className="flex gap-8">
                {[
                  { value: '72.48', label: 'kWh', fill: 0.6 },
                  { value: '10.51', label: 'kg eq CO2', fill: 0.35 },
                  { value: '124.93', label: 'days', fill: 0.75 },
                ].map(({ value, label, fill }) => (
                  <div key={label} className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="56" cy="56" r="48"
                          stroke="var(--brand-border)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="56" cy="56" r="48"
                          stroke={accentColor}
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 48 * fill} ${2 * Math.PI * 48}`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="text-xl mb-1" style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}>
                      {value}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--brand-muted)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Originality Tab ── */}
        {activeTab === 'originality' && (
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl mb-6">Originality Score</h2>
              <ResponsiveContainer width="100%" height={300} key="originality-chart">
                <LineChart data={originalityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis
                    dataKey="name"
                    stroke={chartAxisColor}
                    tick={{ fill: chartTickColor }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke={chartAxisColor}
                    tick={{ fill: chartTickColor }}
                    label={{ value: 'Originality Score', angle: -90, position: 'insideLeft', fill: chartTickColor }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={chartLineColor}
                    strokeWidth={3}
                    dot={{ fill: chartLineColor, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h2 className="text-xl mb-6">Model Originality</h2>
              <div className="space-y-4" style={{ color: 'var(--brand-muted)' }}>
                <p>Here are some details about why model originality is important in AI music.</p>
                <p>
                  Additionally, there is information about what the company does to ensure their models are
                  original and how they detect and reduce AI plagiarism.
                </p>
                <p className="text-sm" style={{ color: 'var(--brand-subtle)' }}>
                  This is meant for transparency with users.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── About Tab ── */}
        {activeTab === 'about' && (
          <div>
            <h2 className="text-2xl mb-8">How AI Music Generation Works</h2>

            {/* Pipeline Flow */}
            <div className="flex items-center justify-between mb-12">
              {[
                { Icon: Database, label: 'Dataset', sub: 'Training audio collection' },
                { Icon: TrendingUp, label: 'Training', sub: 'Learning patterns' },
                { Icon: Layers, label: 'Model', sub: 'Trained AI system' },
                { Icon: GitBranch, label: 'Output', sub: 'Generated music' },
              ].map(({ Icon, label, sub }, i, arr) => (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex-1 text-center">
                    <div
                      className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: 'var(--brand-stat)' }}
                    >
                      <Icon className="w-12 h-12" style={{ color: accentColor }} />
                    </div>
                    <h3 className="text-lg mb-2">{label}</h3>
                    <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>{sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-16 flex items-center justify-center">
                      <div
                        className="h-px w-full"
                        style={{
                          background: `linear-gradient(to right, var(--brand-accent), var(--brand-warm))`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Educational Cards */}
            <div className="grid grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'Diffusion Models',
                  body: 'Modern AI music uses diffusion processes that gradually refine noise into structured audio, similar to how images are generated.',
                },
                {
                  title: 'Training Process',
                  body: 'Models learn patterns from thousands of songs, understanding structure, rhythm, harmony, and style without memorizing specific tracks.',
                },
                {
                  title: 'Bias & Diversity',
                  body: 'Dataset composition affects output style. A model trained mostly on pop music will generate pop-like results more easily.',
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 border"
                  style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
                >
                  <h4 className="text-lg mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" style={{ color: accentColor }} />
                    {title}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>{body}</p>
                </div>
              ))}
            </div>

            {/* Types of AI Audio Models */}
            <div className="border-t pt-12" style={{ borderColor: 'var(--brand-border)' }}>
              <h2 className="text-2xl mb-8">Types of AI Audio Models</h2>

              {/* Generative */}
              <div className="mb-10">
                <h3 className="text-xl mb-6" style={{ color: accentColor }}>Generative Models</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Song Generation', body: 'Full audio generation from text prompts or parameters. Creates complete songs with vocals, instruments, and production.', ex: 'Suno, Soundraw' },
                    { title: 'Melody/MIDI Generation', body: 'Creates musical notation and MIDI sequences. Generates melodies, chord progressions, and compositional structures.', ex: 'NotaGen, Cai' },
                    { title: 'Large Language Models', body: 'AI models trained on text that can assist with lyrics, music theory explanations, and creative suggestions.', ex: 'ChatGPT' },
                    { title: 'Mastering', body: 'AI-powered audio finalization that balances levels, applies compression, EQ, and enhances overall sound quality.', ex: 'Audiolens, LANDR' },
                  ].map(({ title, body, ex }) => (
                    <div
                      key={title}
                      className="rounded-2xl p-6 border"
                      style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
                    >
                      <h4 className="text-lg mb-3">{title}</h4>
                      <p className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>{body}</p>
                      <div className="text-xs" style={{ color: 'var(--brand-subtle)' }}>Examples: {ex}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytical */}
              <div>
                <h3 className="text-xl mb-6" style={{ color: accentColor }}>Analytical Models</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Source Separation (Stem Splitting)', body: 'Separates mixed audio into individual components like vocals, drums, bass, and other instruments. Essential for remixing and practice.', ex: 'Fadr, Moises' },
                    { title: 'Chord/Tempo Detection', body: 'Analyzes audio to identify chords, key signatures, tempo, and rhythmic patterns. Helps musicians learn and transcribe songs.', ex: 'Moises, Chordify' },
                  ].map(({ title, body, ex }) => (
                    <div
                      key={title}
                      className="rounded-2xl p-6 border"
                      style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
                    >
                      <h4 className="text-lg mb-3">{title}</h4>
                      <p className="text-sm mb-3" style={{ color: 'var(--brand-muted)' }}>{body}</p>
                      <div className="text-xs" style={{ color: 'var(--brand-subtle)' }}>Examples: {ex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}