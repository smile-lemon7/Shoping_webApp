
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';
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

export default AddressPanel