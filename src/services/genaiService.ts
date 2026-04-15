import { axiosInstance } from './axiosInstance';
import { processSSEStream } from './streamUtils';
export { ModelTag, ReasoningEffort } from './models';

export interface UsageData {
  prompt_tokens: number;
  completion_tokens: number;
  reasoning_tokens: number | null;
  estimated_cost: number | null;
}

export interface WebGroundingChunk {
  uri: string;
  title: string;
}

export interface GroundingSupport {
  segment_text: string;
  start_index: number;
  end_index: number;
  chunk_indices: number[];
}

export interface GroundingMetadata {
  web_search_queries: string[];
  grounding_chunks: WebGroundingChunk[];
  grounding_supports: GroundingSupport[];
}

type GeneratedResponseChunk = {
  content: string | null;
  reasoning_content: string | null;
  created: number;
  usage?: UsageData;
  grounding_metadata?: GroundingMetadata;
};

type AccumulatedGeneratedResponse = GeneratedResponseChunk;
export type GeneratedResponse = AccumulatedGeneratedResponse;

const processStreamResponse = async function* (
  stream: ReadableStream<Uint8Array>,
) {
  let accumulatedChunk: AccumulatedGeneratedResponse | null = null;

  for await (const chunk of processSSEStream<GeneratedResponseChunk>(stream)) {
    if (accumulatedChunk === null) {
      accumulatedChunk = structuredClone(chunk);
    } else {
      if (chunk.content) {
        accumulatedChunk.content =
          (accumulatedChunk.content ?? '') + chunk.content;
      }

      if (chunk.reasoning_content) {
        accumulatedChunk.reasoning_content =
          (accumulatedChunk.reasoning_content ?? '') + chunk.reasoning_content;
      }

      if (chunk.usage) {
        if (accumulatedChunk.usage) {
          throw new Error('Usage metadata was repeated in the stream.');
        }
        accumulatedChunk.usage = chunk.usage;
      }

      if (chunk.grounding_metadata) {
        if (accumulatedChunk.grounding_metadata) {
          throw new Error('Grounding metadata was repeated in the stream.');
        }
        accumulatedChunk.grounding_metadata = chunk.grounding_metadata;
      }
    }
    yield accumulatedChunk;
  }
};

export const fetchTextBasedPromptResponseStream = async function* (
  model: string,
  prompt: string,
  reasoningEffort: string,
  addPersonalInfo: boolean,
  addPersonalBias: boolean,
) {
  const response = await axiosInstance.post(
    '/text/stream',
    {
      model: model,
      prompt: prompt,
      reasoning_effort: reasoningEffort,
      add_personal_info: addPersonalInfo,
      add_personal_bias: addPersonalBias,
    },
    {
      responseType: 'stream',
    },
  );
  const stream = response.data as ReadableStream;
  yield* processStreamResponse(stream);
};

export const fetchFileBasedResponseStream = async function* (
  modelInstance: string,
  file: File,
  contextFiles: File[],
  prompt: string,
  reasoningEffort: string,
  addPersonalInfo: boolean,
  addPersonalBias: boolean,
) {
  const formData = new FormData();
  formData.append('model', modelInstance);
  formData.append('prompt', prompt);
  formData.append('reasoning_effort', reasoningEffort);
  formData.append('add_personal_info', String(addPersonalInfo));
  formData.append('add_personal_bias', String(addPersonalBias));
  formData.append('file', file);
  for (const contextFile of contextFiles) {
    formData.append('context_file', contextFile);
  }

  const response = await axiosInstance.post('/file/stream', formData, {
    responseType: 'stream',
  });
  const stream = response.data as ReadableStream;
  yield* processStreamResponse(stream);
};

export const transcribeAudio = async (
  audioBlob: Blob,
  provider: string,
): Promise<string> => {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('provider', provider);

  const response = await axiosInstance.post('/voice/transcribe', formData);
  return response.data.transcript;
};
