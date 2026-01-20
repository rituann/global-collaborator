import { useProfiles } from '../context/ProfileContext';
import Scale from './Scale';
import CountrySelector from './CountrySelector';
import TemplateButtons from './TemplateButtons';

export default function ProfileCreator({ profile, index, onRemove, canRemove }) {
  const { updateProfile, resetProfile, scales, getProfileColor } = useProfiles();

  if (!profile) return null;

  const colors = getProfileColor(index);

  const handleNameChange = (e) => {
    updateProfile(profile.id, { name: e.target.value });
  };

  const handleScaleChange = (scaleId, value) => {
    updateProfile(profile.id, { [scaleId]: value });
  };

  return (
    <div className={`rounded-lg border ${colors.border} overflow-hidden shadow-sm`}>
      <div className={`${colors.header} text-white px-4 py-2.5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{profile.flag || (index + 1)}</span>
            <input
              type="text"
              value={profile.name || ''}
              onChange={handleNameChange}
              className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 w-36"
              placeholder="Profile name"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => resetProfile(profile.id)}
              className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
            >
              Reset
            </button>
            {canRemove && (
              <button
                onClick={onRemove}
                className="text-xs bg-white/20 hover:bg-white/30 px-1.5 py-1 rounded transition-colors"
                title="Remove profile"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`${colors.bg} p-4`}>
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Quick Load</h4>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <CountrySelector profileId={profile.id} />
          </div>
          <TemplateButtons profileId={profile.id} />
        </div>

        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Dimensions</h4>
          {scales.map((scale) => (
            <Scale
              key={scale.id}
              scale={scale}
              value={profile[scale.id]}
              onChange={(value) => handleScaleChange(scale.id, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
