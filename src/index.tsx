import { hydrate, prerender as ssr } from 'preact-iso'
import App from './components/App'

import '../global.css'

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'))
}

export async function prerender() {
  return await ssr(<App />)
}
