import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Completely open-sourced',
    description: (
      <>
        FOSSBilling is completely open-sourced and licensed under the Apache 2.0 license. We don't encode any of our software, so you can be sure that you are in control of what runs on your infrastructure.
      </>
    ),
  },
  {
    title: 'Extensible',
    description: (
      <>
        FOSSBilling is designed to be extensible. You can easily add your own custom modules to extend the functionality of FOSSBilling. You can also integrate FOSSBilling with your favourite server management software and payment gateways.
      </>
    ),
  },
  {
    title: 'Backed by the community',
    description: (
      <>
        The project is entirely funded by the community. You can support the
        project by{' '}<a href="https://opencollective.com/FOSSBilling" target="_blank">becoming a sponsor</a>. Our expenses are listed on our <a href="https://opencollective.com/FOSSBilling/expenses" target="_blank">Open Collective page</a> too.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}