import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import { VerticalSpace } from "../../../components/atoms/Spaces";
import COLORS from "../../../values/colors";

const HomePager = () => {
  const [selectedIndex, setselectedIndex] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.exploreText}>Explore the place</Text>
        <Text style={styles.allImagesText}>All images</Text>
      </View>
      <VerticalSpace height={12} />
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => {
          setselectedIndex(e.nativeEvent.position);
        }}
      >
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <View key={i}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://www.gamestation.com.br/perch/resources/03-2.jpg",
                }}
              />
              <VerticalSpace height={4} />
              <Text style={styles.pagerText} numberOfLines={2}>
                Lorem ipsum here we go to under the hood welcome all of you
                under ther hood
              </Text>
            </View>
          );
        })}
      </PagerView>
      <VerticalSpace height={12} />
      <View style={styles.indicatorsRow}>
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.indicator,
                { opacity: selectedIndex === i ? 1 : 0.3 },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
export default HomePager;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pagerView: { height: 200 },
  pagerText: { flex: 1, color: COLORS.grey },
  image: { flex: 5, width: "100%", borderRadius: 12 },
  exploreText: { color: COLORS.white },
  allImagesText: { color: COLORS.red },
  indicatorsRow: { flexDirection: "row", justifyContent: "center" },
  indicator: {
    backgroundColor: COLORS.grey,
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});
