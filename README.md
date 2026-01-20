# The Global Collaborator

A cross-cultural team collaboration tool based on Erin Meyer's **"The Culture Map"** framework. This application helps global teams understand and bridge cultural differences through interactive profile comparison and actionable recommendations.

**Live Demo:** [https://global-collaborator.vercel.app](https://global-collaborator.vercel.app)

---

## What It Does

1. **Create Cultural Profiles** - Build profiles for team members, offices, or countries
2. **Compare Cultures** - Visualize differences across 8 cultural dimensions
3. **Identify Gaps** - Automatically detect the largest cultural gaps
4. **Get Recommendations** - Receive actionable advice for bridging differences

---

## Features

### 8 Cultural Dimensions

| Dimension | Scale |
|-----------|-------|
| **Communicating** | Low-Context ↔ High-Context |
| **Evaluating** | Direct ↔ Indirect Negative Feedback |
| **Persuading** | Principles-First ↔ Applications-First |
| **Leading** | Egalitarian ↔ Hierarchical |
| **Deciding** | Consensual ↔ Top-Down |
| **Trusting** | Task-Based ↔ Relationship-Based |
| **Disagreeing** | Confrontational ↔ Avoids Confrontation |
| **Scheduling** | Linear-Time ↔ Flexible-Time |

### Pre-loaded Profiles

**10 Countries:** USA, Brazil, Netherlands, China, France, Germany, Japan, India, Mexico, UK

**Example Personas:** Ritu, Jean-Pierre, Carlos

**Office Templates:** US HQ, Brazil, Amsterdam, UK, Australia

### Key Capabilities

- Compare up to **5 profiles** simultaneously
- **Radar chart** visualization
- **Gap analysis** with severity indicators
- **Action plan** with recommendations
- **Local storage** persistence

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite 7 | Build tool |
| Tailwind CSS 4 | Styling |
| Recharts | Charts |
| Vercel | Deployment |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+

```bash
node --version  # v18.0.0+
npm --version   # v9.0.0+
```

### Installation

```bash
git clone https://github.com/rituann/global-collaborator.git
cd global-collaborator
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/        # UI components
├── context/          # State management
├── data/             # Country & template data
├── utils/            # Gap analysis logic
├── App.jsx           # Main app
└── index.css         # Styles
```

---

## Usage

1. **Build Profiles** - Select countries or templates
2. **Add More** - Up to 5 profiles
3. **Compare** - View radar chart and gap analysis
4. **Action Plan** - Get recommendations

---

## Reference

Based on **"The Culture Map"** by Erin Meyer

---

## License

MIT

---

**Concept & Code:** Ritu Ann Roy
