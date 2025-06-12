export async function onRequest(context) {
  const { request, env } = context;

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse the user message from the request body
    const { message } = await request.json();

    // Call the Cloudflare AI binding running the Phi-2 model
    const result = await env.AI.run('@cf/microsoft/phi-2', {
      messages: [
        { role: 'user', content: message }
      ],
      max_tokens: 400
    });

    // Extract the assistant's reply (or fallback if missing)
    const reply = result.choices?.[0]?.message?.content ?? 'No reply.';

    // Return JSON with the reply
    return new Response(
      JSON.stringify({ reply }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    // On error, return a JSON error response
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
