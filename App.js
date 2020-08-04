import React, { 
  useState, 
  useEffect, 
  useMemo, 
  useCallback
} from 'react';
import ArticleList from './screens/ArticleList';
import PublisherList from './screens/PublisherList';
import moment from 'moment';

import { articleStyles as styles } from './styles/styles';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { 
  Card, 
  Button, 
  Icon 
} from 'react-native-elements';
import { 
  View, 
  Text 
} from 'react-native';


const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [ loading, setLoading ] = useState(true);
  const [ hasErrored, setHasApiError ] = useState(false);
  const [ lastPageReached, setLastPageReached ] = useState(false);
  const [ articles, setArticles ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);
  const [ publishersList, setPublishersList ] = useState({});
  const [ refreshing, setRefreshing ] = useState(false);

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(item => {
      let unique = true;
      cleaned.forEach(item2 => {
        const isEqual = JSON.stringify(item) === JSON.stringify(item2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(item);
    });
    return cleaned;
  };

  const getNews = async () => {
    if (lastPageReached) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=d05ce933a10240f18baec1e2cb2da323&page=${pageNumber}`
      );
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticles(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true);
      }
    } catch (error) {
      setHasApiError(true);
    }

    setLoading(false);
  };

  const getPublishers = () => {
    const publishers = {}
    articles.forEach((item) => {
      item.source.name in publishers 
      ? publishers[item.source.name] += 1
      : publishers[item.source.name] = 1
    })
    setPublishersList(publishers)
  } 

  useEffect(() => {
    getNews()
    getPublishers()
  }, [articles])


  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setArticles([])
    setPageNumber(1)
    setLastPageReached(false)
    setRefreshing(false)
  }, [refreshing])


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator 
          size="large" 
          loading={loading} 
        />
      </View>
    );
  }

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =(</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ArticleList"
        barStyle={styles.navigator} 
        activeColor='#3282b8' 
        inactiveColor='#989898'
      >
        <Tab.Screen 
          name="ArticleList" 
          component={ArticleList} 
          options={{title:"Articles List", headerTitleAlign: "center"}}
          initialParams={{
            length: articles.length, 
            articles: articles, 
            loading: loading, 
            getNews: getNews, 
            lastPageReached: lastPageReached,
            refreshing: refreshing,
            onRefresh: onRefresh,
          }}
        />
        <Tab.Screen 
          name="PublishersList" 
          component={PublisherList} 
          options={{title:"Publishers List", headerTitleAlign: "center"}}
          initialParams={{publishersList: publishersList}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}