import React, { useMemo } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface FileAttachmentProps {
  filename: string;
  path?: string;
  content?: string;
  label?: string;
}

export const FileAttachment: React.FC<FileAttachmentProps> = ({ filename, path, content, label = "ATTACHMENT" }) => {
  // Create a Blob URL if content is provided, otherwise use the path
  const fileUrl = useMemo(() => {
    if (content) {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      return URL.createObjectURL(blob);
    }
    return path || '#';
  }, [content, path]);

  return (
    <div className="my-4 relative group rounded-lg border border-gray-200 bg-white shadow-sm hover:border-primary-300 transition-all overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 tracking-wider">{label}</span>
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 p-2.5 bg-primary-50 text-primary-600 rounded-lg">
            <FileText size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate" title={filename}>{filename}</span>
            <span className="text-xs text-gray-500">Text Document</span>
          </div>
        </div>
        <div className="flex gap-2">
           <a 
            href={fileUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ExternalLink size={14} />
            <span>View</span>
          </a>
          <a 
            href={fileUrl} 
            download={filename}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-primary-600 border border-transparent rounded hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          >
            <Download size={14} />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
};