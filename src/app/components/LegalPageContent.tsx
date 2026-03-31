import { FloatingCard } from './FloatingCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { usePageData } from '../hooks/usePageData';
import { resolveCmsImageUrl } from '../utils/media';

interface LegalPageContentProps {
  pageId: string;
  defaultTitle: string;
  defaultContent: string;
}

export function LegalPageContent({ pageId, defaultTitle, defaultContent }: LegalPageContentProps) {
  const { data: pageData, isLoading } = usePageData(pageId);
  const { settings } = useGlobalSettings();

  const title = pageData?.title || defaultTitle;
  const resolvedHeroImage = resolveCmsImageUrl(pageData?.hero?.image, settings?.heroImage);
  
  // Function to render section content with formatting
  const renderContent = (content: string) => {
    if (!content) return null;
    
    // Split by newlines and convert **text** to bold
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      // Replace **text** with <strong>text</strong>
      const formattedText = paragraph
        .split('**')
        .map((part, i) => i % 2 === 1 ? `<strong>${part}</strong>` : part)
        .join('');
      
      // Replace single \n with <br>
      const withBreaks = formattedText.replace(/\n/g, '<br>');
      
      return (
        <p 
          key={index} 
          className="mb-4 text-[var(--farm-primary-text)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: withBreaks }}
        />
      );
    });
  };

  // Render structured sections if available, otherwise fall back to HTML content
  const renderStructuredContent = () => {
    if (pageData?.sections && Array.isArray(pageData.sections)) {
      return (
        <div className="space-y-8">
          {pageData.sections.map((section: any, index: number) => (
            <div key={section.id || index} className="space-y-4">
              {section.title && (
                <h2 className="text-2xl font-bold text-[var(--farm-primary-text)] mb-3">
                  {index + 1}. {section.title}
                </h2>
              )}
              
              {section.content && (
                <div className="space-y-3">
                  {renderContent(section.content)}
                </div>
              )}
              
              {section.list && section.list.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {section.list.map((item: string, itemIndex: number) => (
                    <li 
                      key={itemIndex}
                      className="text-[var(--farm-primary-text)] leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: item.split('**').map((part, i) => i % 2 === 1 ? `<strong>${part}</strong>` : part).join('')
                      }}
                    />
                  ))}
                </ul>
              )}
              
              {section.subsections && section.subsections.length > 0 && (
                <div className="pl-4 space-y-4 mt-4">
                  {section.subsections.map((subsection: any, subIndex: number) => (
                    <div key={subIndex} className="space-y-3">
                      {subsection.title && (
                        <h3 className="text-xl font-semibold text-[var(--farm-primary-text)]">
                          {subsection.title}
                        </h3>
                      )}
                      
                      {subsection.content && (
                        <div className="space-y-2">
                          {renderContent(subsection.content)}
                        </div>
                      )}
                      
                      {subsection.list && subsection.list.length > 0 && (
                        <ul className="list-disc pl-6 space-y-2">
                          {subsection.list.map((item: string, itemIndex: number) => (
                            <li 
                              key={itemIndex}
                              className="text-[var(--farm-primary-text)] leading-relaxed"
                              dangerouslySetInnerHTML={{ 
                                __html: item.split('**').map((part, i) => i % 2 === 1 ? `<strong>${part}</strong>` : part).join('')
                              }}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      // Fallback to HTML content for pages that don't have structured data yet
      const content = pageData?.content || defaultContent;
      return (
        <div 
          className="legal-content prose prose-farm max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[18rem] h-[min(88svh,31rem)] items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] md:h-[37.5rem]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
        </div>
        
        {/* Bottom shadow for levitation effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]" />
        
        {/* Organic wave transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.08))' }}>
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,60 1200,40 L1200,120 L0,120 Z" fill="var(--farm-page-bg)" />
          </svg>
        </div>
        
        {!isLoading && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-7 drop-shadow-2xl leading-tight">
                {title}
              </h1>
            </div>
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-[var(--farm-page-bg)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FloatingCard hover={false}>
            {renderStructuredContent()}
          </FloatingCard>
        </div>
      </section>
    </div>
  );
}
