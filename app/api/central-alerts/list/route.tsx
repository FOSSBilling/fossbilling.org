import { FOSSBillingAPIResponse } from 'interfaces/index';
import { NextRequest, NextResponse } from 'next/server'
import { CentralAlerts } from 'data/CentralAlerts';

export async function GET(req: NextRequest) {
    return NextResponse.json({
      result: {
        alerts: CentralAlerts
      },
      error: null
    } as FOSSBillingAPIResponse, { status: 200 })
  }