import React from 'react';
import { articleStyles as styles } from '../styles/styles';
import {  
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';

export default function ArticleList({route}) {
  const { length, renderArticleList } = route.params

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{length}</Text>
        </View>
        {renderArticleList}
      </View>
    </SafeAreaView>
  )
  
}

