import { useProfiles } from '../context/ProfileContext';

export default function CountrySelector({ profileId }) {
  const { countries, loadCountryProfile } = useProfiles();

  const handleChange = (e) => {
    const countryCode = e.target.value;
    if (countryCode) {
      loadCountryProfile(profileId, countryCode);
    }
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="" disabled>
        Select a country...
      </option>
      {Object.entries(countries).map(([code, country]) => (
        <option key={code} value={code}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  );
}
