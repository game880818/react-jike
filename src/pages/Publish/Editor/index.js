import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // 導入官方內建的精美主題

const MyEditor = () => {
  const editorRef = useRef(null); // 指向 DOM 元素
  const quillRef = useRef(null);  // 儲存 Quill 實例

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // 初始化 Quill
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
      });

      // 當內容改變時的監聽器
      quillRef.current.on('text-change', () => {
        console.log('當前 HTML:', quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div ref={editorRef} style={{ height: '300px' }} />
    </div>
  );
};

export default MyEditor;