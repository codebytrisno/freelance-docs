/**
 * Copy text to clipboard utility
 * Works in modern browsers with Clipboard API
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand("copy");
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Extract plain text from HTML element
 */
export function extractTextFromElement(element: HTMLElement): string {
  return element.innerText || element.textContent || "";
}

/**
 * Format document as plain text for clipboard
 */
export function formatDocumentText(element: HTMLElement): string {
  // Get text content
  let text = extractTextFromElement(element);
  
  // Clean up extra whitespace
  text = text.replace(/\n\s*\n\s*\n/g, "\n\n"); // Max 2 newlines
  text = text.replace(/[ \t]+/g, " "); // Normalize spaces
  text = text.trim();
  
  return text;
}
