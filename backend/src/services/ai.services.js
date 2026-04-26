import Groq from 'groq-sdk';
import { ENV } from '../lib/env.js';

const groq = new Groq({
  apiKey: ENV.GROQ_API_KEY,
});

export async function generateHint(problemDesc) {
  const prompt = `You are an expert coding interviewer. 
The candidate is working on the following problem:
---
${problemDesc}
---
Please provide a short, conceptual hint to help them get started or overcome a blocker. DO NOT provide any code. Keep it under 3 sentences.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: "You are a helpful and concise coding assistant." },
      { role: 'user', content: prompt }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 300,
  });

  return chatCompletion.choices[0]?.message?.content || "";
}

export async function generateCodeReview(problemDesc, userCode, language) {
  const prompt = `You are an expert coding interviewer. 
The candidate has submitted the following ${language} code for this problem:
---
${problemDesc}
---
Candidate's Code:
\`\`\`${language}
${userCode}
\`\`\`
Please review their code. Focus on:
1. Identifying any bugs or logical errors.
2. Time and space complexity analysis.
3. Suggestions for improvement or best practices.
Provide a constructive and concise markdown response.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: "You are an expert software engineer performing a code review." },
      { role: 'user', content: prompt }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
    max_tokens: 1024,
  });

  return chatCompletion.choices[0]?.message?.content || "";
}
export async function generateDailyRoast(userName) {
  const prompt = `You are a sarcastic, witty coding assistant. 
Write a "Joke of the Day" that mocks ${userName}'s coding skills or general developer habits. 
The joke should be short, funny, and slightly roasting but not offensive. 
Make sure it sounds like it's coming from a superior AI. Keep it under 2 sentences.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: "You are a witty, sarcastic AI roasting a developer." },
      { role: 'user', content: prompt }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.9,
    max_tokens: 150,
  });

  return chatCompletion.choices[0]?.message?.content || "I'd roast you, but my cooling system isn't powerful enough to handle your code's heat.";
}
