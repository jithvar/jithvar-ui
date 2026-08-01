// ServerSeo.tsx
import React from 'react';
import { SeoData, ServerSeoProps } from './types';

async function fetchSeoData(path: string, companyId: string, apiUrl: string): Promise<SeoData | null> {
  try {
    const url = `${apiUrl}?companyId=${companyId}&path=${encodeURIComponent(path)}`;
    
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.success && data.data ? data.data : null;
  } catch (error) {
    console.log('fetchSeoData: Error occurred:', error);
    return null;
  }
}

export async function ServerSeo({ 
  companyId,
  apiUrl,
  path = '/'
}: ServerSeoProps) {

  // Validate required props
  if (!companyId || !apiUrl) {
    console.warn('ServerSeo: companyId and apiUrl are required');
    return null;
  }

  const seoData = await fetchSeoData(path, companyId, apiUrl);
  const data = seoData;

  if (!data) {
    return null;
  }

  let title = data.metaTitle || '';

  return (
    <>
      {/* Title */}
      {title && <title>{title}</title>}
      
      {/* Meta Tags */}
      {data.metaDescription && <meta name="description" content={data.metaDescription} />}

      {data.metaKeywords && <meta name="keywords" content={data.metaKeywords} />}
      
      {/* Open Graph */}
     
      {data.ogTitle && <meta property="og:title" content={data.ogTitle} />}
     
      {data.ogDescription && <meta property="og:description" content={data.ogDescription} />}
      
      {data.ogImage && <meta property="og:image" content={data.ogImage} />}
 
      {data.ogType && <meta property="og:type" content={data.ogType} />}
      
      {/* Open Graph Extra */}
      {data.canonicalUrl && (
        <meta property="og:url" content={data.canonicalUrl} />
      )}
      {data.siteName && (
        <meta property="og:site_name" content={data.siteName} />
      )}
      
     
      {data.twitterCard && <meta name="twitter:card" content={data.twitterCard} />}
   
      {data.twitterTitle && <meta name="twitter:title" content={data.twitterTitle} />}
  
      {data.twitterDescription && <meta name="twitter:description" content={data.twitterDescription} />}
     
      {data.twitterImage && <meta name="twitter:image" content={data.twitterImage} />}
      
      {/* Twitter Extra */}
      {data.canonicalUrl && (
        <meta name="twitter:url" content={data.canonicalUrl} />
      )}
      
      {/* Canonical */}
      {data.canonicalUrl && <link rel="canonical" href={data.canonicalUrl} />}
      
      {/* Robots */}
      {(data.noIndex || data.noFollow) && (
        <meta 
          name="robots" 
          content={[
            data.noIndex ? 'noindex' : 'index',
            data.noFollow ? 'nofollow' : 'follow'
          ].join(', ')} 
        />
      )}
      
      {/* Search Engine Verification */}
      {data.googleVerification && (
        <meta name="google-site-verification" content={data.googleVerification} />
      )}
      {data.bingVerification && (
        <meta name="msvalidate.01" content={data.bingVerification} />
      )}
      
      {/* Theme */}
      {data.themeColor && (
        <meta name="theme-color" content={data.themeColor} />
      )}
      {data.colorScheme && (
        <meta name="color-scheme" content={data.colorScheme} />
      )}
      
      {/* Mobile Web App */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Referrer */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Google Analytics */}
      {data.googleAnalytics && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${data.googleAnalytics}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${data.googleAnalytics}');
              `,
            }}
          />
        </>
      )}
      
      {/* Google Tag Manager */}
      {data.googleTagManager && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){
w[l]=w[l]||[];
w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),
dl=l!='dataLayer'?'&l='+l:'';
j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${data.googleTagManager}');
            `,
          }}
        />
      )}
      
      {/* Header Scripts */}
      {data.headerScripts && (
        <div dangerouslySetInnerHTML={{ __html: data.headerScripts }} />
      )}
      
      {/* Body Scripts */}
      {data.bodyScripts && (
        <div dangerouslySetInnerHTML={{ __html: data.bodyScripts }} />
      )}
    
      {data.organizationSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.organizationSchema) }} />
      )}
      {data.breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbSchema) }} />
      )}
      {data.listingSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.listingSchema) }} />
      )}
      {data.faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.faqSchema) }} />
      )}
      {data.customSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.customSchema) }} />
      )}
    </>
  );
}