import React from 'react';

interface ToolbarProps {
  isImporting: boolean;
  isExporting: boolean;
  isGenerating: boolean;
  hasData: boolean;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTemplate: () => void;
  onExport: () => void;
  onPDF: () => void;
  onNew: () => void;
}

const KisiToolbar: React.FC<ToolbarProps> = ({
  isImporting,
  isExporting,
  isGenerating,
  hasData,
  onImport,
  onTemplate,
  onExport,
  onPDF,
  onNew,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-4">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kişi Yönetimi</h2>
      <div className="flex items-center">
        <button
          onClick={onNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Yeni Kişi Ekle
        </button>
      </div>
    </div>
  );
};

export default KisiToolbar;
