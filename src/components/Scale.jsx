import { useState } from 'react';

export default function Scale({
  scale,
  value,
  onChange,
  disabled = false,
  showTooltip = true,
}) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {scale.name}
          {showTooltip && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowDescription(!showDescription)}
              title="Show description"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </h3>
        <span className="text-xs font-medium text-gray-500">{value}</span>
      </div>

      {showDescription && (
        <div className="mb-2 p-2 bg-gray-50 rounded text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium text-gray-700">{scale.leftLabel}:</span>
              <p className="text-gray-500 mt-0.5">{scale.leftDescription}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">{scale.rightLabel}:</span>
              <p className="text-gray-500 mt-0.5">{scale.rightDescription}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-500 w-20 text-right truncate" title={scale.leftLabel}>
          {scale.leftLabel}
        </span>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            disabled={disabled}
            className="w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <span className="text-[10px] text-gray-500 w-20 truncate" title={scale.rightLabel}>
          {scale.rightLabel}
        </span>
      </div>
    </div>
  );
}
