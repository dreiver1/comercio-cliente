export default function dateFormatedBR(date) {
  if (!date) {
    return ''
  }
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return new Date(date).toLocaleDateString('pt-BR', options)
}
