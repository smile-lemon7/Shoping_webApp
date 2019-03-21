import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import CarouselCon from '../Carousel';
import PricePanel from '../PricePanel';
import styles from './ProductPanel.less';
import { Flex, WhiteSpace, WingBlank, Icon, Modal, List, Button } from 'antd-mobile';

class ProductPanel extends Component {
  state = {
    modal: false,
  }
  showModal = (e) => {
    e.preventDefault();
    this.setState({modal: true})
  }
  onClose = (e) => {
    this.setState({modal: false})
  }
  render() {
    let { curr_price, old_price, title, cover_img } = this.props.productInfo;
    let { currentAddress } = this.props;
    const prodParamsLabel = ['生产日期', '产地', '净含量', '包装种类'];
    return (
      <Flex className={styles.wrap} align="start" direction="column">
        <CarouselCon list={cover_img} />
        <WhiteSpace />
        <Flex className={styles.baseInfo} direction="column" align="start">
          <WingBlank>
            <PricePanel price={curr_price} />
            <Flex className={styles.prodTitle}>{title}</Flex>
          </WingBlank>
          <Flex className={styles.bottom} direction="column" align="start">
            <WhiteSpace />
            <Flex className={styles.prod} justify="between">
              <span className={styles.tit}>服务</span>
              <Flex className={styles.prod_R} justify="between">
                <span>破损包退</span>
                <Icon type="right" size="xs" color="#888" />
              </Flex>
            </Flex>
            <Flex className={styles.prod} justify="between">
              <span className={styles.tit}>规格</span>
              <Flex className={styles.prod_R} justify="between">
                <span>配送至：{currentAddress.area}</span>
                <Icon type="right" size="xs" color="#888" />
              </Flex>
            </Flex>
            <Flex className={styles.prod} justify="between" onClick={this.showModal}>
              <span className={styles.tit}>参数</span>
              <Flex className={styles.prod_R} justify="between">
                <span>生产日期 存储方法</span>
                <Icon type="right" size="xs" color="#888" />
              </Flex>
            </Flex>
            <Modal
              popup
              visible={this.state.modal}
              animationType="slide-up"
              onClose={this.onClose}
            >
              <List renderHeader={() => <div>产品参数</div>}>
                {prodParamsLabel.map((i, index) => (
                  <WingBlank key={i}>
                    <Flex style={{width: '100%', height:40 ,borderTop: '1px solid #f1f1f1'}}>
                      <span style={{fontSize: 12, color: '#000', width: 80, marginRight: 20}}>{i}</span>
                      <span style={{fontSize: 12, flex: 1}}>{index}</span>
                    </Flex>
                  </WingBlank>
                ))}
                <List.Item>
                  <Button 
                    type="primary" 
                    onClick={this.onClose} 
                    style={{height: '40px',lineHeight: '40px',fontSize: 13,color:'#fff',borderRadius: '20px'}}>完成</Button>
                </List.Item>
              </List>
            </Modal>
            <WhiteSpace />
            <Flex className={styles.recommendWrap}>
            
            </Flex>
            <WhiteSpace />
            <Flex className={styles.prodDetailWrap}></Flex>
          </Flex>
        </Flex>
      </Flex>
     )
  }
}

ProductPanel.propTypes = {
  productInfo: PropTypes.object
}

export default ProductPanel;