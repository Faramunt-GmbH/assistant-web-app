import { ModelTag, ReasoningEffort } from '../../../services/models';
import { ModelConfig, useAppStore } from '../../../store';

const getDefaultReasoningEffort = (model: ModelTag): ReasoningEffort => {
  if ([ModelTag.GPT_OSS, ModelTag.GEMINI_PRO].includes(model))
    return ReasoningEffort.LOW;
  return ReasoningEffort.NONE;
};

const MODEL_LABELS: Record<ModelTag, string> = {
  [ModelTag.GEMINI_FLASH]: 'Gemini Flash',
  [ModelTag.GEMINI_PRO]: 'Gemini Pro',
  [ModelTag.GPT_OSS]: 'GPT OSS',
};

export default function ModelConfigSelector({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const { modelConfig, setModelConfig, setDefaultModelConfig } = useAppStore();

  const setConfig = (config: ModelConfig) => {
    setModelConfig(config);
    setDefaultModelConfig(config);
  };

  const handleModelChange = (model: ModelTag) => {
    setConfig({
      modelInstance: model,
      reasoningEffort: getDefaultReasoningEffort(model),
    });
  };

  const handleReasoningEffortChange = (effort: ReasoningEffort) => {
    setConfig({
      ...modelConfig,
      reasoningEffort: effort,
    });
  };

  return (
    <div className={'flex gap-2'}>
      <select
        tabIndex={1}
        value={modelConfig.modelInstance}
        onChange={e => handleModelChange(e.target.value as ModelTag)}
        disabled={disabled}
        className="px-3 py-1 disabled:opacity-50"
      >
        <option value={ModelTag.GPT_OSS}>
          {MODEL_LABELS[ModelTag.GPT_OSS]}
        </option>
        <option value={ModelTag.GEMINI_FLASH}>
          {MODEL_LABELS[ModelTag.GEMINI_FLASH]}
        </option>
        <option value={ModelTag.GEMINI_PRO}>
          {MODEL_LABELS[ModelTag.GEMINI_PRO]}
        </option>
      </select>
      <select
        tabIndex={1}
        value={modelConfig.reasoningEffort}
        onChange={e =>
          handleReasoningEffortChange(e.target.value as ReasoningEffort)
        }
        disabled={disabled}
        className="px-3 py-1 disabled:opacity-50"
      >
        <option value={ReasoningEffort.NONE}>None</option>
        <option value={ReasoningEffort.LOW}>Low</option>
        <option value={ReasoningEffort.HIGH}>High</option>
      </select>
    </div>
  );
}
