import { useProfiles } from '../context/ProfileContext';

export default function TemplateButtons({ profileId }) {
  const { templates, loadTemplate } = useProfiles();

  // Separate offices from personas
  const offices = Object.entries(templates).filter(([key]) => key.startsWith('office'));
  const personas = Object.entries(templates).filter(([key]) => key.startsWith('persona'));

  return (
    <div className="space-y-2">
      {/* Example Profiles (Personas) - shown first */}
      {personas.length > 0 && (
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Example Profiles</p>
          <div className="flex flex-wrap gap-1">
            {personas.map(([key, template]) => (
              <button
                key={key}
                onClick={() => loadTemplate(profileId, key)}
                className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors border border-slate-200"
                title={template.description}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Office locations */}
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Sample from Location</p>
        <div className="flex flex-wrap gap-1">
          {offices.map(([key, template]) => (
            <button
              key={key}
              onClick={() => loadTemplate(profileId, key)}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors border border-slate-200"
              title={template.description}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
