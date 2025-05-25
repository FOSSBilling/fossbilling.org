import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Card, Cards } from './components/Card';
import { ContributedBy } from './components/ContributedBy';
import DateComponent from './components/Date';
import { Feature, Features } from './components/Features';
import LatestVersion from './components/LatestVersion';
import ReleasedOn from './components/ReleasedOn';
import FAIcon from './components/FAIcon';

// Import FontAwesome icons from solid icons
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

// Import FontAwesome icons from brand icons
import { 
  faGithub, 
  faDocker, 
  faCpanel 
} from '@fortawesome/free-brands-svg-icons';

export function useMDXComponents(components: any) {
  const docsComponents = getDocsMDXComponents(components);

  return {
    ...docsComponents,
    Card,
    Cards,
    ContributedBy,
    Date: DateComponent,
    Feature,
    Features,
    FontAwesomeIcon,
    LatestVersion,
    ReleasedOn,
    Link,
    FAIcon,
    // All FontAwesome icons available individually for backward compatibility
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
    ...components,
  };
}
