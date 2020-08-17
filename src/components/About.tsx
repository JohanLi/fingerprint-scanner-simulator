import React, { ReactElement } from 'react';

import styles from './about.scss';

const About = (): ReactElement => (
  <div className={styles.about}>
    <h2>What’s this?</h2>
    <p>
      <i>The Diamond Casino Heist</i> in GTA Online introduces two hacking
      minigames, one of them being the fingerprint scanner. To maximize your
      take, you have to be fast. Use this simulator to practice – outside the
      heist, without the loading screens, on your phone!
    </p>
    <p>
      There are 4 fingerprints in total. For each fingerprint, tap/click on the
      4 elements (parts, segments) that make up the fingerprint.
    </p>
    <h2>Normal, Hard, huh?</h2>
    <p>
      Hard leaves you to select the correct 4 elements without looking at each
      fingerprint. Once you’ve practiced enough, you’ll manage. This is how you
      hack the fastest in the actual heist!
    </p>
    <p>These two modes have no connection to the heist.</p>
    <h2>What’s up with the strange website address?</h2>
    <p>
      My name is Johan Li, and this is my personal website. I’m a software
      developer, and have worked in the gaming industry for Paradox Interactive.
      If you’re also into software development and tech in general, I hope you
      find <a href="https://johan.li">my articles</a> interesting!
    </p>
    <p>
      If you have feedback on this simulator, reach out to me via{' '}
      <a href="mailto:hi@johan.li">hi@johan.li</a>. I’ve done the Casino Heist
      many times – if you’d be interested in me creating a guide with tips and
      tricks on how to do both the heist and set ups quickly, let me know.
    </p>
  </div>
);

export default About;
