import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  forwardRef,
} from 'react';
import ReactDOM from 'react-dom';

const A4_HEIGHT_MM = 297;
const A4_HEIGHT_PX = A4_HEIGHT_MM * 3.77953; // Approximate conversion to pixels

interface A4PageProps {
  children: ReactNode;
  isLastPage: boolean;
}

const A4Page: React.FC<A4PageProps> = ({ children, isLastPage }) => (
  <div
    style={{
      width: '210mm',
      height: `${A4_HEIGHT_MM}mm`,
      padding: '20mm',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      marginBottom: isLastPage ? '' : '20px',
    }}
    className="a4page"
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

          // eslint-disable-next-line react/no-deprecated
          ReactDOM.render(<>{element}</>, tempContainer);

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
      <div
        ref={ref}
        style={{
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '210mm',
          }}
        />
        {pages.map((pageContent, index) => {
          const isLastPage = pages.length - 1 === index;

          return (
            <A4Page key={index} isLastPage={isLastPage}>
              {pageContent}
            </A4Page>
          );
        })}
      </div>
    );
  },
);

AutoPaginate.displayName = 'AutoPaginate';

export default AutoPaginate;
