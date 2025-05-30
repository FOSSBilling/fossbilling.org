import React from 'react';
import DateComponent from './Date';

async function getLatestReleaseData() {
  try {
    const res = await fetch('https://api.github.com/repos/FOSSBilling/FOSSBilling/releases', {
      next: { revalidate: 600 } // Revalidate every 10 minutes
    });
    const releases = await res.json();
    return {
      latest_version: releases[0].tag_name,
      released_on: releases[0].published_at,
    };
  } catch (error) {
    console.error('Failed to fetch release data:', error);
    return {
      latest_version: 'N/A',
      released_on: new Date().toISOString(),
    };
  }
}

export default async function ReleasedOn(): Promise<React.JSX.Element> {
  const { released_on } = await getLatestReleaseData();
  return <DateComponent dateString={released_on} />;
}
