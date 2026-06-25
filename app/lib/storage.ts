/**
 * LocalStorage utility for saving/loading document drafts
 * Supports Quotation, Timeline, Kontrak, and BAST documents
 */

export type DocumentType = "quotation" | "timeline" | "kontrak" | "bast";

interface StorageItem<T> {
  data: T;
  timestamp: number;
  version: string;
}

const STORAGE_PREFIX = "freelancedocs_";
const STORAGE_VERSION = "1.0";

/**
 * Save document draft to localStorage
 */
export function saveDraft<T>(type: DocumentType, data: T): boolean {
  try {
    const key = `${STORAGE_PREFIX}${type}`;
    const item: StorageItem<T> = {
      data,
      timestamp: Date.now(),
      version: STORAGE_VERSION,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error(`Failed to save ${type} draft:`, error);
    return false;
  }
}

/**
 * Load document draft from localStorage
 */
export function loadDraft<T>(type: DocumentType): T | null {
  try {
    const key = `${STORAGE_PREFIX}${type}`;
    const raw = localStorage.getItem(key);
    
    if (!raw) return null;
    
    const item: StorageItem<T> = JSON.parse(raw);
    
    // Version check - ignore old versions
    if (item.version !== STORAGE_VERSION) {
      deleteDraft(type);
      return null;
    }
    
    return item.data;
  } catch (error) {
    console.error(`Failed to load ${type} draft:`, error);
    return null;
  }
}

/**
 * Delete document draft from localStorage
 */
export function deleteDraft(type: DocumentType): boolean {
  try {
    const key = `${STORAGE_PREFIX}${type}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to delete ${type} draft:`, error);
    return false;
  }
}

/**
 * Get draft timestamp
 */
export function getDraftTimestamp(type: DocumentType): number | null {
  try {
    const key = `${STORAGE_PREFIX}${type}`;
    const raw = localStorage.getItem(key);
    
    if (!raw) return null;
    
    const item: StorageItem<any> = JSON.parse(raw);
    return item.timestamp;
  } catch (error) {
    return null;
  }
}
