"use client";
import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        // Load the PDF file
        const pdf = await pdfjsLib.getDocument("/sample.pdf").promise;

        // Get the first page
        const page = await pdf.getPage(1);

        // Set scale and viewport
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Prepare canvas for rendering
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPDF();
  }, []);

  return (
    <div
      className="pdf-container"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
