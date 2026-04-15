import classnames from 'classnames';
import React, { KeyboardEvent, useCallback } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onSave?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const TextArea = (
  {
    value,
    onChange,
    onSubmit,
    onSave,
    onKeyDown,
    disabled,
    autoFocus,
    className,
  }: TextAreaProps,
  ref: React.Ref<HTMLTextAreaElement>,
) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === 'Enter' && onSubmit) {
          event.preventDefault();
          onSubmit();
        } else if (event.key === 's' && onSave) {
          event.preventDefault();
          onSave();
        }
      }
      onKeyDown?.(event);
    },
    [onSubmit, onSave, onKeyDown],
  );

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={event => onChange(event.target.value)}
      className={classnames(
        'h-full w-full resize-none p-3 focus:outline-none',
        className,
      )}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      onKeyDown={handleKeyDown}
      disabled={disabled}
      autoFocus={autoFocus}
    />
  );
};

export default React.forwardRef(TextArea);
