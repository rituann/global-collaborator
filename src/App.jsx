import { useState } from 'react';
import { ProfileProvider, useProfiles } from './context/ProfileContext';
import ProfileCreator from './components/ProfileCreator';
import ProfileCard from './components/ProfileCard';
import GapAnalysis from './components/GapAnalysis';
import ActionPlan from './components/ActionPlan';
import RadarChart from './components/RadarChart';

function AppContent() {
  const { profiles, addProfile, removeProfile, maxProfiles } = useProfiles();
  const [activeTab, setActiveTab] = useState('profiles');

  const tabs = [
    { id: 'profiles', label: 'Build Profiles', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'compare', label: 'Compare', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'action', label: 'Action Plan', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  ];

  const canAddProfile = profiles.length < maxProfiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">
            The Global Collaborator
          </h1>
          <p className="text-xs text-gray-500">
            Cross-cultural collaboration tool based on Erin Meyer's "The Culture Map"
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2c72db] text-[#2c72db]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
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
                    d={tab.icon}
                  />
                </svg>
                {tab.label}
                {tab.id === 'profiles' && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {profiles.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Build Profiles Tab */}
        {activeTab === 'profiles' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Build Culture Profiles</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Create up to {maxProfiles} profiles to compare. Select countries, use templates, or customize values.
                </p>
              </div>
              {canAddProfile && (
                <button
                  onClick={addProfile}
                  className="bg-[#2c72db] hover:bg-[#1e5bb8] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Profile ({profiles.length}/{maxProfiles})
                </button>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {profiles.map((profile, index) => (
                <ProfileCreator
                  key={profile.id}
                  profile={profile}
                  index={index}
                  onRemove={() => removeProfile(profile.id)}
                  canRemove={profiles.length > 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Compare Tab */}
        {activeTab === 'compare' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Profile Comparison</h2>
              <p className="text-gray-600 text-sm mt-1">
                Visualize and analyze cultural differences between {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
              </p>
            </div>

            {profiles.length < 2 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 flex items-center gap-2">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Add at least 2 profiles to enable comparison features
                </p>
                <button
                  onClick={() => {
                    addProfile();
                    setActiveTab('profiles');
                  }}
                  className="mt-3 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Add Another Profile
                </button>
              </div>
            )}

            {/* Profile Cards */}
            <div className={`grid gap-4 mb-8 ${
              profiles.length === 1 ? 'grid-cols-1 max-w-md' :
              profiles.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              profiles.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {profiles.map((profile, index) => (
                <ProfileCard key={profile.id} profile={profile} index={index} />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <RadarChart />
              <GapAnalysis />
            </div>
          </div>
        )}

        {/* Action Plan Tab */}
        {activeTab === 'action' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Action Plan</h2>
              <p className="text-gray-600 text-sm mt-1">
                Recommendations for bridging cultural gaps and improving collaboration
              </p>
            </div>

            {profiles.length < 2 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 flex items-center gap-2">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Add at least 2 profiles to generate an action plan
                </p>
                <button
                  onClick={() => {
                    addProfile();
                    setActiveTab('profiles');
                  }}
                  className="mt-3 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Add Another Profile
                </button>
              </div>
            )}

            <ActionPlan />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Based on "The Culture Map" by Erin Meyer
            </p>
            <p className="text-sm text-gray-400">
              Profiles saved locally in your browser
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <a
              href="https://github.com/rituann/global-collaborator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#2c72db] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Coded with love by Ritu Ann Roy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
}

export default App;
