import React, { Component } from 'react';
import { Flex, InputItem, WingBlank, TextareaItem } from 'antd-mobile';
import styles from './index.less';

class ListCom extends Component {
  render() {
    const {title, icon, other, type, onChange} = this.props;
    return(
      <WingBlank style={{width: '100%'}}>
        <Flex className={styles.wrap}>
        {type === 'details'?<TextareaItem
            title=""
            placeholder={title}
            autoHeight
            onBlur={(value)=>onChange({value, type})}
          />:<InputItem
              type={type==='phone'?type:'receiver'}
              placeholder={title}
              onBlur={(value)=>onChange({value, type})}
            />
        }
          <i className={icon} style={{fontSize: 22,color:'#888'}}></i>
        </Flex>
      </WingBlank>
    )
  }
}


export default  ListCom;