import { Flex, Icon } from 'antd-mobile';
import { PropTypes } from 'prop-types';

function ImgContainer({content}){
  const wrap = {width: "100%"};
  const imgStyle = {width: "100%"};
  function readImageFun(item, content){
    window.wx.previewImage({
      current: item,
      urls: content
    })
  }
 
  
  return (
    <Flex style={wrap} justify="center" align="center">
      <Flex direction="column" style={{paddingBottom: '20px'}}>
        {content && content.map( (item,index) => (
            <img src={item} alt={item} key={index} style={imgStyle} onClick={() => readImageFun(item, content) } />
          ))
        }
      </Flex>
    </Flex>
  )
}

ImgContainer.propTypes = {
  content: PropTypes.array
}
export default ImgContainer