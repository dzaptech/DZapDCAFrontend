import { TwitterShareButton } from 'react-share';

function ShareOnTwitter({
  children,
  url,
  nofTokens,
}: {
  children: React.ReactElement;
  url: string;
  nofTokens: number;
}) {
  return (
    <TwitterShareButton
      url={url}
      title={`Just swapped ${nofTokens} tokens in a single transaction on @dzap_io. What a DeFi experience!\n`}
      via=""
      hashtags={['DoWithDZap', 'DeFi']}
      related={['\n\n#Dzap', '#Multiswap']}
    >
      {children}
    </TwitterShareButton>
  );
}
export default ShareOnTwitter;
