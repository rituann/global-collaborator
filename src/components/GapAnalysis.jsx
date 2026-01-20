import { useProfiles } from '../context/ProfileContext';
import { calculateMultiProfileGaps, getGapColor } from '../utils/gapCalculator';

export default function GapAnalysis() {
  const { profiles, scales, getProfileColor } = useProfiles();

  if (!profiles || profiles.length < 2) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">
          Add at least 2 profiles to see gap analysis
        </p>
      </div>
    );
  }

  const gaps = calculateMultiProfileGaps(profiles, scales);
  const sortedGaps = [...gaps].sort((a, b) => b.gap - a.gap);
  const largestGap = sortedGaps[0];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4">
        <h3 className="font-bold text-lg">Gap Analysis</h3>
        <p className="text-sm opacity-90">
          Comparing {profiles.length} profiles across all dimensions
        </p>
      </div>

      <div className="p-6">
        {/* Profile Legend */}
        <div className="mb-4 flex flex-wrap gap-2">
          {profiles.map((profile, index) => {
            const colors = getProfileColor(index);
            return (
              <div
                key={profile.id}
                className="flex items-center gap-2 px-2 py-1 rounded-full text-xs"
                style={{ backgroundColor: colors.fill + '20', color: colors.stroke }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.fill }}
                />
                {profile.name || `Profile ${profile.id}`}
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          {sortedGaps.map((gap) => {
            const scale = scales.find((s) => s.id === gap.scaleId);
            const isLargest = gap.scaleId === largestGap.scaleId;

            return (
              <div
                key={gap.scaleId}
                className={`p-4 rounded-lg ${
                  isLargest ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800 flex items-center gap-2">
                    {scale?.name}
                    {isLargest && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        Largest Gap
                      </span>
                    )}
                  </span>
                  <span
                    className="font-bold px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: getGapColor(gap.gap) + '20',
                      color: getGapColor(gap.gap),
                    }}
                  >
                    Gap: {gap.gap}
                  </span>
                </div>

                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  {/* Gap highlight */}
                  <div
                    className="absolute top-0 h-full opacity-30"
                    style={{
                      left: `${gap.min}%`,
                      width: `${gap.gap}%`,
                      backgroundColor: getGapColor(gap.gap),
                    }}
                  />

                  {/* Profile markers */}
                  {gap.allValues.map((pv, idx) => {
                    const colors = getProfileColor(idx);
                    return (
                      <div
                        key={pv.id}
                        className="absolute top-0 h-full w-1 z-10"
                        style={{
                          left: `${pv.value}%`,
                          transform: 'translateX(-50%)',
                          backgroundColor: colors.stroke,
                        }}
                      >
                        <div
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white"
                          style={{ backgroundColor: colors.fill }}
                          title={`${pv.name}: ${pv.value}`}
                        />
                      </div>
                    );
                  })}

                  {/* Scale markers */}
                  <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-gray-400">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-gray-500">{scale?.leftLabel}</span>
                  <span className="text-gray-500">{scale?.rightLabel}</span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                  {gap.allValues.map((pv, idx) => {
                    const colors = getProfileColor(idx);
                    return (
                      <span key={pv.id} style={{ color: colors.stroke }}>
                        {pv.name}: {pv.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Gap Severity Legend</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span>Low (&lt;20)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#eab308' }} />
              <span>Moderate (20-39)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }} />
              <span>Significant (40-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }} />
              <span>High (60+)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
