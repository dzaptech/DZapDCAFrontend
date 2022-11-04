import { Tooltip } from 'antd';
import tooltipInfo from '../../Assets/Icons/tooltip-info.svg';
import tooltipHover from '../../Assets/IconsV2/tooltip.svg';

function CustomTooltip({
  title,
  desc,
  placement,
}:
{
  title: string | undefined,
  desc: string,
  placement: 'topLeft' | 'top' | 'topRight' | 'leftTop' | 'left' | 'leftBottom' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight',
},
) {
  return (
    <div>
      <Tooltip
        placement={placement}
        color="#E6E9ED"
        title={
          <div className='py-3 px-4'>
            {title && (
              <div className='flex items-center tooltip_info gap-x-2'>
                <img src={tooltipInfo} className='w-3 h-3' alt="info" />
                <p className='tooltip_info_title'> {title} </p>
              </div>
            )}
            <p className={`${title && 'mt-1'} tooltip_info_desc`}>
              {desc}
            </p>
          </div>
        }>
        <img src={tooltipHover} className='cursor-pointer' alt="tooltip" />
      </Tooltip>
    </div>
  );
}
export default CustomTooltip;