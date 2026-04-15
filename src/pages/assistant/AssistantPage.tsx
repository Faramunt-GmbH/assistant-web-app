import Conversation from './conversation/Conversation';
import AssistantInput from './input/AssistantInput';

export default function AssistantPage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="h-2/3 p-2">
        <Conversation />
      </div>
      <div className="h-1/3 p-2">
        <AssistantInput />
      </div>
    </div>
  );
}
