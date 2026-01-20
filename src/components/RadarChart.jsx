import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { useProfiles } from '../context/ProfileContext';

export default function RadarChart() {
  const { profiles, scales, getProfileColor } = useProfiles();

  if (!profiles || profiles.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">No profile data available</p>
      </div>
    );
  }

  const data = scales.map((scale) => {
    const point = { scale: scale.name, fullMark: 100 };
    profiles.forEach((profile) => {
      point[profile.name || `Profile ${profile.id}`] = profile[scale.id];
    });
    return point;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-4">
        <h3 className="font-bold text-lg">Culture Profile Visualization</h3>
        <p className="text-sm opacity-90">
          Radar chart comparison of {profiles.length} profile{profiles.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="p-4" style={{ height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="scale"
              tick={{ fill: '#4b5563', fontSize: 11 }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickCount={6}
            />
            {profiles.map((profile, index) => {
              const colors = getProfileColor(index);
              return (
                <Radar
                  key={profile.id}
                  name={profile.name || `Profile ${profile.id}`}
                  dataKey={profile.name || `Profile ${profile.id}`}
                  stroke={colors.stroke}
                  fill={colors.fill}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              );
            })}
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-gray-700 font-medium">{value}</span>
              )}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => `${label}`}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm">Reading the Chart</h4>
          <p className="text-xs text-gray-600">
            Each axis represents a cultural dimension. Points closer to the center (0)
            indicate the left side of the scale, while points toward the edge (100)
            indicate the right side. Overlapping areas show cultural alignment;
            separated areas indicate potential gaps.
          </p>
        </div>
      </div>
    </div>
  );
}
