import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';

function PanelContainer({title, subTitle, onClick}) {
  return (
   <Flex className={styles.title} justify="between">
    <span>{title}</span>
    <Flex onClick={()=>onClick()}>
      <span className={styles.subTitle}>{subTitle}</span>
      <i className="iconfont icon-youjiantou" style={{color:'#666'}}></i>
    </Flex>
   </Flex>
  )}

PanelContainer.prototype = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func,
}
export default PanelContainer;