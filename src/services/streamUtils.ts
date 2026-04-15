export const processSSEStream = async function* <T>(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<T, void, unknown> {
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += value;
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const match = line.match(/^data: (.*)$/);
        if (!match) continue;

        const message = JSON.parse(match[1]) as T;
        yield message;
      }
    }
  } finally {
    reader.releaseLock();
  }
};
