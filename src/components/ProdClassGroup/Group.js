import { Flex, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import TitleCom from '../TitleCom';
import styles from './Group.less';
import Item from './Item.js';

function Group({list, classes}) {
  return (
    <WingBlank size="lg">
      <Flex className={styles.wrap} wrap="wrap" justify="between">
        <TitleCom title={classes} />
        {list&&list.map(item => (
          <Item {...item} key={item.id} />
        ))
        }
      </Flex>
    </WingBlank>
  )}

Group.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.string,
}
export default Group;