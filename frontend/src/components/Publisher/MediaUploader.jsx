import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MediaUploader({ onFilesSelected }) {
  const onDrop = useCallback(acceptedFiles => onFilesSelected(acceptedFiles), []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="border-dashed border-2 p-6 text-center cursor-pointer mb-3">
      <input {...getInputProps()} />
      <p>Drag & drop images/videos, or click to select</p>
    </div>
  );
}
