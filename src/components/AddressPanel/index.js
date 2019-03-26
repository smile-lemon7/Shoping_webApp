
import { Flex} from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';


const AddressPanel = ({ addressInfo }) => {
  const {receiver, phone, area, details, isDefault, onClick, onSelect} = addressInfo;
  return(
    <Flex className={styles.panelWrap} align="center" justify="between">
      <Flex className={styles.L} justify="center">{receiver[0]}</Flex>
      <Flex className={styles.C} direction="column" align="start" onClick={onSelect}>
        <Flex className={styles.CT}>
          <span className={styles.CTL}>{receiver}</span>
          <span>{phone}</span>
        </Flex>
        <Flex className={styles.CB} align="start">
          <p>{
            isDefault?<span className={styles.default}>默认</span>:null}
            {area}{details}
          </p>
        </Flex>
      </Flex>
      <Flex className={styles.R} onClick={onClick}>编辑</Flex>
    </Flex>
  )
}

AddressPanel.propTypes = {
  addressInfo: PropTypes.shape({
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    isDefault: PropTypes.number,
    receiver: PropTypes.string,
    area: PropTypes.string,
    phone: PropTypes.string,
    details: PropTypes.string,
  }),
  
}
export default AddressPanel