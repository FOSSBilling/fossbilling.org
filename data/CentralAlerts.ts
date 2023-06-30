import { CentralAlert } from "interfaces";

export const CentralAlerts: CentralAlert[] = [
    {
        id: "1",
        title: "This version of FOSSBilling is insecure",
        message: "FOSSBilling versions between 0.4.3 and 0.5.2 are vulnerable to SQL injection with a critical (9.8) severity. Please update now to protect you and your customers.",
        type: "danger",
        dismissible: false,
        min_fossbilling_version: "0.4.3",
        max_fossbilling_version: "0.5.2",
        include_preview_branch: false,
        buttons: [
            {
                text: "CVE Details",
                link: "https://nvd.nist.gov/vuln/detail/CVE-2023-3490",
                type: "info"
            },
            {
                text: "Original vulnerability report",
                link: "https://huntr.dev/bounties/4e60ebc1-e00f-48cb-b011-3cefce688ecd/",
                type: "info"
            }
        ],
        datetime: "2023-06-30T21:43:03+00:00"
    },
]
