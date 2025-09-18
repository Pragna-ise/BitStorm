"use client";

import { useState } from "react";
 
export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setAnswer('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "6rem",
        minHeight: "100vh"
      }}>
      <h1>Flowtutorr</h1>
      <p>Enter your question below and get started!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What do you want to learn?"
          style={{ width: '300px', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }} disabled={loading}>
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      {answer && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px' }}>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}