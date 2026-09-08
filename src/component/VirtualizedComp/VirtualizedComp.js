import React from "react";
import { RefreshControl, VirtualizedList } from "react-native";


// Pass children, style, onRefresh () in props
const VirtualizedListComp = (props) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {

    if (props?.onRefresh) {
      setRefreshing(true);
      props?.onRefresh();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }

  }, []);


  return (
    <>
      <VirtualizedList
        style={props?.style}
        showsVerticalScrollIndicator={false}
        data={[{}]}
        initialNumToRender={1}
        renderItem={() => <>{props?.children}</>}
        keyExtractor={item => item}
        getItemCount={() => 1}
        getItem={() => 1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /></>
  );
};

export default VirtualizedListComp;