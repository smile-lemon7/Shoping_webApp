import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import Item from '../ProductCom/Item';
import styles from './Group.less';

function Group({prodList}) {
  return (
    <Flex className={styles.panel} direction="column">
      {prodList&&prodList.map(item => (
        <Flex key={item.id}>
          <Item info={item} />
        </Flex>
      ))
      }
    </Flex>
  )}

Group.propTypes = {
  prodList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  }))
}
export default Group;