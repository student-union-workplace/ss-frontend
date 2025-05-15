import { useEffect, useState, ChangeEvent, useCallback } from 'react';

interface FileMeta {
  id: string;
  name: string;
  size: number;
  url: string;
}

const API_BASE = 'http://localhost:5000/api/files';

const token = localStorage.getItem('token')

const FileManager = () => {
  const eventId = "29d5922f-62d8-4c4f-94f5-5a59962e7827"
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null | unknown>(null);

  // Получить список файлов
  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/events/${eventId}/files`, {
        headers: {'Authorization': 'Bearer ' + token}
      });
      if (!res.ok) throw new Error('Не удалось загрузить файлы');
      const data: FileMeta[] = await res.json();
      setFiles(data);
    } catch (e: unknown) {
      setError(e);
    }
  }, [eventId]);

  useEffect(() => {
    fetchFiles();
  }, [eventId, fetchFiles]);

  // загрузить файл
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      // сначала отправляешь инфу о файле в бд
      const resp = await fetch(
        `${API_BASE}/events/${eventId}/files/upload-url`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
          }),
        }
      );
      if (!resp.ok) throw new Error('Не удалось получить URL для загрузки');
      // тебе возвращается ссылка, куда уже нужно в body передать файл
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fileId, uploadUrl } = await resp.json();

      // передаешь тут файл
      const putResp = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      });
      if (!putResp.ok) throw new Error('Ошибка при загрузке файла на S3');

      // он должен появиться в бакете и можно обновлять список файлов меро
      await fetchFiles();
    } catch (e: unknown) {
      setError(e);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // удалить файл
  const deleteFile = async (fileId: string) => {
    if (!window.confirm('Удалить файл?')) return;
    try {
      const res = await fetch(`${API_BASE}/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!res.ok) throw new Error('Ошибка при удалении');
      setFiles((file) => file.filter((x) => x.id !== fileId));
    } catch (e: unknown) {
      setError(e);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Управление файлами мероприятия</h2>

      {/* Ошибки */}
      {error && (
        <div style={{ color: 'red', marginBottom: 20 }}>
          Ошибка: {error.toString()}
        </div>
      )}

      {/* Загрузка */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="file"
          onChange={onFileChange}
          disabled={uploading}
        />
        {uploading && <span> Загрузка…</span>}
      </div>

      {/* Список файлов */}
      <table width="100%" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
        <thead>
        <tr style={{ borderBottom: '1px solid #ccc' }}>
          <th>Имя</th>
          <th>Размер</th>
          <th>Скачать</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        {files.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              Файлов нет
            </td>
          </tr>
        ) : (
          files.map((f) => (
            <tr key={f.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{f.name}</td>
              <td>{(f.size / 1024 / 1024).toFixed(2)} МБ</td>
              <td>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Скачать
                </a>
              </td>
              <td>
                <button onClick={() => deleteFile(f.id)}>❌</button>
              </td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};

export default FileManager;
