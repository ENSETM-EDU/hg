import { Download, ExternalLink } from 'lucide-react';
import { Download as DownloadType } from '../types';

interface PdfLinkProps {
  download: DownloadType;
  className?: string;
}

export default function PdfLink({ download, className = '' }: PdfLinkProps) {
  return (
    <a
      href={download.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${className}`}
    >
      <Download className="w-4 h-4" />
      <span>{download.label}</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}