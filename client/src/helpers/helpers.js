export function typeBuyColor(buy) {
  if (buy === 'tech') return 'blue-grey-text lighten-2';
  if (buy === 'clothes') return 'deep-orange-text lighten-2';
  if (buy === 'food') return 'orange-text lighten-1';
  if (buy === 'car') return 'blue-text lighten-2';
  if (buy === 'house') return 'light-green-text';
}
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
