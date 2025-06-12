export async function onRequest(context) {
  const { request, env } = context;

  // Only accept POST
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Pull the user’s prompt out of the JSON body
  const { prompt } = await request.json();

  // Kick off a streaming completion against the Llama-Instruct model
  const stream = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt,
    stream: true
  });

  // Return it as an SSE (text/event-stream) response
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" }
  });
}
