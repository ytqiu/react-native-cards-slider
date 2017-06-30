# react-native-cards-slider
A simple cards slider implement use ScrollView working right on iOS and Android.

## usage
``
npm install git+https://github.com/ytqiu/react-native-cards-slider.git --save
``

```javascript
import CarouselCard from 'react-native-card-carousel'

// card item will be wrapped by a <View /> which using default props.
<CarouselCard
      data = {[1, 2, 3]}
      onPress = {item => {}}
      contentRender = {item => {
          return (
              <Text>{item}</Text>
          )
      }} 
  />
```

## snapshot
![react-native-cards-slider](http://ac-spul1riu.clouddn.com/MtjqydCjpGPOPrHUbkWOGkM4z6jipNQQlWBYx8Ms.gif)
![react-native-cards-slider](http://ac-spul1riu.clouddn.com/UWYsMeZzZbyCFDjYUi4GmJSxYaznahTUOsVdRjYt.gif)
