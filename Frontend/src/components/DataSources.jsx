import React, { useEffect, useState, useRef } from 'react';

const DataSources = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    fetch('http://localhost:8000/data/sources', { signal: abortControllerRef.current.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setSources(data.sources || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-y-auto max-h-[80vh] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Data Sources</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">Close</button>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((s) => (
            <div key={s.id || s.title} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{s.summary && s.summary.length > 300 ? s.summary.substring(0,300) + '...' : s.summary}</p>
              {s.use_cases && <p className="text-xs text-green-700 font-medium">Use cases: {s.use_cases}</p>}
            </div>
          ))}
        </div>

        {sources.length === 0 && !loading && !error && (
          <p className="text-gray-600 mt-4">No data sources found.</p>
        )}
      </div>
    </div>
  );
};

export default DataSources;
