import { APIResponse, FOSSBillingVersion } from '../../interfaces/index';

export default function handler(req, res) {
  const versions = ["0.1.0", "0.1.1", "0.2.0", "0.2.1", "0.2.2",
                    "0.2.3", "0.2.4", "0.2.5", "0.2.6", "0.2.7",
                    "0.2.8", "0.2.9", "0.2.10", "0.3.0", "0.4.0",
                    "0.4.1"]

  const latestVersion = versions[versions.length - 1];
  const outdatedVersionThreshold = "0.3.0";

  const versionsWithSupport = versions.map(version => {
    let support;
    
    if (version === latestVersion) {
      support = "latest";
    } else if (version >= outdatedVersionThreshold) {
      support = "outdated";
    } else {
      support = "insecure";
    }

    return {
      version: version,
      support: support
    } as FOSSBillingVersion
  });

  const response: APIResponse = {
      result: {
        versions: versionsWithSupport
      },
      error: null,
    };

    res.status(200).json(response)
  }