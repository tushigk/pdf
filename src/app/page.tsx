export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <iframe
        src="/sample.pdf"
        className="w-full h-screen md:h-full"
        style={{
          border: "none",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      />
    </div>
  );
}
