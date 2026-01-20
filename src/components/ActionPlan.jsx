import { useProfiles } from '../context/ProfileContext';
import { generateActionPlan, getGapColor } from '../utils/gapCalculator';

export default function ActionPlan() {
  const { profiles, scales, getProfileColor } = useProfiles();

  if (!profiles || profiles.length < 2) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">
          Add at least 2 profiles to see action plan
        </p>
      </div>
    );
  }

  const actionPlan = generateActionPlan(profiles, scales);

  if (actionPlan.length === 0) {
    return (
      <div className="bg-green-50 rounded-xl p-8 text-center border border-green-200">
        <div className="text-green-600 text-4xl mb-3">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-green-800 text-lg">
          Great Cultural Alignment!
        </h3>
        <p className="text-green-600 mt-2">
          These profiles are well-aligned across all cultural dimensions.
          No significant gaps to address.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4">
        <h3 className="font-bold text-lg">Action Plan</h3>
        <p className="text-sm opacity-90">
          Recommendations for bridging cultural gaps across {profiles.length} profiles
        </p>
      </div>

      <div className="p-6 space-y-6">
        {actionPlan.map((item, index) => (
          <div
            key={item.scaleId}
            className="border rounded-lg overflow-hidden"
            style={{ borderColor: getGapColor(item.gap) }}
          >
            <div
              className="px-4 py-3"
              style={{ backgroundColor: getGapColor(item.gap) + '15' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {index + 1}. {item.scale}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{item.minProfiles.join(', ')}</span>
                    {' tend toward '}
                    <span className="font-medium text-blue-600">{item.minLabel}</span>
                    {' while '}
                    <span className="font-medium">{item.maxProfiles.join(', ')}</span>
                    {' tend toward '}
                    <span className="font-medium text-purple-600">{item.maxLabel}</span>
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-sm font-bold shrink-0"
                  style={{
                    backgroundColor: getGapColor(item.gap),
                    color: 'white',
                  }}
                >
                  Gap: {item.gap}
                </div>
              </div>

              {/* Mini profile comparison */}
              <div className="mt-3 flex flex-wrap gap-2">
                {item.allValues
                  .sort((a, b) => a.value - b.value)
                  .map((pv) => {
                    const profileIndex = profiles.findIndex((p) => p.id === pv.id);
                    const colors = getProfileColor(profileIndex);
                    return (
                      <div
                        key={pv.id}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: colors.fill + '20', color: colors.stroke }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.fill }}
                        />
                        {pv.name}: {pv.value}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="p-4 bg-white">
              <h5 className="text-sm font-semibold text-gray-700 mb-3">
                Recommended Actions:
              </h5>
              <ul className="space-y-2">
                {item.recommendations.map((rec, recIndex) => (
                  <li key={recIndex} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-500 mt-0.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Remember
          </h4>
          <p className="text-sm text-amber-700">
            Cultural profiles represent tendencies, not absolutes. Individual variation
            exists within every culture. Use these recommendations as starting points
            for discussion and adaptation, not rigid rules.
          </p>
        </div>
      </div>
    </div>
  );
}
