import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RefreshCw, Share2 } from 'lucide-react';

interface AnalysisReportProps {
  markdown: string;
  imageSrc?: string | null;
  onReset: () => void;
  title?: string;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ markdown, imageSrc, onReset, title = "Kết Quả Luận Giải" }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Result Header with Image (Conditional) */}
        {imageSrc ? (
          <div className="relative h-64 md:h-80 w-full bg-gradient-to-b from-slate-900 to-slate-800">
            <img 
              src={imageSrc} 
              alt="Analyzed" 
              className="w-full h-full object-contain p-4 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            <h2 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white drop-shadow-lg border-b-4 border-purple-500 pb-2 font-serif">
              {title}
            </h2>
          </div>
        ) : (
          <div className="relative h-32 w-full bg-gradient-to-r from-slate-900 to-slate-800 flex items-center px-8 border-b border-white/10">
             <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg font-serif border-l-4 border-purple-500 pl-4">
              {title}
            </h2>
          </div>
        )}

        {/* Markdown Content */}
        <div className="p-8 md:p-10 text-slate-200 space-y-6">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-purple-400 mt-8 mb-4 border-l-4 border-purple-500 pl-3 font-serif" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-amber-400 mt-6 mb-3 font-serif" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-100 mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="leading-relaxed text-slate-300 mb-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300" {...props} />,
              li: ({node, ...props}) => <li className="ml-4" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-900/80 p-6 flex justify-between items-center border-t border-slate-700/50">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" /> Xem Tiếp
          </button>
          
          <button 
            onClick={() => alert("Đã sao chép báo cáo vào bộ nhớ tạm!")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium shadow-lg shadow-purple-900/20"
          >
            <Share2 className="w-4 h-4" /> Chia Sẻ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
