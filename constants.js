
import { Persona } from './types.js';

export const PERSONA_CONFIGS = [
  {
    id: Persona.FARMER,
    title: 'Farmer',
    description: 'Real-time crop advice, market prices, and climate smart techniques.',
    color: '#2E7D32', // Forest Green
    icon: '🌾'
  },
  {
    id: Persona.RESEARCHER,
    title: 'Researcher',
    description: 'Deep-dive datasets, comparison tools, and scientific trends.',
    color: '#00695C', // Teal
    icon: '🔬'
  },
  {
    id: Persona.POLICYMAKER,
    title: 'Policymaker',
    description: 'Policy briefs, SDG tracking, and high-level food system impact.',
    color: '#6D4C41', // Earth Brown
    icon: '🏛️'
  }
];

export const MOCK_INDICATORS = [
  { id: '1', name: 'Maize Yield', value: 4.2, unit: 'ton/ha', trend: 'up', category: 'Production' },
  { id: '2', name: 'Fertilizer Price', value: 850, unit: 'USD/ton', trend: 'down', category: 'Market' },
  { id: '3', name: 'Soil Organic Carbon', value: 1.8, unit: '%', trend: 'stable', category: 'Environment' },
  { id: '4', name: 'Food Inflation', value: 12.4, unit: '%', trend: 'up', category: 'Policy' },
];
