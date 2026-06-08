// Filtro básico de lenguaje inapropiado (conservado del sitio original).
const BAD_WORDS = [
  'puto', 'puta', 'pendejo', 'pendeja', 'mierda', 'verga', 'cabron', 'cabrona', 'mamaguevo',
  'chingar', 'chingada', 'joder', 'estupido', 'estupida', 'idiota', 'imbecil', 'zorra', 'culero',
  'culo', 'pinche', 'bastardo', 'maldito', 'perra', 'verguear', 'coño',
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'bastard', 'cunt',
  'motherfucker', 'cock', 'wanker', 'twat',
]

export function containsBadWords(text) {
  if (!text) return false
  return text
    .toLowerCase()
    .split(/\s+/)
    .some((w) => BAD_WORDS.includes(w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')))
}
