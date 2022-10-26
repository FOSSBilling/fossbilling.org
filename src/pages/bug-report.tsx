import React from 'react';

export default function BugReport() {
    React.useEffect(() => {
        window.location.href = 'https://github.com/FOSSBilling/FOSSBilling/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBug%5D';
      }, []);
      return null;
    };