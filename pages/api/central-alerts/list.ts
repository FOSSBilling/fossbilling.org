import { FOSSBillingAPIResponse } from 'interfaces/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CentralAlerts } from 'data/CentralAlerts';

export default function handler(req: NextApiRequest, res: NextApiResponse<FOSSBillingAPIResponse>) {
    res.status(200).json({
      result: {
        alerts: CentralAlerts
      },
      error: null
    })
  }