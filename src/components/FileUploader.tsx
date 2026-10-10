import React, { useRef, useState } from 'react';
import type { FileRecord } from '../types';
import { trackDocumentUpload } from '../utils/analytics';

export interface FileUploaderProps {
  files: FileRecord[];
  onFilesChange: (files: FileRecord[]) => void;
  maxFiles?: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFilesChange,
  maxFiles = 10,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileList(e.target.files);
    }
  };

  const processFileList = (fileList: FileList) => {
    const newFiles: FileRecord[] = [...files];
    const fileTypesAdded: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      if (newFiles.length >= maxFiles) break;
      const f = fileList[i];
      const detectedType = f.type || (f.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');
      fileTypesAdded.push(detectedType);

      newFiles.push({
        id: `${f.name}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: f.name,
        sizeBytes: f.size,
        type: detectedType,
      });
    }

    onFilesChange(newFiles);
    trackDocumentUpload(newFiles.length, fileTypesAdded);
  };

  const handleRemove = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileBadge = (type: string, name: string) => {
    if (type.includes('pdf') || name.toLowerCase().endsWith('.pdf')) {
      return { label: 'PDF Report', color: 'badge-pdf' };
    }
    if (type.includes('image') || /\.(jpg|jpeg|png|webp|heic)$/i.test(name)) {
      return { label: 'Document Photo / Scan', color: 'badge-img' };
    }
    return { label: 'Document', color: 'badge-doc' };
  };

  return (
    <div className="simple-uploader-wrapper">
      <div className="simple-uploader-header">
        <label className="simple-upload-main-label">
          SHARE YOUR MEDICAL RECORDS
        </label>
        <p className="simple-upload-helper">
          You can upload relevant medical documents such as:
          <strong> CT / MRI / PET reports</strong>, <strong>Pathology & Biopsy reports</strong>, <strong>Prescriptions</strong>, <strong>Treatment records</strong>, <strong>Clinical notes</strong>, or <strong>Photos of medical documents taken with your phone</strong>.
        </p>
      </div>

      <div
        className={`simple-uploader-dropzone ${isDragActive ? 'drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label="Upload reports, prescriptions or scans"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,image/*,application/pdf"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />

        <div className="uploader-icon-cloud" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <div className="uploader-prompt-lead">
          Upload reports, prescriptions or scans
        </div>
        <div className="uploader-prompt-btn">
          <span>Choose Files or Photos</span>
        </div>
        <div className="uploader-prompt-formats">
          Supports PDF reports and photo images (JPEG, PNG, HEIC) up to 25MB each
        </div>
      </div>

      {files.length > 0 && (
        <div className="simple-uploaded-files-list">
          <div className="files-list-header">
            <span>Attached Documents ({files.length} of {maxFiles})</span>
          </div>
          {files.map((file) => {
            const badge = getFileBadge(file.type, file.name);
            return (
              <div key={file.id} className="simple-file-row">
                <div className="file-info-col">
                  <span className={`file-badge ${badge.color}`}>{badge.label}</span>
                  <span className="file-name-text" title={file.name}>{file.name}</span>
                  <span className="file-size-text">({formatFileSize(file.sizeBytes)})</span>
                </div>

                <div className="file-status-col">
                  <span className="file-status-tag">Ready for review</span>
                  <button
                    type="button"
                    className="file-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(file.id);
                    }}
                    title="Remove this document"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
