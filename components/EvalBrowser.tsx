import React, { useState, useEffect } from 'react';
import { Menu, Search, X, ChevronRight, Home } from 'lucide-react';
import { contentData } from '../data';
import { SectionData } from '../types';

// Helper to group sections by category
const groupSections = (sections: SectionData[]) => {
  const groups: Record<string, SectionData[]> = {};
  sections.forEach(section => {
    if (!groups[section.category]) {
      groups[section.category] = [];
    }
    groups[section.category].push(section);
  });
  return groups;
};

interface EvalBrowserProps {
  onBack: () => void;
}

export const EvalBrowser: React.FC<EvalBrowserProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(contentData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(contentData);

  // Group data for sidebar
  const groupedSections = groupSections(contentData);

  // Filter logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(contentData);
      return;
    }
    
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = contentData.filter(section => {
      const searchSpace = [
        section.title,
        section.keywords,
        section.searchContent || '',
        // Keep checking content string for backward compatibility if ever used
        (typeof section.content === 'string' ? section.content : '')
      ].join(' ').toLowerCase();
      
      return searchSpace.includes(lowerTerm);
    });
    setFilteredData(filtered);
  }, [searchTerm]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans text-gray-900">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-72 bg-gray-50 border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 bg-white">
          <button 
            onClick={onBack}
            className="mr-3 p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Back to Home"
          >
            <Home size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-lg tracking-tight">EvalPrompts</span>
          </div>
          <button 
            className="ml-auto lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(groupedSections).map(([category, sections]) => {
            // Only show category if it has visible sections after filtering
            const visibleSections = sections.filter(s => filteredData.find(f => f.id === s.id));
            if (visibleSections.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                  {category}
                </h3>
                <div className="space-y-1">
                  {visibleSections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-between group
                        ${activeSection === section.id 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                      `}
                    >
                      <span className="truncate">{section.title}</span>
                      {activeSection === section.id && <ChevronRight size={14} className="text-primary-500" />}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No results found for "{searchTerm}"
            </div>
          )}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center bg-gray-50">
           Updated 29 Mar 2025
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Mobile Header */}
        <header className="h-16 lg:hidden flex items-center justify-between px-4 border-b border-gray-200 bg-white z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-800">EvalPrompts</span>
          <div className="w-8"></div> {/* Spacer for centering */}
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto bg-white p-4 lg:p-12 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-16 pb-24">
            {filteredData.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-24 border-b border-gray-100 pb-12 last:border-0 animate-in fade-in duration-500"
              >
                {/* Content Render */}
                <div className="prose prose-orange max-w-none">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};