export default function SiteLoading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
        color: "#64748b",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid #e2e8f0",
          borderTopColor: "#f97316",
          borderRadius: "50%",
          animation: "tj-spin 0.8s linear infinite",
        }}
      />
      <span style={{ fontSize: 14 }}>Loading...</span>
      <style>{`@keyframes tj-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
