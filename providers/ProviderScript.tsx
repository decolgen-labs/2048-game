const ProviderScript = () => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HRQPR23M9B"
      ></script>

      <script id="google-analytics">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HRQPR23M9B');
        gtag('send', 'pageview');
        `}
      </script>
    </>
  );
};

export default ProviderScript;
