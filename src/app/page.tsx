import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./component/pdfViewer"), { ssr: false });

export default function Home() {
    return <PDFViewer fileUrl="/sample.pdf" />;
}
