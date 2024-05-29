const ProviderScript = () => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZBDZGCPYGK"
      ></script>

      <script id="google-analytics">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZBDZGCPYGK');
        gtag('send', 'pageview');
        `}
      </script>
    </>
  );
};

export default ProviderScript;
