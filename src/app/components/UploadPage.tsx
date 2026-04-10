import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';

export function PracticePage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
  };

  const handleSubmit = () => {
    // Generate a song ID with date and navigate
    const newSongId = `uploaded-song-3.17.26`;
    navigate(`/song/${newSongId}`);
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-12">Practice</h1>

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-6">
        <h2 className="text-lg mb-4">Upload Audio</h2>

        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all min-h-[150px] ${
            isDragging ? 'border-[#005030] bg-[#005030]/10' : 'border-white/20'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-20 h-20 rounded-full border-4 border-white/60 flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-white/60" />
          </div>

          <p className="text-white/60 mb-3">Drag and drop audio files here</p>
          <p className="text-white/40 text-sm">or</p>

          <Button className="mt-4 bg-gradient-to-r from-[#F47321] to-[#005030] hover:from-[#ff8a3d] hover:to-[#006838] text-white rounded-full px-8">
            Browse Files
          </Button>
        </div>
      </div>

      {/* Submit Button - outside the box like Create page */}
      <div className="flex justify-end gap-3">
        <Button 
          className="bg-gradient-to-r from-[#F47321] to-[#005030] hover:from-[#ff8a3d] hover:to-[#006838] text-white rounded-full px-8"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}