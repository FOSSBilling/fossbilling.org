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

export type CentralAlert = {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'danger';
    dismissable: boolean;
    min_fossbilling_version: string;
    max_fossbilling_version: string;
    include_preview_branch: boolean;
    buttons?: {
        text: string;
        link: string;
        type?: 'success' | 'info' | 'warning' | 'danger';
    }[];
}