import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex, Icon } from 'antd-mobile';

class CarouselDetail extends Component {
  
  readImageFun = (item, content) => {
    window.wx.previewImage({
      current: item,
      urls: content
    })
  }
  render() {
    const wrap = {width: "100%"};
    const imgStyle = {width: "100%"};
    const { loading, carouselItem: { content } } = this.props;
    
  	return (
      <Flex style={wrap} justify="center" align="center">
        {loading?<Flex align="center" justify="center" style={{height:"100%"}}>
            <Icon type='loading' size='lg'  />
          </Flex>:
          <Flex direction="column" style={{paddingBottom: '20px'}}>
            {content && content.map( (item,index) => (
                <img src={item} alt={item} key={index} style={imgStyle} onClick={() => this.readImageFun(item, content) } />
              ))
            }
          </Flex>
        }
      </Flex>
  	)
  }
}

CarouselDetail.defaultProps = {
  carouselItem: {
    id:1, 
    cover_img:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/23703/6/10784/144136/5c89f7eaEa5b2130f/c4758059ca4835ed.jpg!cr_1125x549_0_72!q70.jpg.dpg', 
    content: ['//m.360buyimg.com/mobilecms/s750x366_jfs/t1/23703/6/10784/144136/5c89f7eaEa5b2130f/c4758059ca4835ed.jpg!cr_1125x549_0_72!q70.jpg.dpg']},
}
  
const mapState2Props = ({ loading}) => ({
  // loading:loading.effects["news/getNewsItem"]
})

const mapDispatch2Props = ( dispatch ) => ({
  
})

export default connect(mapState2Props, mapDispatch2Props)(CarouselDetail);