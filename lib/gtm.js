export function gtmEvent(event, params = {}) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...params,
    });
  }
}
