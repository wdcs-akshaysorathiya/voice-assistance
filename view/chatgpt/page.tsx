"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'babel-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import responsiveVoice from 'responsivevoice';

interface Message {
  content: string;
  role: string;
}

const Chatgpt = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [response, setResponse] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [context, setContext] = useState<{ question: string; response: string } | null>(null);

  useEffect(() => {
    if (!listening && transcript) {
      handleSubmit(transcript);
    }
  }, [listening, transcript]);

  const handleSubmit = async (question: string) => {
    const updatedMessages = [...messages];
    updatedMessages.push({
      content: question,
      role: "user"
    });

    resetTranscript();

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: updatedMessages,
    };

    if (context) {
      // Include the context of the previous question and response in the request
      requestBody.messages.unshift({
        content: context.response,
        role: "system",
      });
    }

    const result = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, { headers: { Authorization: process.env.NEXT_PUBLIC_SECRET_KEY } });

    if (result.data.choices[0].message) {
      const botResponse = result.data.choices[0].message.content;
      updatedMessages.push({
        content: botResponse,
        role: "system",
      });

      setResponse(botResponse);

      // Update the context with the current question and response
      setContext({ question, response: botResponse });

      speakText(botResponse);
    } else {
      console.error(result.data.choices[0].error.message)
    }

    setMessages(updatedMessages);
  };

  function speakText(value: string) {
    responsiveVoice.speak(value);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Container className='pt-5'>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ask Question</Form.Label>
            <Form.Control type="text" placeholder="Speak your question here" defaultValue={transcript} />
          </Form.Group>
          <p className='mt-2'>ChatGPT answer: {response}</p>
        </Form>
        <div className='mt-2'>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button className='m-1' onClick={() => SpeechRecognition.startListening()}>Start</button>
          <button className='m-1' onClick={() => SpeechRecognition.stopListening()}>Stop</button>
          <button className='m-1' onClick={() => resetTranscript()}>Reset</button>
        </div>
      </div>
    </Container>
  )
}

export default Chatgpt;