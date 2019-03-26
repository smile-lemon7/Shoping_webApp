import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';

 function InfoItem({title, value}) {
  return (
    <Flex className={styles.Panel}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </Flex>
  )
}
InfoItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
}

export default InfoItem;
