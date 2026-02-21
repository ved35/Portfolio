const SpecialPage = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src="special_content.html"
        className="w-full h-full border-none"
        title="Special Page"
      />
    </div>
  );
};

export default SpecialPage;
