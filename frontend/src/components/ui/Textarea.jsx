// Same shape as Input but for multiline text.

export function Textarea({ label, error, hint, className = '', ...rest }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </span>
      )}
      <textarea
        className={`w-full px-3.5 py-2.5 border rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 resize-y ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'
        } ${className}`}
        {...rest}
      />
      {error && (
        <span className="block text-xs text-red-600 mt-1.5">{error}</span>
      )}
      {hint && !error && (
        <span className="block text-xs text-slate-500 mt-1.5">{hint}</span>
      )}
    </label>
  );
}
