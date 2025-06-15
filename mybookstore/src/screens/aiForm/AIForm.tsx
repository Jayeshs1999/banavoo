import React, { useState } from "react";
import axios from "axios";

const AIForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    projectTitle: "",
    description: "",
    quantity: "",
    budget: "",
    deadline: "",
    instructions: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const startRecording = () => {
    setError("");
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = async (event: any) => {
      const spokenText = event.results[event.results.length - 1][0].transcript;
      setTranscript(spokenText);
    };

    recognition.onerror = (event: any) => {
      setError("Speech recognition error: " + event.error);
      stopRecording();
    };

    recognition.start();
    setRecognition(recognition);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      if (transcript) {
        await handleExtract(transcript);
      }
    }
  };

  const handleExtract = async (spokenText: any) => {
    setLoading(true);
    try {
      const prompt = `
Extract the following details from this user input and return **only a valid JSON object**:
- fullName
- email
- contact
- projectTitle
- description
- quantity
- budget
- deadline
- instructions
- address

Input: "${spokenText}"

Return only the JSON. No explanation, no markdown.
`;

      const res = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const result = data.generations[0]?.text;
      console.log("OpenAI raw output:", result);

      const jsonMatch = result.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("No valid JSON found");

      const parsedData = JSON.parse(jsonMatch[0]);
      setFormData((prev) => ({ ...prev, ...parsedData }));
    } catch (err: any) {
      console.error("AI processing error:", err);
      setError("Couldn't process input. Check API key or input format.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        🎙️ AI Voice-Powered Form
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white`}
        >
          {loading
            ? "Processing..."
            : isRecording
            ? "⏹️ Stop Recording"
            : "🎤 Start Recording"}
        </button>
      </div>

      {transcript && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            <span className="font-semibold">Heard:</span> {transcript}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            {key === "description" ? (
              <textarea
                value={value}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
              />
            ) : (
              <input
                type={key === "email" ? "email" : "text"}
                value={value}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Enter ${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default AIForm;
