// Direct calls to the Storage API methods can throw errors, particularly when the user's browser is in a mode that doesn't support Storage (e.g., incognito mode in some browsers) or if the storage quota has been exceeded.
// handling errors separately if needed - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability

type StorageType = 'local' | 'session'

/**
 * Retrieve an item from Storage.
 * @param {string} key - The key of the item to retrieve.
 * @param {StorageType} [type='local'] - The type of Storage to use ('local' or 'session').
 * @return {string|null|false} the retrieved item, or false if retrieval fails.
 */
export const getStorageItem = (
    key: string,
    type: StorageType = 'local'
): string | null | false => {
    try {
        const storage = type === 'local' ? localStorage : sessionStorage
        const item = storage.getItem(key)
        return item
    } catch (err: unknown) {
        // Handle the exception if needed
        return false
    }
}

/**
 * Store an item in Storage.
 * @param {string} key - The key of the item to store.
 * @param {string} value - The value of the item to store. Use JSON.stringify(value) if value is not a string.
 * @param {StorageType} [type='local'] - The type of Storage to use ('local' or 'session').
 * @return {boolean} true if the operation was successful, or false if it failed.
 */
export const setStorageItem = (
    key: string,
    value: string,
    type: StorageType = 'local'
): boolean => {
    try {
        const storage = type === 'local' ? localStorage : sessionStorage
        storage.setItem(key, value)
        return true
    } catch (err: unknown) {
        // Handle the exception if needed
        return false
    }
}

/**
 * Remove an item from Storage.
 * @param {string} key - The key of the item to remove.
 * @param {StorageType} [type='local'] - The type of Storage to use ('local' or 'session').
 * @return {boolean} true if the operation was successful, or false if it failed.
 */
export const removeStorageItem = (
    key: string,
    type: StorageType = 'local'
): boolean => {
    try {
        const storage = type === 'local' ? localStorage : sessionStorage
        storage.removeItem(key)
        return true
    } catch (err: unknown) {
        // Handle the exception if needed
        return false
    }
}
