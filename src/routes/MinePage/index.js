import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import styles from './index.less';


function MinePage() {
  return (
   <Flex className={styles.wrap}>
      个人中心
   </Flex>
  )}

const mapDispatch2Props = (dispatch) => ({

})
export default connect(()=>({}), mapDispatch2Props)(MinePage);