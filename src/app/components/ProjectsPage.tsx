import { useState } from 'react';
import { Folder, Music, Clock, Trash2, Play, Headphones, Plus } from 'lucide-react';
import { Toast } from './ui/toast';
import { useNavigate } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

const projects = [
  {
    id: 1,
    name: 'Project Template',
    songs: 3,
    lastModified: '3.17.26',
    note: 'Template project with example songs for demonstration',
  },
];

const recentGenerations = [
  { id: 'generated-song-3.17.26', name: 'Generated Song 3.17.26', type: 'Generated', date: '3.17.26', duration: '2:34' },
  { id: 'uploaded-song-3.17.26', name: 'Uploaded Song 3.17.26', type: 'Upload', date: '3.17.26', duration: '3:52' },
  { id: 'generated-song-3.16.26', name: 'Generated Song 3.16.26', type: 'Generated', date: '3.16.26', duration: '1:47' },
];

export function ProjectsPage() {
  const navigate = useNavigate();
  const { accentColor } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectNote, setProjectNote] = useState('');
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const project = selectedProject ? projects.find(p => p.id === selectedProject) : null;

  if (project) {
    return (
      <div className="p-12 max-w-7xl mx-auto">
        <button
          className="mb-8 flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
          style={{ color: 'var(--brand-muted)' }}
          onClick={() => setSelectedProject(null)}
        >
          ← Back to Projects
        </button>

        <div className="grid grid-cols-3 gap-8">
          {/* Left: Project Info */}
          <div className="col-span-1">
            <div
              className="backdrop-blur-sm rounded-3xl p-8 border"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
              >
                <Folder className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-3xl mb-2">{project.name}</h1>

              <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: 'var(--brand-muted)' }}>
                <div className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  <span>{project.songs} songs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{project.lastModified}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm mb-2" style={{ color: 'var(--brand-muted)' }}>
                  Project Notes
                </div>
                <textarea
                  value={projectNote || project.note}
                  onChange={(e) => setProjectNote(e.target.value)}
                  className="w-full h-32 rounded-2xl p-4 text-sm resize-none outline-none border transition-colors"
                  placeholder="Add notes about what you learned..."
                  style={{
                    background: 'var(--brand-input)',
                    borderColor: 'var(--brand-input-border)',
                    color: 'var(--brand-text)',
                  }}
                />
              </div>

              <div className="space-y-3">
                <button
                  className="w-full rounded-full py-3 text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                >
                  Export Project
                </button>
                <button
                  className="w-full rounded-full border py-3 text-sm transition-colors"
                  style={{
                    background: 'var(--brand-card)',
                    borderColor: 'var(--brand-border)',
                    color: 'var(--brand-muted)',
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Right: Song List */}
          <div className="col-span-2">
            <div
              className="backdrop-blur-sm rounded-3xl p-8 border"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
            >
              <h2 className="text-xl mb-6">Generations ({project.songs})</h2>

              <div className="space-y-3">
                {recentGenerations.slice(0, project.songs).map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-4 rounded-2xl transition-colors group"
                    style={{ background: 'var(--brand-card-hover)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-card-strong)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-card-hover)')}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                      >
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold" style={{ color: 'var(--brand-text)' }}>
                          {song.name}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--brand-muted)' }}>
                          {song.type} • {song.date} • {song.duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-full border px-3 py-1.5 text-xs flex items-center gap-1 transition-colors"
                        style={{
                          background: 'var(--brand-input)',
                          borderColor: 'var(--brand-border)',
                          color: 'var(--brand-muted)',
                        }}
                        onClick={() => setShowDemoWarning(true)}
                      >
                        <Play className="w-4 h-4" />
                        Play
                      </button>
                      <button
                        className="rounded-full border px-3 py-1.5 text-xs flex items-center gap-1 transition-colors"
                        style={{
                          background: 'var(--brand-input)',
                          borderColor: 'var(--brand-border)',
                          color: 'var(--brand-muted)',
                        }}
                        onClick={() => navigate(`/song/${song.id}`)}
                      >
                        <Headphones className="w-4 h-4" />
                        Practice
                      </button>
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1.5"
                        style={{ color: 'var(--brand-subtle)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-4">Projects</h1>
      <p className="mb-12" style={{ color: 'var(--brand-muted)' }}>
        Save, organize, and reflect on your work
      </p>

      {/* Projects Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Your Projects</h2>
          <button
            className="rounded-full px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
            onClick={() => setShowNewProjectModal(true)}
          >
            New Project
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className="backdrop-blur-sm rounded-3xl p-6 border transition-all cursor-pointer group"
              style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand-active-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--brand-border)')}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
              >
                <Folder className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl mb-2" style={{ color: 'var(--brand-text)' }}>
                {project.name}
              </h3>

              <div className="flex items-center gap-3 mb-4 text-sm" style={{ color: 'var(--brand-muted)' }}>
                <div className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  <span>{project.songs} songs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{project.lastModified}</span>
                </div>
              </div>

              <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>{project.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Songs */}
      <div>
        <h2 className="text-2xl mb-6">Recent Songs</h2>
        <div
          className="backdrop-blur-sm rounded-3xl p-8 border"
          style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
        >
          <div className="space-y-3">
            {recentGenerations.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-4 rounded-2xl transition-colors group"
                style={{ background: 'var(--brand-card-hover)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-card-strong)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand-card-hover)')}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                  >
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold" style={{ color: 'var(--brand-text)' }}>
                      {song.name}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--brand-muted)' }}>
                      {song.type} • {song.date} • {song.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full border px-3 py-1.5 text-xs flex items-center gap-1 transition-colors"
                    style={{
                      background: 'var(--brand-input)',
                      borderColor: 'var(--brand-border)',
                      color: 'var(--brand-muted)',
                    }}
                    onClick={() => setShowDemoWarning(true)}
                  >
                    <Play className="w-4 h-4" />
                    Play
                  </button>
                  <button
                    className="rounded-full border px-3 py-1.5 text-xs flex items-center gap-1 transition-colors"
                    style={{
                      background: 'var(--brand-input)',
                      borderColor: 'var(--brand-border)',
                      color: 'var(--brand-muted)',
                    }}
                    onClick={() => navigate(`/song/${song.id}`)}
                  >
                    <Headphones className="w-4 h-4" />
                    Practice
                  </button>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1.5"
                    style={{ color: 'var(--brand-subtle)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDemoWarning && (
        <Toast
          message="This is an educational prototype."
          onClose={() => setShowDemoWarning(false)}
        />
      )}

      {showNewProjectModal && (
        <div
          className="fixed inset-0 z-[10000] bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setShowNewProjectModal(false)}
        >
          <div
            className="backdrop-blur-md rounded-3xl p-8 max-w-md w-full border shadow-2xl"
            style={{ 
              background: 'var(--brand-modal)',
              borderColor: 'var(--brand-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-6">Create New Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name..."
              className="w-full rounded-2xl px-4 py-3 text-sm outline-none border transition-colors mb-6"
              style={{
                background: 'var(--brand-input)',
                borderColor: 'var(--brand-input-border)',
                color: 'var(--brand-text)',
              }}
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                className="rounded-full px-6 py-2.5 text-sm transition-colors"
                style={{
                  background: 'var(--brand-card)',
                  borderColor: 'var(--brand-border)',
                  color: 'var(--brand-muted)',
                }}
                onClick={() => {
                  setNewProjectName('');
                  setShowNewProjectModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-full px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                onClick={() => {
                  if (newProjectName.trim()) {
                    setShowDemoWarning(true);
                    setNewProjectName('');
                    setShowNewProjectModal(false);
                  }
                }}
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}