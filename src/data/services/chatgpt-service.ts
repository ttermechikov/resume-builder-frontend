export const getFeedbackFromChatGPT = async (resume: {}) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a resume reviewer providing feedback on the given resume.',
          },
          {
            role: 'user',
            content: `Please review the following resume and provide feedback:\n\n${JSON.stringify(
              resume,
              null,
              2,
            )}`,
          },
        ],
      }),
    }).then((res) => res.json());
    console.log('getFeedbackFromChatGPT', response);
    const feedback = response.data.choices[0].message.content;
    console.log('ChatGPT Feedback:', feedback);
    // Display the feedback to the user (e.g., in a modal or alert)
  } catch (error) {
    console.error('Error getting feedback from ChatGPT:', error);
  }
};
