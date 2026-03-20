const MOJIBAKE_MARKERS = ['Ã', 'Ä', 'Å', 'Ă', 'Ĺ', 'â€', 'â€“', 'Â', '�'];

const CZECH_MOJIBAKE_REPLACEMENTS: Array<[string, string]> = [
  ['Ăˇ', 'á'],
  ['Ă©', 'é'],
  ['Ă­', 'í'],
  ['Ăł', 'ó'],
  ['Ăş', 'ú'],
  ['Ă˝', 'ý'],
  ['Ä›', 'ě'],
  ['ÄŤ', 'č'],
  ['ÄŹ', 'ď'],
  ['Ĺ', 'ň'],
  ['Ĺ™', 'ř'],
  ['Ĺˇ', 'š'],
  ['ĹĄ', 'ť'],
  ['Ĺľ', 'ž'],
  ['ĹŻ', 'ů'],
  ['Ă', 'Á'],
  ['Ă‰', 'É'],
  ['ĂŤ', 'Í'],
  ['Ă“', 'Ó'],
  ['Ăš', 'Ú'],
  ['Ăť', 'Ý'],
  ['Äš', 'Ě'],
  ['ÄŚ', 'Č'],
  ['ÄŽ', 'Ď'],
  ['Ĺ‡', 'Ň'],
  ['Ĺ', 'Ř'],
  ['Ĺ ', 'Š'],
  ['Ĺ¤', 'Ť'],
  ['Ĺ˝', 'Ž'],
  ['Ĺ®', 'Ů'],
  ['â€“', '–'],
  ['â€”', '—'],
  ['â€ž', '„'],
  ['â€ś', '“'],
  ['â€ť', '”'],
  ['â€™', '’'],
  ['â€¦', '…'],
  ['Â ', ' '],
];

function looksMojibake(value: string): boolean {
  return MOJIBAKE_MARKERS.some((marker) => value.includes(marker));
}

function decodeLatin1AsUtf8(value: string): string {
  const bytes = new Uint8Array(Array.from(value, (char) => char.charCodeAt(0) & 0xff));
  return new TextDecoder('utf-8').decode(bytes);
}

function normalizeCzechMojibake(value: string): string {
  let result = value;

  // Some texts are double-mangled, so we normalize in short passes.
  for (let i = 0; i < 2; i += 1) {
    let changed = false;
    for (const [from, to] of CZECH_MOJIBAKE_REPLACEMENTS) {
      if (result.includes(from)) {
        result = result.split(from).join(to);
        changed = true;
      }
    }
    if (!changed) break;
  }

  return result;
}

export function fixMojibakeString(value: string): string {
  let result = value;

  if (looksMojibake(result)) {
    const decoded = decodeLatin1AsUtf8(result);
    if (decoded && !decoded.includes('\uFFFD')) {
      result = decoded;
    }
  }

  return normalizeCzechMojibake(result);
}

export function fixMojibakeDeep<T>(input: T): T {
  if (typeof input === 'string') {
    return fixMojibakeString(input) as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => fixMojibakeDeep(item)) as T;
  }

  if (input && typeof input === 'object') {
    const entries = Object.entries(input as Record<string, unknown>).map(([key, value]) => [
      key,
      fixMojibakeDeep(value),
    ]);
    return Object.fromEntries(entries) as T;
  }

  return input;
}
