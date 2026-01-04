import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // 導入官方內建的精美主題

const MyEditor = ({ value, onChange }) => {
  const editorRef = useRef(null); // 指向 DOM 元素
  const quillRef = useRef(null);  // 儲存 Quill 實例

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // 1.初始化 Quill
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow', // 使用有工具欄的 snow 主題
        placeholder: '請輸入內容...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'] // 清除格式按鈕
          ]
        }
      })

      // 3. 監聽輸入，將結果推出去給 Form
      // 重點：內容變動時，呼叫 antd 傳進來的 onChange
      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        // 如果內容是空字串或只有空標籤，傳回空值以便觸發 rules 驗證
        const cleanHtml = html === '<p><br></p>' ? '' : html;
        onChange?.(cleanHtml)
      })
    }
    // 4. 只有在 value 有變化時，才更新 Quill 內容
    // 例如回顯數據時，避免無限循環更新
    if (value && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div style={{ padding: '20px' }}>
      <div ref={editorRef} style={{ height: '300px' }} />
    </div>
  );
};

export default MyEditor;