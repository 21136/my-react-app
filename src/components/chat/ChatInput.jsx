import { Button, Input } from "antd";
import { SendOutlined,StopOutlined } from "@ant-design/icons";

const {TextArea} = Input;

/**
 * @param {{
*   input: string;
*   onInputChange: (value: string) => void;
*   onSubmit: (e: import('react').SubmitEvent) => void;
*   sendStatus: 'idle' | 'sending' | 'error';
*   placeholder?: string;
* }} props
*/
export function ChatInput({
    input,
    onInputChange,
    onSubmit,
    sendStatus,
    onStop,
    placeholder = "输入消息，Ctrl+Enter 发送",
  }) {
    const isSending = sendStatus === "sending";
  
    /** @param {import('react').ChangeEvent<HTMLTextAreaElement>} e */
    function handleChange(e) {
      onInputChange(e.target.value);
    }
  
    /** @param {import('react').KeyboardEvent<HTMLTextAreaElement>} e */
    function handleKeyDown(e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (!isSending && input.trim()) {
          const form = e.currentTarget.form;
          form?.requestSubmit();
        }
      }
    }
  
    return (
      <form className="chat-input" onSubmit={onSubmit}>
        <TextArea
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={isSending}
        />{isSending ? (
            <Button 
            danger
            type="default"
            icon = {<StopOutlined/>}
            onClick = {onStop}
            >
                停止
            </Button>
        ):(
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          loading={isSending}
          disabled={!input.trim() || isSending}
        >
          发送
        </Button>)}
      </form>
    );
 }