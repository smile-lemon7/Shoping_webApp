import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import ImgContainer from '../ImgContainer';
import styles from './DetailsPanel.less';

function DetailsPanel({content}) {
  return (
    <Flex className={styles.wrap} align="center" justify="start" direction="column">
      <ImgContainer content={content} />
    </Flex>
  )}

DetailsPanel.propTypes = {
  content: PropTypes.array
}
export default DetailsPanel;