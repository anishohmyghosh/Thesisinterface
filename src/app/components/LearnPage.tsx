import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';
import { ChevronRight, Music, Headphones, MessageSquare, FileMusic, Scissors, Sparkles, Home, Truck, Tv } from 'lucide-react';

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

type Tab = 'energy' | 'ethics' | 'originality' | 'studentTools';

const studentAccessTools = [
  { name: 'Suno', description: 'Music generation', url: 'https://suno.ai', icon: Music },
  { name: 'Moises', description: 'AI Practice', url: 'https://moises.ai', icon: Headphones },
  { name: 'CoPilot', description: 'Language Model', url: 'https://copilot.microsoft.com', icon: MessageSquare },
];
const freeAccessTools = [
  { name: 'NotaGen', description: 'Sheet Generation', url: 'https://huggingface.co/spaces/ElectricAlexis/NotaGen', icon: FileMusic },
  { name: 'Fadr', description: 'Stem splitting', url: 'https://fadr.com', icon: Scissors },
  { name: 'AudioLens', description: 'Mastering', url: 'https://audiolens.ai', icon: Sparkles },
];

export function LearnPage() {
  const [activeTab, setActiveTab] = useState<Tab>('energy');

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-12">Learn</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => setActiveTab('energy')}
          className={`rounded-full px-8 ${
            activeTab === 'energy'
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-transparent border border-white/10 text-white/60 hover:text-white hover:bg-white/5'
          }`}
          variant="outline"
        >
          Energy Consumption
        </Button>
        <Button
          onClick={() => setActiveTab('ethics')}
          className={`rounded-full px-8 ${
            activeTab === 'ethics'
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-transparent border border-white/10 text-white/60 hover:text-white hover:bg-white/5'
          }`}
          variant="outline"
        >
          Ethics & Royalties
        </Button>
        <Button
          onClick={() => setActiveTab('originality')}
          className={`rounded-full px-8 ${
            activeTab === 'originality'
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-transparent border border-white/10 text-white/60 hover:text-white hover:bg-white/5'
          }`}
          variant="outline"
        >
          Model Originality
        </Button>
        <Button
          onClick={() => setActiveTab('studentTools')}
          className={`rounded-full px-8 ${
            activeTab === 'studentTools'
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-transparent border border-white/10 text-white/60 hover:text-white hover:bg-white/5'
          }`}
          variant="outline"
        >
          Student Tools
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        {activeTab === 'originality' && (
          <div className="grid grid-cols-2 gap-12" key="originality-tab">
            <div>
              <h2 className="text-xl mb-6">Originality Score</h2>
              <ResponsiveContainer width="100%" height={300} key="originality-chart">
                <LineChart data={originalityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis
                    dataKey="name"
                    stroke="#ffffff60"
                    tick={{ fill: '#ffffff80' }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#ffffff60"
                    tick={{ fill: '#ffffff80' }}
                    label={{ value: 'Originality Score', angle: -90, position: 'insideLeft', fill: '#ffffff80' }}
                  />
                  <Line
                    key="originality-line"
                    type="monotone"
                    dataKey="value"
                    stroke="#F47321"
                    strokeWidth={3}
                    dot={{ fill: '#F47321', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h2 className="text-xl mb-6">Model Originality</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Here are some details about why model originality is important in AI music.
                </p>
                <p>
                  Additionally, there is information about what the company does to ensure their models are
                  original and how they detect and reduce AI plagiarism.
                </p>
                <p className="text-sm text-white/60">
                  This is meant for transparency with users.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ethics' && (
          <div className="grid grid-cols-2 gap-12" key="ethics-tab">
            <div>
              <h2 className="text-xl mb-6">User Rights</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Here are some details about the user's rights when using this platform to generate or edit audio.
                </p>
                <p>
                  This includes information about upload privacy, ownership of generated content, and monetization
                  rights related to works processed through this platform.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-6">Company Ethics & Royalties</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Here are some details about the company's efforts to compensate artists and ethically source data
                  for training models.
                </p>
                <p>
                  Including but not limited to information about participating artist royalties and the data
                  collection process.
                </p>
                <p className="text-sm text-white/60">
                  This is meant for transparency with users.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'energy' && (
          <div className="grid grid-cols-2 gap-12" key="energy-tab">
            <div>
              <h2 className="text-xl mb-6">User Consumption</h2>
              <ResponsiveContainer width="100%" height={200} key="energy-chart">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#ffffff60" tick={{ fill: '#ffffff80' }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff80' }} label={{ value: 'KgsCO2', angle: -90, position: 'insideLeft', fill: '#ffffff80' }} />
                  <Line
                    key="energy-line"
                    type="monotone"
                    dataKey="value"
                    stroke="#F47321"
                    strokeWidth={3}
                    dot={{ fill: '#F47321', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Icon stats */}
              <div className="mt-8 space-y-5">
                {/* House stat */}
                <div className="flex items-center gap-4">
                  <div className="bg-[#F47321]/20 rounded-lg p-3">
                    <Home className="w-8 h-8 text-[#F47321]" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#F47321]">4.11%</div>
                    <div className="text-xs text-white/60">Of a U.S citizen weekly energy emissions</div>
                  </div>
                </div>

                {/* Truck stat */}
                <div className="flex items-center gap-4">
                  <div className="bg-[#F47321]/20 rounded-lg p-3">
                    <Truck className="w-8 h-8 text-[#F47321]" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#F47321]">21.06</div>
                    <div className="text-xs text-white/60">Kilometers ridden</div>
                  </div>
                </div>

                {/* TV stat */}
                <div className="flex items-center gap-4">
                  <div className="bg-[#F47321]/20 rounded-lg p-3">
                    <Tv className="w-8 h-8 text-[#F47321]" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#F47321]">2.15</div>
                    <div className="text-xs text-white/60">days of watching TV</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-6">Company Consumption</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Here are some details about the company's efforts to make their tech more sustainable.
                </p>
                <p>
                  Including but not limited to information about model size, data centers used, and some statistics
                  on the overall current energy use.
                </p>
                <p className="text-sm text-white/60">
                  This is meant for transparency with users.
                </p>
              </div>

              {/* Circular stats - moved here to align with right column */}
              <div className="mt-8 flex gap-6 justify-start">
                {/* kWh circle */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#ffffff10"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#F47321"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40 * 0.6} ${2 * Math.PI * 40}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-[#F47321]">72.48</div>
                  <div className="text-xs text-white/60">kWh</div>
                </div>

                {/* CO2 circle */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#ffffff10"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#F47321"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40 * 0.35} ${2 * Math.PI * 40}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-[#F47321]">10.51</div>
                  <div className="text-xs text-white/60">kg eq CO2</div>
                </div>

                {/* Days circle */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#ffffff10"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#F47321"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-[#F47321]">124.93</div>
                  <div className="text-xs text-white/60">days</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'studentTools' && (
          <div key="student-tools-tab">
            <h2 className="text-2xl mb-6">Student Tools</h2>
            
            <div className="space-y-4 text-white/80 mb-8">
              <p>
                The Frost School of Music has partnered with leading AI music platforms to provide students with access to premium tools. Students can log in using their institutional email (@miami.edu) to access these tools.
              </p>
              <p className="text-sm text-white/60">
                Additionally, there are free AI music tools available to all users listed below.
              </p>
            </div>

            {/* Student Access Tools */}
            <div className="mb-8">
              <h3 className="text-lg mb-4">Student Access</h3>
              <div className="flex items-center gap-4">
                <div className="flex gap-4 flex-1">
                  {studentAccessTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/5 border border-white/20 rounded-2xl px-6 py-6 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className="bg-[#F47321]/20 rounded-xl p-3 flex-shrink-0">
                          <Icon className="w-8 h-8 text-[#F47321]" />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="font-semibold text-base">{tool.name}</div>
                          <div className="text-sm text-white/60">{tool.description}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <ChevronRight className="w-6 h-6 text-white/60 flex-shrink-0" />
              </div>
            </div>

            {/* Free Access Tools */}
            <div>
              <h3 className="text-lg mb-4">Free Access</h3>
              <div className="flex items-center gap-4">
                <div className="flex gap-4 flex-1">
                  {freeAccessTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/5 border border-white/20 rounded-2xl px-6 py-6 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className="bg-[#005030]/40 rounded-xl p-3 flex-shrink-0">
                          <Icon className="w-8 h-8 text-[#005030]" />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="font-semibold text-base">{tool.name}</div>
                          <div className="text-sm text-white/60">{tool.description}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <ChevronRight className="w-6 h-6 text-white/60 flex-shrink-0" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}