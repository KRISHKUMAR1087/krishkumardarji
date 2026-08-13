import { useState, useEffect } from 'react';
import {
  AnimatedCursor,
  Navigation,
  Hero,
  MotionBackdrop,
  About,
  Hobbies,
  Education,
  Achievements,
  Certifications,
  Projects,
  Hackathons,
  GitHubHighlights,
  Contact,
  ScrollProgress,
} from './components';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function AppContent({ data, loading, error }) {
  return (
    <>
      <ScrollProgress />
      <AnimatedCursor />
      <Navigation />
      <Hero data={data} />
      <About data={data} />
      <Hobbies data={data} />
      <Education data={data} />
      <Achievements data={data} />
      <Certifications data={data} />
      <Projects data={data} />
      <Hackathons />
      <GitHubHighlights data={data} />
      <Contact data={data} />
    </>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0A0F1F 0%, #111725 50%, #0A0F1F 100%)',
            fontSize: '1.2rem',
            color: '#E9ECF5',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(108, 99, 255, 0.3)',
                borderTop: '4px solid #6C63FF',
                borderRadius: '50%',
                margin: '0 auto 20px',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p>Loading portfolio...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (error || !data) {
    return (
      <ThemeProvider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0A0F1F 0%, #111725 50%, #0A0F1F 100%)',
            color: '#E9ECF5',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <div>
            <h2 style={{ marginBottom: '10px', color: '#6C63FF' }}>Error Loading Portfolio</h2>
            <p>Please make sure the server is running at http://localhost:5000</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AppContent data={data} loading={loading} error={error} />
    </ThemeProvider>
  );
}

export default App;
