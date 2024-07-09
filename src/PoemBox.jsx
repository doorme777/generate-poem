import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function PoemBox() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  async function fetchPoem() {
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAxu1FPppClUMucUvO4jZpqKWRiqnUbgSM"
      ); // replace with your key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt =
        "write a poem about fish using an anapestic tetrameter in the style of Dr.Seuss";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    // Fetch a poem on initial render
    fetchPoem();

    // Fetch a new poem every 30 seconds
    const poemIntervalId = setInterval(fetchPoem, 30000);
    return () => {
      clearInterval(poemIntervalId); // Cleanup poem interval on component unmount
    };
  }, []);

  return <div>{error ? <p>{error}</p> : <p>{response}</p>}</div>;
}
