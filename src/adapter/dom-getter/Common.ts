export const Common = {
  nullCheck<T extends HTMLElement | HTMLCollection>(dom: T | null): T {
    if (dom !== null) {
      return dom
    } else {
      throw DOMException
    }
  },
}
