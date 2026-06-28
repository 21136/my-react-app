/**
 * @param {unknown} error
 * @returns {boolean}
 */
export function isAbortError(error){
    return(
        error instanceof DOMException && error.name === "AbortError"
    ) || (
        error instanceof Error && error.name === "AbortError"
    )
}