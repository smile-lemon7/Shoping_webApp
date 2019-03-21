import { connect } from 'dva';
import { Flex } from 'antd-mobile';


function HomePage() {
  return (
   <Flex>首页</Flex>
  )}

const mapDispatch2Props = (dispatch) => ({

})
export default connect(()=>({}), mapDispatch2Props)(HomePage);