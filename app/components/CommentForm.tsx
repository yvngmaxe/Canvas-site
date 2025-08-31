'use client';

import { useState } from 'react';
import { submitComment } from '../actions/comments'; // 後で作成するアクションをインポート
import { useRouter } from 'next/navigation';

export default function CommentForm() {
  const [comment, setComment] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const formData = new FormData();
    formData.append('content', comment);

    const result = await submitComment(formData);

    if (result?.error) {
      alert(`コメントの投稿に失敗しました: ${result.error}`);
    } else {
      setComment('');
      router.refresh(); // コメントリストを更新するためにページをリフレッシュ
    }
  };

  return (
    <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>コメントを投稿する</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力してください..."
          rows={4}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
          required
        />
        <button
          type="submit"
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-end' }}
        >
          コメントを送信
        </button>
      </form>
    </div>
  );
}
