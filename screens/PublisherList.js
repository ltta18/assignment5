import React from 'react';
import { publisherStyles as styles } from '../styles/styles';
import { FlatList } from 'react-native-gesture-handler';
import { 
  SafeAreaView, 
  View, 
  Text 
} from 'react-native';

export default function PublisherList({ route }) {
  const { publishersList } = route.params

  const publisherRow = ({item}) => {
    return (
      <View key={item} style={styles.publisher}>
        <Text style={styles.publisherName}>{item}</Text>
        <Text style={styles.publisherArticles}>{publishersList[item]}</Text>
      </View>
    )
  }

  const header = () => {
    return (
      <View style={styles.publisher}>
        <Text style={[ styles.publisherName, styles.label ]}>Publisher Name</Text>
        <Text style={[ styles.publisherArticles, styles.label ]}>Articles Number</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Publishers Count:</Text>
          <Text style={styles.info}>{Object.keys(publishersList).length}</Text>
        </View>
        <FlatList 
          data={Object.keys(publishersList)}
          renderItem={publisherRow}
          keyExtractor={item => item}
          ListHeaderComponent={header}
        />
      </View>
    </SafeAreaView>
  )
}



