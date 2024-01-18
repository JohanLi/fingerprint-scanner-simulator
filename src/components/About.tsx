const h2Class = 'text-xl font-medium text-green-500 mt-12 first:mt-0'
const pClass = 'mt-4'
const aClass = 'font-medium text-cyan-400 hover:text-cyan-300'

export default function About() {
  return (
    <>
      <h2 className={h2Class}>What’s this?</h2>
      <p className={pClass}>
        <span className="italic">The Diamond Casino Heist</span> in GTA Online
        introduces two hacking minigames, one of them being the fingerprint
        scanner. To maximize your take, you have to be fast. Use this simulator
        to practice – outside the heist, without the loading screens, on your
        phone!
      </p>
      <p className={pClass}>
        There are 4 fingerprints in total. For each fingerprint, tap/click on
        the 4 elements (parts, segments) that make up the fingerprint.
      </p>
      <h2 className={h2Class}>Difference between Normal and Hard?</h2>
      <p className={pClass}>
        Hard leaves you to select the correct 4 elements without looking at each
        fingerprint. Once you’ve practiced enough, you’ll manage. This is how
        you hack the fastest in the actual heist!
      </p>
      <p className={pClass}>
        These two modes do not exist in the actual heist.
      </p>
      <h2 className={h2Class}>Need additional tools?</h2>
      <p className={pClass}>
        I’ve not been playing GTA Online since 2020. If you have questions or
        suggestions on other tools to make, reach out to me via{' '}
        <a href="mailto:hi@johan.li" className={aClass}>
          hi@johan.li
        </a>
        .
      </p>
    </>
  )
}
