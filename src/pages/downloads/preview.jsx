import React from 'react';

export default function Preview() {
    React.useEffect(() => {
        window.location.href = 'https://fossbilling-public.s3.eu-central-1.amazonaws.com/FOSSBilling-preview.tar';
      }, []);
      return null;
    };