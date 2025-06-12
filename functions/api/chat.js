export async function onRequest(context) {
  // Ensure only handling POST ok
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
   const result = await env.AI.run('@cf/microsoft/phi-2', {
  messages: [{ role: 'user', content: message }],
  max_tokens: 400
});

    return Response.json({ reply: result.choices?.[0]?.message?.content || 'No reply.' });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
