import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelected(e.dataTransfer.files[0]);
    }
  }, [onImageSelected]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full h-64 border-2 border-dashed border-slate-600 rounded-xl hover:border-purple-500 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group relative"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors">
        <div className="mb-4 p-4 rounded-full bg-slate-800 group-hover:bg-purple-900/30 transition-colors">
          <Upload className="w-8 h-8" />
        </div>
        <p className="font-medium text-lg mb-1">Tải ảnh lên</p>
        <p className="text-sm text-slate-500">Kéo thả hoặc nhấp để chọn ảnh</p>
      </div>
    </div>
  );
};

export default ImageUpload;