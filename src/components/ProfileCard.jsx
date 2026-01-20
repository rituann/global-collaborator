import { useProfiles } from '../context/ProfileContext';

export default function ProfileCard({ profile, index }) {
  const { scales, getProfileColor } = useProfiles();

  if (!profile) return null;

  const colors = getProfileColor(index);

  return (
    <div className={`rounded-xl border-2 ${colors.border} overflow-hidden shadow-lg`}>
      <div className={`${colors.header} text-white px-4 py-3`}>
        <h3 className="font-bold text-lg flex items-center gap-2">
          {profile.flag && <span className="text-2xl">{profile.flag}</span>}
          {profile.name || `Profile ${index + 1}`}
        </h3>
        {profile.description && (
          <p className="text-sm opacity-90 mt-1">{profile.description}</p>
        )}
      </div>

      <div className={`${colors.bg} p-4`}>
        <div className="space-y-3">
          {scales.map((scale) => (
            <div key={scale.id} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-24 truncate" title={scale.name}>
                {scale.name}
              </span>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${profile[scale.id]}%`, backgroundColor: colors.fill }}
                />
              </div>
              <span className={`text-xs font-medium ${colors.text} w-8 text-right`}>
                {profile[scale.id]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
