import { TwitterShareButton } from 'react-share';

function ShareOnTwitter({
  children,
  url,
}: {
  children: React.ReactElement;
  url: string;
}) {
  return (
    <TwitterShareButton
      url={`\n${url}`}
      title="Temporary message!"
      via=""
      hashtags={['DoWithDZap', 'DeFi']}
      related={['\n\n#Dzap', '#Multiswap']}
    >
      {children}
    </TwitterShareButton>
  );
}
export default ShareOnTwitter;
