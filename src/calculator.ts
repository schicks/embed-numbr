import { lex } from './numbr/parser/lex'
import { parse } from './numbr/parser/parser'
import { updateVars, type Varname } from './numbr/parser/variables'
import { Assignment } from './numbr/nodes'
import { Header, Nothing, Numbr, Percent, Result } from './numbr/results'

export type { Result }
export { Numbr, Percent, Header, Nothing }

// Variable names we've written to globalThis so we can clean them up
const ownedVars = new Set<string>()

export function calculate(text: string): Result[] {
  // Clear variables from the previous run to avoid stale state
  for (const v of ownedVars) {
    delete (globalThis as Record<string, unknown>)[v]
  }
  ownedVars.clear()

  const lines = text.split('\n')
  const answers: Result[] = []
  const vars: Varname[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Detect header lines (# Heading) — the engine uses these to scope sum/total
    if (/^\s*#/.test(line)) {
      const title = line.trim().slice(1).trim()
      answers.push(new Header(title))
      continue
    }

    try {
      const tokens = lex(line, vars)
      const [node] = parse(tokens)
      const result = node.evaluate({ rates: {}, answers, line: i })

      if (node instanceof Assignment) {
        ownedVars.add(node.variable.value.toLowerCase())
      }

      updateVars(vars, node)
      answers.push(result)
    } catch {
      answers.push(new Nothing())
    }
  }

  return answers
}
