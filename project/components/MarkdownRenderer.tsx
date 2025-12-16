import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate prose-lg max-w-none font-serif leading-relaxed">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-brand-900 border-b-2 border-brand-100 pb-2 mb-6 mt-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-brand-700 mt-8 mb-4" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-slate-700 mt-6 mb-3" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-700" {...props} />,
          li: ({ node, ...props }) => <li className="pl-1" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold text-brand-600 bg-brand-50 px-1 rounded" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand-500 pl-4 py-2 my-4 bg-gray-50 italic text-slate-600 rounded-r" {...props} />
          ),
          code: ({ node, ...props }) => (
             <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded font-mono text-sm" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;