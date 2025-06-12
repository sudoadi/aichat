export async function onRequest(context) {
  // Ensure only handling POST
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { message } = await request.json();
    const result = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [{ role: 'user', content: message }]
    });
    return Response.json({ reply: result.choices?.[0]?.message?.content || 'No reply.' });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}