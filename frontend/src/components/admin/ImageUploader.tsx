"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Mock handler for Phase 1 - replaces actual upload logic
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      // Simulate network delay for cloud upload as outlined in upload.service.ts
      await new Promise((res) => setTimeout(res, 1500));
      
      const newMocks = Array.from(files).map((f) => URL.createObjectURL(f));
      onChange([...images, ...newMocks]);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-10 transition-colors hover:bg-slate-100 hover:border-blue-400">
        <div className="flex flex-col items-center justify-center pb-2 pt-1 text-slate-500">
          {isUploading ? (
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-blue-600" />
          ) : (
            <UploadCloud className="mb-3 h-8 w-8 text-slate-400" />
          )}
          <p className="mb-1 text-sm font-semibold">
            {isUploading ? "Uploading to Cloudinary..." : "Click to upload images"}
          </p>
          <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input type="file" className="hidden" multiple accept="image/*" onChange={handleUpload} disabled={isUploading} />
      </label>

      {/* Grid Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 whitespace-nowrap">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-white">
              {/* Using a native img here to handle blob URLs naturally without Next/Image constraints */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="Vehicle view" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-slate-600 shadow opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-600 hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
