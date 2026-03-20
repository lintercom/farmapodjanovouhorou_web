const MARKERS = ["Ă", "Ä", "Ĺ", "â€", "Â", "�"];

const REPLACEMENTS: Array<[string, string]> = [
  ["Ăˇ", "á"],
  ["Ă©", "é"],
  ["Ă­", "í"],
  ["Ăł", "ó"],
  ["Ăş", "ú"],
  ["Ă˝", "ý"],
  ["Ä›", "ě"],
  ["ÄŤ", "č"],
  ["ÄŹ", "ď"],
  ["Ĺ", "ň"],
  ["Ĺ™", "ř"],
  ["Ĺˇ", "š"],
  ["ĹĄ", "ť"],
  ["Ĺľ", "ž"],
  ["ĹŻ", "ů"],
  ["Ă", "Á"],
  ["Ă‰", "É"],
  ["ĂŤ", "Í"],
  ["Ă“", "Ó"],
  ["Ăš", "Ú"],
  ["Ăť", "Ý"],
  ["Äš", "Ě"],
  ["ÄŚ", "Č"],
  ["ÄŽ", "Ď"],
  ["Ĺ‡", "Ň"],
  ["Ĺ", "Ř"],
  ["Ĺ ", "Š"],
  ["Ĺ¤", "Ť"],
  ["Ĺ˝", "Ž"],
  ["Ĺ®", "Ů"],
  ["â€˘", "•"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€™", "’"],
  ["â€ž", "„"],
  ["â€ś", "“"],
  ["â€ť", "”"],
  ["â€¦", "…"],
  ["â†’", "→"],
  ["Â©", "©"],
  ["Â ", " "],
  ["Â ", " "],
];

function fixMojibakeText(value: string): string {
  if (!MARKERS.some((m) => value.includes(m))) return value;
  let result = value;
  for (let i = 0; i < 2; i += 1) {
    let changed = false;
    for (const [from, to] of REPLACEMENTS) {
      if (result.includes(from)) {
        result = result.split(from).join(to);
        changed = true;
      }
    }
    if (!changed) break;
  }
  return result;
}

function shouldSkipNode(node: Node): boolean {
  const parent = node.parentElement;
  if (!parent) return false;
  const tag = parent.tagName;
  return tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT";
}

function normalizeTextNodes(root: Node): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    if (!shouldSkipNode(current)) {
      const textNode = current as Text;
      const fixed = fixMojibakeText(textNode.nodeValue || "");
      if (fixed !== textNode.nodeValue) {
        textNode.nodeValue = fixed;
      }
    }
    current = walker.nextNode();
  }
}

export function startVisibleTextNormalization(): () => void {
  normalizeTextNodes(document.body);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        const node = mutation.target;
        if (node.nodeType === Node.TEXT_NODE && !shouldSkipNode(node)) {
          const textNode = node as Text;
          const fixed = fixMojibakeText(textNode.nodeValue || "");
          if (fixed !== textNode.nodeValue) {
            textNode.nodeValue = fixed;
          }
        }
        continue;
      }

      mutation.addedNodes.forEach((added) => {
        if (added.nodeType === Node.TEXT_NODE) {
          if (!shouldSkipNode(added)) {
            const textNode = added as Text;
            const fixed = fixMojibakeText(textNode.nodeValue || "");
            if (fixed !== textNode.nodeValue) {
              textNode.nodeValue = fixed;
            }
          }
          return;
        }
        if (added.nodeType === Node.ELEMENT_NODE) {
          normalizeTextNodes(added);
        }
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => observer.disconnect();
}

