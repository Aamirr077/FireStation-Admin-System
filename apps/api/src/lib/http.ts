export async function readJson<T>(res: Response): Promise<T> {
    const txt = await res.text();
    try {
      return JSON.parse(txt) as T;
    } catch {
      throw new Error(`Invalid JSON response: ${txt.slice(0, 300)}`);
    }
  }
  