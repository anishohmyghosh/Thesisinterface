import { useState } from 'react';
import { Upload, FolderOpen } from 'lucide-react';
import { Toast } from './ui/toast';
import { useNavigate } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

export function UploadPageNew() {
  const navigate = useNavigate();
  const { accentColor } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [showDemoWarning, setShowDemoWarning] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (_e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-4xl mb-4">Upload</h1>
      <p className="mb-12" style={{ color: 'var(--brand-muted)' }}>
        Upload audio files to analyze and practice
      </p>

      <div className="space-y-6">
        {/* Upload Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="backdrop-blur-sm rounded-3xl p-12 border-2 border-dashed transition-all"
          style={{
            background: isDragging ? 'var(--brand-active)' : 'var(--brand-card)',
            borderColor: isDragging ? 'var(--brand-active-border)' : 'var(--brand-border)',
          }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'var(--brand-stat)' }}
            >
              <Upload className="w-12 h-12" style={{ color: accentColor }} />
            </div>

            <h2 className="text-2xl mb-3">Drop audio files here</h2>
            <p className="mb-6" style={{ color: 'var(--brand-muted)' }}>or click to browse</p>

            <label htmlFor="file-upload" className="cursor-pointer">
              <button
                className="rounded-full px-8 py-3 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))' }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowDemoWarning(true);
                }}
              >
                Choose Files
              </button>
              <input
                id="file-upload"
                type="file"
                accept="audio/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>

            <p className="text-xs mt-6" style={{ color: 'var(--brand-subtle)' }}>
              Supported formats: MP3, WAV, FLAC, OGG, M4A
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--brand-subtle)' }}>
              Only upload non-copyrighted material
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
          <span className="text-sm" style={{ color: 'var(--brand-subtle)' }}>or</span>
          <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
        </div>

        {/* Choose from Projects */}
        <div
          className="backdrop-blur-sm rounded-3xl p-8 border"
          style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
        >
          <div className="flex items-center gap-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--brand-stat)' }}
            >
              <FolderOpen className="w-8 h-8" style={{ color: accentColor }} />
            </div>

            <div className="flex-1">
              <h3 className="text-xl mb-2">Choose from Your Projects</h3>
              <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>
                Select audio files from your existing projects and library
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="rounded-full border px-6 py-2.5 text-sm transition-colors"
              style={{
                background: 'var(--brand-input)',
                borderColor: 'var(--brand-border)',
                color: 'var(--brand-muted)',
              }}
            >
              Browse Projects
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div
          className="rounded-2xl p-6 border"
          style={{ background: 'var(--brand-card)', borderColor: 'var(--brand-border)' }}
        >
          <h4 className="text-sm mb-3" style={{ color: 'var(--brand-text)' }}>
            What you can do after uploading:
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--brand-muted)' }}>
            <li>• Analyze audio with stem separation and waveform visualization</li>
            <li>• Practice with AI-powered tools and backing tracks</li>
            <li>• Edit and enhance your recordings</li>
            <li>• Save to your projects for future reference</li>
          </ul>
        </div>
      </div>

      {showDemoWarning && (
        <Toast
          message="This is an educational prototype."
          onClose={() => setShowDemoWarning(false)}
        />
      )}
    </div>
  );
}