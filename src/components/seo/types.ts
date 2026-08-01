// types.ts - Update with all SEO fields
export interface SeoData {
  siteName?: string;
  siteUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  googleAnalytics?: string;
  googleTagManager?: string;
  googleVerification?: string;
  bingVerification?: string;
  themeColor?: string;
  colorScheme?: string;
  headerScripts?: string;
  bodyScripts?: string;
  organizationSchema?: any;
  breadcrumbSchema?: any;
  listingSchema?: any;
  faqSchema?: any;
  customSchema?: any;
  _debug?: any;
}

export interface ServerSeoProps {
  companyId: string;
  apiUrl: string;
  path?: string;
}