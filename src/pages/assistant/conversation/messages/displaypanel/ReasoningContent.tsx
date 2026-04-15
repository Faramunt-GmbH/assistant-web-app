import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React from 'react';

import MarkdownView from './MarkdownView';
import RawTextView from './RawTextView';

interface ReasoningContentProps {
  reasoningContent: string;
  isCollapsed: boolean;
  onToggle: () => void;
  isDisplayRaw: boolean;
}

export default function ReasoningContent({
  reasoningContent,
  isCollapsed,
  onToggle,
  isDisplayRaw,
}: ReasoningContentProps) {
  return (
    <div>
      <div
        className="flex cursor-pointer select-none items-center gap-1"
        onClick={onToggle}
      >
        <p>Thinking</p>
        {isCollapsed ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </div>
      {!isCollapsed && (
        <div className="border-l pl-2">
          {isDisplayRaw ? (
            <RawTextView content={reasoningContent} />
          ) : (
            <MarkdownView content={reasoningContent} />
          )}
        </div>
      )}
    </div>
  );
}
