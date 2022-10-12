import React from 'react';

export default function Preview() {
    React.useEffect(() => {
        window.location.href = 'https://s4-fossb-2.fi-hel2.upcloudobjects.com/releases/FOSSBilling-preview.tar';
      }, []);
      return null;
    };
