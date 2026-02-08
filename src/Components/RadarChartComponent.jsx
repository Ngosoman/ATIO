
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { THEME } from '../constants';

const RadarChartComponent = ({ scores }) => {
  const data = [
    { subject: 'Context', value: scores.contextMatch, fullMark: 100 },
    { subject: 'Evidence', value: scores.evidenceStrength, fullMark: 100 },
    { subject: 'Adoption', value: scores.adoptionHistory, fullMark: 100 },
    { subject: 'Grassroots', value: scores.grassrootsSuitability, fullMark: 100 },
    { subject: 'Cost', value: scores.costAccessibility, fullMark: 100 },
    { subject: 'Policy', value: scores.policyReadiness, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#666' }} />
          <Radar
            name="Score"
            dataKey="value"
            stroke={THEME.primary}
            fill={THEME.primary}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
