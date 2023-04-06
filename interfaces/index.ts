export type FOSSBillingAPIResponse = {
    result: any;
    error: {
        message: string;
        code: number;
    };
  }

export type FOSSBillingVersion = {
    version: string;
    support: 'insecure' | 'outdated' | 'latest';
}