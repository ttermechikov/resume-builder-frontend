import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  forwardRef,
} from 'react';
import { createRoot } from 'react-dom/client';

const A4_HEIGHT_MM = 297;
const A4_HEIGHT_PX = A4_HEIGHT_MM * 3.7795275591; // Approximate conversion to pixels

interface A4PageProps {
  children: ReactNode;
}

const A4Page: React.FC<A4PageProps> = ({ children }) => (
  <div
    style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '20px auto',
      padding: '20mm',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      pageBreakAfter: 'always',
    }}
  >
    {children}
  </div>
);

interface AutoPaginateProps {
  children: ReactNode;
}

const AutoPaginate = forwardRef<HTMLDivElement, AutoPaginateProps>(
  ({ children }, ref) => {
    const [pages, setPages] = useState<ReactNode[][]>([]);
    const measureRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const measureElement = (element: ReactNode): Promise<number> => {
        return new Promise((resolve) => {
          if (!measureRef.current) {
            resolve(0);
            return;
          }

          const tempContainer = document.createElement('div');
          measureRef.current.appendChild(tempContainer);

          const root = createRoot(tempContainer);
          root.render(<>{element}</>);

          requestAnimationFrame(() => {
            if (!measureRef.current) {
              return;
            }

            const height = tempContainer.getBoundingClientRect().height || 0;
            measureRef.current.removeChild(tempContainer);
            resolve(height);
          });
        });
      };

      const paginateContent = async () => {
        let currentPage: ReactNode[] = [];
        let currentPageHeight = 0;
        const newPages: ReactNode[][] = [];

        const contentArray = React.Children.toArray(children);

        for (let i = 0; i < contentArray.length; i++) {
          const child = contentArray[i];
          const elementHeight = await measureElement(child);

          if (currentPageHeight + elementHeight > A4_HEIGHT_PX) {
            newPages.push(currentPage);
            currentPage = [child];
            currentPageHeight = elementHeight;
          } else {
            currentPage.push(child);
            currentPageHeight += elementHeight;
          }
        }

        if (currentPage.length > 0) {
          newPages.push(currentPage);
        }

        setPages(newPages);
      };

      paginateContent();
    }, [children]);

    return (
      <div ref={ref} className="page-break-inside-avoid shrink-to-fit">
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '210mm',
          }}
        />
        {pages.map((pageContent, index) => (
          <A4Page key={index}>{pageContent}</A4Page>
        ))}
      </div>
    );
  },
);

AutoPaginate.displayName = 'AutoPaginate';

export default AutoPaginate;
