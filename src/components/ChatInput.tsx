import { useState, useRef, useCallback } from 'react';
import { Paperclip, Image as ImageIcon, Send, X } from 'lucide-react';

export type Attachment = {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
};

interface ChatInputProps {
  onSend: (text: string, attachments: Attachment[]) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newItems: Attachment[] = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      const isImage = file.type.startsWith('image/');
      return {
        id: `${file.name}-${url}-${Date.now()}`,
        type: isImage ? 'image' : 'file',
        url,
        name: file.name,
      };
    });
    setAttachments((prev) => [...prev, ...newItems]);
  }, []);

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const toRemove = prev.find((a) => a.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.url);
      return prev.filter((a) => a.id !== id);
    });
  };

  const canSend = text.trim().length > 0 || attachments.length > 0;

  const send = () => {
    if (!canSend) return;
    onSend(text.trim(), attachments);
    // cleanup
    attachments.forEach((a) => URL.revokeObjectURL(a.url));
    setText('');
    setAttachments([]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/90 border-t p-4 rounded-b-xl">
      {/* Previews */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3 animate-fade-in">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="group relative rounded-lg border border-gray-200 bg-white p-2 shadow-sm hover:shadow transition hover-scale"
            >
              {a.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.url}
                  alt={a.name}
                  className="h-20 w-20 object-cover rounded"
                  loading="lazy"
                />
              ) : (
                <div className="h-20 w-48 flex items-center gap-2 px-3 text-sm text-gray-700">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="truncate" title={a.name}>{a.name}</span>
                </div>
              )}
              <button
                aria-label="Remove attachment"
                onClick={() => removeAttachment(a.id)}
                className="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white shadow hover:scale-105 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 bg-white border border-gray-200 rounded-xl p-2 shadow-sm focus-within:shadow-md transition animate-scale-in">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
          aria-label="Add attachments"
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type a message, press Enter to send…"
            className="w-full resize-none bg-transparent outline-none p-2 text-gray-800 placeholder:text-gray-400"
          />
        </div>

        <button
          type="button"
          disabled={!canSend}
          onClick={send}
          className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-chemistry-red to-primary shadow ${canSend ? 'hover:opacity-95 hover:shadow-lg' : ''}`}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
