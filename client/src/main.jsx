import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Caught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          maxWidth: '800px',
          margin: '40px auto',
          background: '#121726',
          border: '1px solid #ff4d4f',
          borderRadius: '16px',
          color: '#ffffff',
          fontFamily: 'monospace'
        }}>
          <h2 style={{ color: '#ff4d4f', marginBottom: '16px' }}>Application Runtime Error</h2>
          <p style={{ marginBottom: '16px', color: '#ff7875' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <pre style={{
            background: '#07080e',
            padding: '16px',
            borderRadius: '8px',
            overflowX: 'auto',
            fontSize: '12px',
            color: '#a1a1aa'
          }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#00f0ff',
              color: '#07080e',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
