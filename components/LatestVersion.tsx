import React from 'react';

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

export default async function LatestVersion(): Promise<React.JSX.Element> {
  const { latest_version } = await getLatestReleaseData();
  return <>{latest_version}</>;
}
