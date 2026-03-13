import LZString from 'lz-string'

export function encodeContent(text: string): string {
  return LZString.compressToBase64(text)
}

export function decodeHash(hash: string): string | null {
  if (!hash || hash === '#') return null
  try {
    const decoded = LZString.decompressFromBase64(hash.slice(1))
    return decoded || null
  } catch {
    return null
  }
}
