import React from 'react';

export default function Preview() {
    React.useEffect(() => {
        window.location.href = 'https://s4-ams-fossbilling.nl-ams1.upcloudobjects.com/releases/FOSSBilling-preview.tar';
      }, []);
      return null;
    };
