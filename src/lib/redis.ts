import Redis from 'ioredis';

const redis = new Redis({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  username: 'default', // needs Redis >= 6
  password: '522123',
  db: 0, // Defaults to 0
});

const initialData = {
  '1702459181837':
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  '1702459182837':
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  '1702459188837':
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes() {
  const data = await redis.hgetall('notes');
  if (Object.keys(data).length == 0) {
    await redis.hset('notes', initialData);
  }
  return await redis.hgetall('notes');
}

export async function addNote(data: any) {
  const uuid = Date.now().toString();
  await redis.hset('notes', [uuid], data);
  return uuid;
}

export async function updateNote(uuid: string, data: any) {
  await redis.hset('notes', [uuid], data);
}

export async function getNote(uuid: string) {
  const json = await redis.hget('notes', uuid);
  return json ? JSON.parse(json) : json;
}

export async function delNote(uuid: string) {
  return redis.hdel('notes', uuid);
}

export default redis;
