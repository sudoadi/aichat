export async function onRequest(context) {
  // Ensure only handling POST ok
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { message } = await request.json();
    const result = await env.AI.run('@hf/mistral/mistral-7b-instruct-v0.2', {
      messages: [{ role: 'user', content: message }]
    });
    return Response.json({ reply: result.choices?.[0]?.message?.content || 'No reply.' });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
