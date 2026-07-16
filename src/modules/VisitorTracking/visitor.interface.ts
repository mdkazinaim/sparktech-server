export interface IPageVisit {
  page: string;
  title: string;
  timestamp: Date;
}

export interface IVisitorSession {
  sessionToken: string;
  ip?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  userAgent?: string;
  referrer?: string;
  isReturning: boolean;
  activePage?: string;
  activePageTitle?: string;
  pagesVisited: IPageVisit[];
  duration: number; // in seconds
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}
