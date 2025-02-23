import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Home() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full min-h-screen">
      <Document
        file="/sample2.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full"
      >
        <Page
          pageNumber={pageNumber}
          width={window.innerWidth}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber >= (numPages || 0)}
          onClick={() => setPageNumber(pageNumber + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
