import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faCode, 
  faServer,
  faBoxOpen,
  faWrench,
  faHand,
  faPersonDigging,
  faCircleInfo,
  faRobot,
  faTriangleExclamation,
  faUserShield,
  faLanguage,
  faScrewdriverWrench,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faDocker, 
  faCpanel 
} from '@fortawesome/free-brands-svg-icons';

// Map of icon names to icon objects
const iconMap = {
  faDownload,
  faCode,
  faServer,
  faBoxOpen,
  faWrench,
  faHand,
  faPersonDigging,
  faCircleInfo,
  faRobot,
  faTriangleExclamation,
  faUserShield,
  faLanguage,
  faScrewdriverWrench,
  faBell,
  faGithub,
  faDocker,
  faCpanel,
};

type IconName = keyof typeof iconMap;

interface FAIconProps {
  icon: IconName;
  className?: string;
}

export function FAIcon({ icon, className }: FAIconProps) {
  const iconObject = iconMap[icon];
  if (!iconObject) {
    console.warn(`Icon ${icon} not found in iconMap`);
    return null;
  }
  return <FontAwesomeIcon icon={iconObject} className={className} />;
}

export default FAIcon;
