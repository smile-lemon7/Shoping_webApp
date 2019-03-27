import PropTypes from 'prop-types';
import {Carousel, Flex} from 'antd-mobile';
import styles from './index.less';

const ProdCarousel = ({ list }) => {
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
        autoplay = {true} 
        infinite 
        dotStyle={dotStyle} 
        dotActiveStyle={dotActiveStyle} 
        autoplayInterval={5000}
      >
        {list.map((item, index) => (
          <Flex key={index} className={styles.imgWrap} >
            <img src={item} alt={item}
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
ProdCarousel.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
}
export default ProdCarousel;


