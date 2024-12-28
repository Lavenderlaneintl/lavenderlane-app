import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "@/components/ThemedText";
import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container} scrollable={false}>
      <ThemedText type="title" style={styles.title}>
        Welcome to SafeTrust
      </ThemedText>

      <ThemedText style={styles.subTitle} type="defaultSemiBold">
        Discover Your Crypto Potential: Start Your Journey in the Future of
        Finance
      </ThemedText>

      <AppButton
        style={styles.button}
        title="Get Started"
        // onPress={() => router.replace("/Login")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Size.calcWidth(30),
  },

  image: {
    width: Size.calcAverage(350),
    height: Size.calcAverage(300),
    marginVertical: Size.calcHeight(30),
  },

  title: {
    marginVertical: Size.calcHeight(30),
    textAlign: "center",
    maxWidth: "80%",
  },

  subTitle: {
    textAlign: "center",
    marginBottom: Size.calcHeight(30),
  },

  button: {
    maxWidth: "90%",
  },
});
