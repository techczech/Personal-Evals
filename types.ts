import { ReactNode } from 'react';

export interface SectionData {
  id: string;
  title: string;
  category: string;
  content: ReactNode;
  keywords: string; // Used for search filtering
  searchContent?: string; // Explicit content string for search (includes code blocks)
}

export interface SidebarProps {
  sections: SectionData[];
  activeSectionId: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}