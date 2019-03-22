import { Flex } from 'antd-mobile';
import styles from './Group.less';
import Item from './Item.js';

function Group({list}) {
  return (
   <Flex className={styles.wrap} wrap="wrap" justify="around">
    {list&&list.map(item => (
      <Item {...item} key={item.id} />
    ))
    }
   </Flex>
  )}


export default Group;