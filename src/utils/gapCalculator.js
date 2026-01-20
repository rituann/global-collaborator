// Gap calculation utilities for cultural profile comparison

export const scaleIds = [
  'communicating',
  'evaluating',
  'persuading',
  'leading',
  'deciding',
  'trusting',
  'disagreeing',
  'scheduling',
];

export function calculateGaps(profile1, profile2) {
  if (!profile1 || !profile2) return [];

  return scaleIds.map((scaleId) => ({
    scaleId,
    value1: profile1[scaleId],
    value2: profile2[scaleId],
    gap: Math.abs(profile1[scaleId] - profile2[scaleId]),
  }));
}

export function getLargestGap(profile1, profile2) {
  const gaps = calculateGaps(profile1, profile2);
  if (gaps.length === 0) return null;

  return gaps.reduce((largest, current) =>
    current.gap > largest.gap ? current : largest
  );
}

// Calculate gaps across multiple profiles
export function calculateMultiProfileGaps(profiles, scales) {
  if (!profiles || profiles.length < 2) return [];

  const gapsByScale = scaleIds.map((scaleId) => {
    const values = profiles.map((p) => p[scaleId]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const gap = max - min;

    // Find which profiles have min/max
    const minProfiles = profiles.filter((p) => p[scaleId] === min);
    const maxProfiles = profiles.filter((p) => p[scaleId] === max);

    return {
      scaleId,
      gap,
      min,
      max,
      minProfiles: minProfiles.map((p) => p.name || `Profile ${p.id}`),
      maxProfiles: maxProfiles.map((p) => p.name || `Profile ${p.id}`),
      allValues: profiles.map((p) => ({
        name: p.name || `Profile ${p.id}`,
        value: p[scaleId],
        id: p.id,
      })),
    };
  });

  return gapsByScale;
}

// Get all pairwise comparisons
export function getPairwiseComparisons(profiles) {
  if (!profiles || profiles.length < 2) return [];

  const pairs = [];
  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      const gaps = calculateGaps(profiles[i], profiles[j]);
      const totalGap = gaps.reduce((sum, g) => sum + g.gap, 0);
      const avgGap = totalGap / gaps.length;
      const largestGap = gaps.reduce((max, g) => (g.gap > max.gap ? g : max), gaps[0]);

      pairs.push({
        profile1: profiles[i],
        profile2: profiles[j],
        gaps,
        totalGap,
        avgGap,
        largestGap,
      });
    }
  }

  return pairs.sort((a, b) => b.avgGap - a.avgGap);
}

export function getGapSeverity(gap) {
  if (gap < 20) return 'low';
  if (gap < 40) return 'moderate';
  if (gap < 60) return 'significant';
  return 'high';
}

export function getGapColor(gap) {
  if (gap < 20) return '#22c55e'; // green
  if (gap < 40) return '#eab308'; // yellow
  if (gap < 60) return '#f97316'; // orange
  return '#ef4444'; // red
}

// Action plan recommendations based on gaps
const actionRecommendations = {
  communicating: {
    high: [
      'Explicitly clarify expectations in writing after verbal discussions',
      'Use visual aids and written summaries to ensure message clarity',
      'Ask clarifying questions to uncover implicit meanings',
      'Be patient with communication that seems overly detailed or vague',
    ],
    moderate: [
      'Check for understanding by summarizing key points',
      'Be mindful of cultural context in messages',
      'Use clear, direct language while respecting nuance',
    ],
  },
  evaluating: {
    high: [
      'Adjust feedback delivery style - soften direct feedback or be more explicit',
      'Provide feedback in private settings when working with indirect cultures',
      'Frame criticism constructively and focus on behaviors, not personal traits',
      'Be prepared that "okay" might mean "needs improvement" in some cultures',
    ],
    moderate: [
      'Balance directness with diplomatic phrasing',
      'Consider the setting and audience when giving feedback',
    ],
  },
  persuading: {
    high: [
      'Adapt presentation style - lead with theory OR practical examples based on audience',
      'For principles-first cultures: explain the "why" before the "what"',
      'For applications-first cultures: start with examples, then explain underlying logic',
      'Prepare both conceptual frameworks and concrete case studies',
    ],
    moderate: [
      'Balance theoretical foundations with practical applications',
      'Adjust depth of explanation based on audience preferences',
    ],
  },
  leading: {
    high: [
      'Adjust formality level in communications with leadership',
      'Be mindful of hierarchy in meetings - who speaks first, seating arrangements',
      'In egalitarian cultures: encourage open dialogue across all levels',
      'In hierarchical cultures: show appropriate respect for titles and seniority',
    ],
    moderate: [
      'Observe and adapt to local leadership dynamics',
      'Balance accessibility with appropriate professional distance',
    ],
  },
  deciding: {
    high: [
      'Align expectations on decision-making timelines',
      'In consensual cultures: allow more time for group input and buy-in',
      'In top-down cultures: identify key decision-makers early',
      'Document decisions clearly and communicate to all stakeholders',
    ],
    moderate: [
      'Be flexible with decision-making processes',
      'Ensure key stakeholders are consulted appropriately',
    ],
  },
  trusting: {
    high: [
      'Invest time in relationship-building activities beyond work tasks',
      'Schedule informal time together - meals, social events',
      'Be patient - trust takes longer to build in relationship-based cultures',
      'Share appropriate personal information to build deeper connections',
    ],
    moderate: [
      'Balance task focus with relationship maintenance',
      'Make time for informal interactions alongside work activities',
    ],
  },
  disagreeing: {
    high: [
      'Establish ground rules for constructive debate in team settings',
      'For confrontational cultures: embrace healthy debate as productive',
      'For conflict-avoidant cultures: provide safe channels for dissenting views',
      'Separate ideas from personal identity when disagreements arise',
    ],
    moderate: [
      'Create psychological safety for expressing different viewpoints',
      'Model respectful disagreement and debate',
    ],
  },
  scheduling: {
    high: [
      'Set explicit expectations about deadlines and punctuality',
      'Build buffer time into project schedules when working across cultures',
      'In linear-time cultures: stick to agendas and respect time boundaries',
      'In flexible-time cultures: allow for organic conversation flow',
    ],
    moderate: [
      'Communicate schedule expectations clearly',
      'Be flexible while maintaining accountability',
    ],
  },
};

export function getActionRecommendations(scaleId, gap) {
  const severity = gap >= 40 ? 'high' : 'moderate';
  const recommendations = actionRecommendations[scaleId];

  if (!recommendations) return [];

  return recommendations[severity] || recommendations.moderate || [];
}

export function generateActionPlan(profiles, scales) {
  if (!profiles || profiles.length < 2) return [];

  const multiGaps = calculateMultiProfileGaps(profiles, scales);
  const sortedGaps = [...multiGaps].sort((a, b) => b.gap - a.gap);

  // Get top 3 gaps that are significant enough to address
  const significantGaps = sortedGaps.filter((g) => g.gap >= 20).slice(0, 3);

  return significantGaps.map((gapData) => {
    const scale = scales.find((s) => s.id === gapData.scaleId);
    return {
      scale: scale?.name || gapData.scaleId,
      scaleId: gapData.scaleId,
      gap: gapData.gap,
      severity: getGapSeverity(gapData.gap),
      minProfiles: gapData.minProfiles,
      maxProfiles: gapData.maxProfiles,
      minLabel: scale?.leftLabel,
      maxLabel: scale?.rightLabel,
      allValues: gapData.allValues,
      recommendations: getActionRecommendations(gapData.scaleId, gapData.gap),
    };
  });
}
