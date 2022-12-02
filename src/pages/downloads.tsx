import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function Header() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          Download FOSSBilling
        </h1>
        <p className="hero__subtitle">Download the latest stable version of FOSSBilling. This is the recommended version for all users.</p> 
        <div className={styles.buttons}>
          <a
            className="button button--secondary button--lg"
            href="https://fossbilling.org/downloads/preview">
            Download v0.1.0
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Downloads(): JSX.Element {
  return (
    <Layout
      title="Downloads"
      description="Download FOSSBilling from the official website. FOSSBilling is a free and open-source billing and client management solution.">
      <Header />
      <main>
        <div className="text--center" style={{
          marginTop: '2rem',
        }}>
          <h2>Are you a developer?</h2>
          <p>You might want to download a preview build instead. We automatically generate preview builds for every commit to the main branch.</p>
          <div className={styles.buttons} style={{
            marginBottom: '1rem',
          }}>
            <a
              className="button button--secondary button--lg"
              href="https://fossbilling.org/downloads/preview">
              Download the latest preview
            </a>
          </div>
          <p>Let's keep in touch. Join our <a href="https://fossbilling.org/discord">Discord server</a> to contact the team directly.</p>
        </div>
      </main>
    </Layout>
  );
}