import { Result, Numbr, Percent, Nothing } from './calculator'

let resultsContainer: HTMLElement | null = null

function getContainer(): HTMLElement {
  if (!resultsContainer) {
    resultsContainer = document.getElementById('results')!
  }
  return resultsContainer
}

export function renderResults(results: Result[]): void {
  const container = getContainer()
  container.innerHTML = ''

  for (const result of results) {
    const el = document.createElement('div')
    el.className = 'result-line'
    const text = formatResult(result)
    el.textContent = text
    if (text) el.classList.add('has-value')
    container.appendChild(el)
  }
}

function formatResult(result: Result): string {
  if (result instanceof Nothing) return ''

  if (result instanceof Numbr) {
    const raw = parseFloat(result.value.toFixed(10))
    if (!isFinite(raw)) return ''
    const formatted = raw.toLocaleString(undefined, {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    })
    return result.currency ? `${formatted} ${result.currency}` : formatted
  }

  if (result instanceof Percent) {
    const raw = parseFloat(result.value.toFixed(10))
    if (!isFinite(raw)) return ''
    return raw.toLocaleString(undefined, { maximumFractionDigits: 6 }) + '%'
  }

  // Header — no result to display on the right
  return ''
}
