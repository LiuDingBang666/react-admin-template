/**
 * @name: 名称
 * @description: TODO base64工具类
 * @author: mayn
 * @date: 2025/10/11 10:22
 */

export function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return btoa(String.fromCharCode(...bytes));
}

export function decodeBase64(str: string): string {
  const binary = atob(str);
  const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
  return new TextDecoder().decode(bytes);
}
