import { Flex } from 'antd-mobile';
import styles from './index.less';

function PanelContainer({title, subTitle, onClick}) {
  return (
   <Flex className={styles.title} justify="between">
    <span>{title}</span>
    <Flex onClick={()=>onClick(0)}>
      <span className={styles.subTitle}>{subTitle}</span>
      <i className="iconfont icon-youjiantou" style={{color:'#666'}}></i>
    </Flex>
   </Flex>
  )}

export default PanelContainer;