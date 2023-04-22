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
    datetime: string; // Use the ISO 8601 format. The easies way is to just open a browser and type "new Date().toISOString()" in the console.
}