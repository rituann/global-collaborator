import { createContext, useContext, useState, useEffect } from 'react';
import cultureData from '../data/cultureProfiles.json';

const ProfileContext = createContext();

const defaultProfile = {
  name: 'New Profile',
  communicating: 50,
  evaluating: 50,
  persuading: 50,
  leading: 50,
  deciding: 50,
  trusting: 50,
  disagreeing: 50,
  scheduling: 50,
};

const STORAGE_KEY = 'globalCollaborator_profiles_v2';
const MAX_PROFILES = 5;

// Professional color palette - muted, corporate tones
const profileColors = [
  { name: 'blue', bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-[#2c72db]', text: 'text-[#2c72db]', fill: '#2c72db', stroke: '#1e5bb8' },
  { name: 'slate', bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-slate-600', text: 'text-slate-600', fill: '#475569', stroke: '#334155' },
  { name: 'teal', bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-teal-600', text: 'text-teal-600', fill: '#0d9488', stroke: '#0f766e' },
  { name: 'indigo', bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-indigo-600', text: 'text-indigo-600', fill: '#4f46e5', stroke: '#4338ca' },
  { name: 'stone', bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-stone-600', text: 'text-stone-600', fill: '#57534e', stroke: '#44403c' },
];

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // Invalid data, use default
      }
    }
    return [{ ...defaultProfile, id: 1, name: 'Profile 1' }];
  });

  // Save to localStorage whenever profiles change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = () => {
    if (profiles.length >= MAX_PROFILES) return;
    const newId = Math.max(...profiles.map(p => p.id), 0) + 1;
    setProfiles([...profiles, { ...defaultProfile, id: newId, name: `Profile ${newId}` }]);
  };

  const removeProfile = (id) => {
    if (profiles.length <= 1) return;
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const updateProfile = (id, updates) => {
    setProfiles(profiles.map(p =>
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  const loadCountryProfile = (id, countryCode) => {
    const country = cultureData.countries[countryCode];
    if (country) {
      updateProfile(id, {
        name: country.name,
        flag: country.flag,
        communicating: country.communicating,
        evaluating: country.evaluating,
        persuading: country.persuading,
        leading: country.leading,
        deciding: country.deciding,
        trusting: country.trusting,
        disagreeing: country.disagreeing,
        scheduling: country.scheduling,
      });
    }
  };

  const loadTemplate = (id, templateKey) => {
    const template = cultureData.templates[templateKey];
    if (template) {
      updateProfile(id, {
        name: template.name,
        description: template.description,
        flag: undefined,
        communicating: template.communicating,
        evaluating: template.evaluating,
        persuading: template.persuading,
        leading: template.leading,
        deciding: template.deciding,
        trusting: template.trusting,
        disagreeing: template.disagreeing,
        scheduling: template.scheduling,
      });
    }
  };

  const resetProfile = (id) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      updateProfile(id, {
        ...defaultProfile,
        name: profile.name,
        flag: undefined,
        description: undefined,
      });
    }
  };

  const getProfileColor = (index) => {
    return profileColors[index % profileColors.length];
  };

  // Legacy support for profile1 and profile2
  const profile1 = profiles[0] || null;
  const profile2 = profiles[1] || null;

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        profile1,
        profile2,
        addProfile,
        removeProfile,
        updateProfile,
        loadCountryProfile,
        loadTemplate,
        resetProfile,
        getProfileColor,
        maxProfiles: MAX_PROFILES,
        scales: cultureData.scales,
        countries: cultureData.countries,
        templates: cultureData.templates,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
}
