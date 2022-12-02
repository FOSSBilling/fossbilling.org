import ThemedImage from '@theme/ThemedImage';
import HomepageFeatures from '@site/src/components/Homepage/Features';
import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <ThemedImage
            alt = "FOSSBilling logo"
            sources = {{
                light: '/img/logo-white.svg',
                dark: '/img/logo-black.svg',
            }}
            width = "500"
          />
      </h1>
        <p className="hero__subtitle">Free and open-source billing and client management solution.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="downloads">
            Download FOSSBilling
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Homepage"
      description="FOSSBilling is a free and open-source billing and client management solution.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}