import { CentralAlert } from "interfaces";

export const CentralAlerts: CentralAlert[] = [
    {
        id: "1",
        title: "Test alert",
        message: "This is a test alert",
        type: "info",
        dismissable: true,
        min_fossbilling_version: "0.1",
        max_fossbilling_version: "0.5",
        include_preview_branch: false,
        buttons: [
            {
                text: "Test Button",
                link: "https://fossbilling.org",
                type: "info"
            },
            {
                text: "Test Button 2",
                link: "https://fossbilling.org",
            }
        ],
        datetime: "2023-04-22T11:14:22.584Z"
    },
    {
        id: "2",
        title: "Another test alert",
        message: "This is another test alert",
        type: "danger",
        dismissable: false,
        min_fossbilling_version: "0.1",
        max_fossbilling_version: "0.5",
        include_preview_branch: true,
        datetime: "2023-04-22T11:14:22.584Z"
    }
]