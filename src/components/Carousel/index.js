import PropTypes from 'prop-types';
import {Carousel, Flex} from 'antd-mobile';
import styles from './index.less';

const CarouselCon = ({ list }) => {
  const dotStyle = {
    marginBottom: "10px", 
    width: '6px', 
    height: '6px', 
    backgroundColor: 'rgba(255,255,255, .6)', 
    borderRadius: '50%' 
  };
  const dotActiveStyle = {
    marginBottom: "10px", 
    width: '6px', 
    height: '6px', 
    borderRadius: '50%', 
    backgroundColor: '#f00'
  };
  
  return (
    <Flex className={styles.CarouselWrap}>
      <Carousel 
        autoplay = {false} 
        infinite 
        dotStyle={dotStyle} 
        dotActiveStyle={dotActiveStyle} 
        autoplayInterval={5000}
      >
        {list.map((item, index) => (
          <Flex key={index} className={styles.imgWrap} >
            <img src={item.cover_img} alt={item.cover_img}
              onClick={item.onClick}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
              }}
            />
          </Flex>
        ))}
      </Carousel>
    </Flex>
  )
}
CarouselCon.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    cover_img: PropTypes.string,
    onClick: PropTypes.func,
  })),
}
export default CarouselCon;


