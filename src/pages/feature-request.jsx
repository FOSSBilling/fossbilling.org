import React from 'react';

export default function FeatureRequest() {
    React.useEffect(() => {
        window.location.href = 'https://github.com/FOSSBilling/FOSSBilling/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=%5BFeature+Request%5D';
      }, []);
      return null;
    };