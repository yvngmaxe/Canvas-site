import { registerUser } from './actions';

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>アカウント登録</h1>
      <form action={registerUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス:</label>
          <input type="email" id="email" name="email" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>パスワード:</label>
          <input type="password" id="password" name="password" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div>
          <label htmlFor="nickname" style={{ display: 'block', marginBottom: '5px' }}>ニックネーム:</label>
          <input type="text" id="nickname" name="nickname" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div>
          <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>年齢:</label>
          <input type="number" id="age" name="age" min="0" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div>
          <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>お住まいの市 (非公開):</label>
          <input type="text" id="city" name="city" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        {/* アバター選択は後で実装 */}
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>登録</button>
      </form>
    </div>
  );
}
