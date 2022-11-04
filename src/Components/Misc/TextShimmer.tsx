import { Skeleton } from 'antd';

function TextShimmer({
  classNames,
  style,
}: {
  classNames?: string;
  style?: {};
}) {
  return (
    <Skeleton.Button
      active
      style={style}
      className={classNames}
      shape="default"
    />
  );
}
export default TextShimmer;

TextShimmer.defaultProps = {
  classNames: '',
  style: {},
};
