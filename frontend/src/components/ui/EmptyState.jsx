// Friendly placeholder for empty lists / search results / etc.
// Pass an icon component from lucide-react.

export function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center text-center py-16 px-4 ${className}`}>
      {Icon && (
        <div className="p-3 bg-slate-100 rounded-full mb-4">
          <Icon className="w-6 h-6 text-slate-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
