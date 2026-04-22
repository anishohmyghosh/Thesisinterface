import { useState } from 'react';
import { Layers, Database, TrendingUp, GitBranch, Info, Home, Truck, Tv, Server, Cloud, Droplets, Leaf, Recycle, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
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

const environmentalImpactData = [
  { id: 'training', category: 'Training', co2: 85, water: 340, energy: 1200 },
  { id: 'inference', category: 'Inference', co2: 45, water: 180, energy: 650 },
  { id: 'datacenters', category: 'Data Centers', co2: 120, water: 520, energy: 1800 },
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
          <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            {/* Top-left: User Consumption Graph */}
            <div>
              <h2 className="text-xl mb-6">User Consumption</h2>
              <ResponsiveContainer width="100%" height={200} key="energy-chart">
                <LineChart data={energyData}>
                  <CartesianGrid key="grid-energy" strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis key="xaxis-energy" dataKey="month" stroke={chartAxisColor} tick={{ fill: chartTickColor }} />
                  <YAxis
                    key="yaxis-energy"
                    stroke={chartAxisColor}
                    tick={{ fill: chartTickColor }}
                    label={{ value: 'KgsCO2', angle: -90, position: 'insideLeft', fill: chartTickColor }}
                  />
                  <Line
                    key="explore-energy-line"
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
                ].map(({ value, label, fill }, idx) => (
                  <div key={`circular-stat-${idx}`} className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          key={`circle-bg-${idx}`}
                          cx="56" cy="56" r="48"
                          stroke="var(--brand-border)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          key={`circle-fill-${idx}`}
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

          {/* Environmental Impact Section */}
          <div className="border-t pt-8" style={{ borderColor: 'var(--brand-border)' }}>
            <h2 className="text-2xl mb-6">Environmental Impact of AI Music Technology</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { Icon: Server, title: 'Data Center Demand', body: 'Training and operating modern AI models requires substantial computational resources, contributing to growing data center infrastructure and energy demands.', label: 'Energy Intensity', value: '↑ 48%', width: '75%' },
                { Icon: Cloud, title: 'Carbon Emissions', body: 'Large-scale AI deployment contributes to significant carbon emissions, complicating industry climate commitments and sustainability goals.', label: 'Annual CO₂ (metric tons)', value: '284K', width: '62%' },
                { Icon: Droplets, title: 'Water Consumption', body: 'Cooling systems for AI infrastructure require substantial water resources, with state-of-the-art models consuming millions of liters during training and operation.', label: 'Liters per training run', value: '3.5M', width: '85%' },
              ].map(({ Icon, title, body, label, value, width }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 border"
                  style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
                >
                  <div className="rounded-xl p-3 w-fit mb-4" style={{ background: 'var(--brand-stat)' }}>
                    <Icon className="w-8 h-8" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-lg mb-3">{title}</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--brand-muted)' }}>{body}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs" style={{ color: 'var(--brand-subtle)' }}>{label}</span>
                      <span className="text-xl" style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}>{value}</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ background: 'var(--brand-border)' }}>
                      <div className="h-2 rounded-full" style={{ width, background: accentColor }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-6 border"
              style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
            >
              <h3 className="text-lg mb-4">Resource Consumption by AI Activity</h3>
              <ResponsiveContainer width="100%" height={250} key="env-impact-chart">
                <BarChart data={environmentalImpactData}>
                  <CartesianGrid key="grid-env" strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis key="xaxis-env" dataKey="category" stroke={chartAxisColor} tick={{ fill: chartTickColor }} />
                  <YAxis key="yaxis-env" stroke={chartAxisColor} tick={{ fill: chartTickColor }} />
                  <Bar key="bar-co2" dataKey="co2" fill="#FF6B6B" radius={[8, 8, 0, 0]} />
                  <Bar key="bar-water" dataKey="water" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
                  <Bar key="bar-energy" dataKey="energy" fill={accentColor} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-6 justify-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF6B6B' }}></div>
                  <span className="text-xs" style={{ color: 'var(--brand-muted)' }}>CO₂ (tons)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#4ECDC4' }}></div>
                  <span className="text-xs" style={{ color: 'var(--brand-muted)' }}>Water (1000L)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: accentColor }}></div>
                  <span className="text-xs" style={{ color: 'var(--brand-muted)' }}>Energy (MWh)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mitigation Strategies Section */}
          <div className="border-t pt-8" style={{ borderColor: 'var(--brand-border)' }}>
            <h2 className="text-2xl mb-6">Sustainability & Mitigation Efforts</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { Icon: Recycle, title: 'Water Stewardship Programs', body: 'Industry leaders are implementing comprehensive water stewardship initiatives to reduce freshwater consumption and restore local watersheds near data centers.', stats: [['Water Recycling Rate', '78%'], ['Watershed Restoration', '2.4M L/yr']] },
                { Icon: Droplets, title: 'VWBA Framework', body: 'Volumetric Water Benefit Accounting (VWBA) enables companies to quantify and offset water usage through verified restoration projects in water-stressed regions.', stats: [['Water Credits Generated', '1.8M L'], ['Net Water Impact', '-12%']] },
                { Icon: Leaf, title: 'Carbon-Aware Computing', body: 'Advanced scheduling systems shift AI training workloads to times and locations with higher renewable energy availability, reducing carbon intensity.', stats: [['Renewable Energy Mix', '67%'], ['Carbon Reduction', '-43%']] },
                { Icon: Shield, title: 'Resource-Aware Development', body: 'Optimizing model architectures and training techniques to achieve comparable performance with significantly reduced computational requirements and environmental impact.', stats: [['Parameter Efficiency', '+35%'], ['Training Time Reduced', '-28%']] },
              ].map(({ Icon, title, body, stats }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 border"
                  style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-xl p-3" style={{ background: 'var(--brand-stat)' }}>
                      <Icon className="w-8 h-8" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">{title}</h3>
                      <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>{body}</p>
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    {stats.map(([label, val]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-lg p-3"
                        style={{ background: 'var(--brand-stat)' }}
                      >
                        <span className="text-sm" style={{ color: 'var(--brand-muted)' }}>{label}</span>
                        <span style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-2xl p-6 border"
              style={{ background: 'var(--brand-card-hover)', borderColor: 'var(--brand-border)' }}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl p-3" style={{ background: 'var(--brand-stat)' }}>
                  <Leaf className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2">The Sustainability Challenge</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                    While AI music technology continues to expand capabilities and accessibility, the environmental costs highlight a growing tension between innovation and sustainability. Industry efforts through renewable energy adoption, water stewardship programs, and frameworks like VWBA represent critical steps toward offsetting resource consumption. However, ongoing research and development in resource-aware AI architecture remains essential to ensure the long-term viability of these technologies without compromising environmental commitments.
                  </p>
                </div>
              </div>
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
                  <CartesianGrid key="grid-originality" strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis
                    key="xaxis-originality"
                    dataKey="name"
                    stroke={chartAxisColor}
                    tick={{ fill: chartTickColor }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    key="yaxis-originality"
                    stroke={chartAxisColor}
                    tick={{ fill: chartTickColor }}
                    label={{ value: 'Originality Score', angle: -90, position: 'insideLeft', fill: chartTickColor }}
                  />
                  <Line
                    key="explore-originality-line"
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