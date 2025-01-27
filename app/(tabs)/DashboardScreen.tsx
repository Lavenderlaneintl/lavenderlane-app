import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Circle } from "react-native-progress";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AppButton from "@/components/AppButton";
import FileIcon from "@/assets/svgs/File";
import Size from "@/utils/hooks/useResponsiveSize";

const CircularProgress = ({ progress = 75 }: { progress: number }) => (
  <View style={styles.circularProgressContainer}>
    <Circle
      size={Size.calcWidth(60)}
      progress={progress / 100}
      showsText
      thickness={Size.calcWidth(5)}
      color="#0ADD73"
      unfilledColor="#E0E0E0"
      borderWidth={0}
    />
  </View>
);

const DashboardScreen = () => (
  <ThemedView style={styles.container}>
    <View style={styles.shadowWrapper}>
      <View style={styles.profileCard}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <ThemedText
              darkColor="##373D51"
              type="title"
              style={styles.cardTitle}
            >
              Complete your Profile
            </ThemedText>
            <ThemedText
              darkColor="##373D51"
              type="subtitle"
              style={styles.cardSubtitle}
            >
              Enter all necessary details to enjoy the features of Lavenderlane
            </ThemedText>
          </View>
          <View style={styles.progressContainer}>
            <CircularProgress progress={75} />
          </View>
        </View>
        <AppButton
          title="Update Profile"
          style={styles.updateButton}
          onPress={() => {}}
        />
      </View>
    </View>

    {/* Upcoming Events */}
    <View style={styles.eventsSection}>
      <ThemedText type="title" style={styles.sectionTitle}>
        Upcoming Events
      </ThemedText>
      <View style={styles.emptyState}>
        <FileIcon />
        <ThemedText style={styles.emptyText}>
          You are yet to add events
        </ThemedText>
        <AppButton
          title="Add Events ✨"
          style={{
            width: Size.calcWidth(160),
            height: Size.calcHeight(46),
          }}
        />
      </View>
    </View>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.calcWidth(18),
    borderTopLeftRadius: Size.calcWidth(24),
    borderTopRightRadius: Size.calcWidth(24),
  },
  shadowWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: "#BEA8FA",
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 0,
          height: Size.calcHeight(4),
        },
        shadowRadius: Size.calcWidth(4),
      },
    }),
  },

  profileCard: {
    borderRadius: Size.calcWidth(12),
    padding: Size.calcWidth(16),
    marginBottom: Size.calcHeight(24),
    elevation: 4,
    backgroundColor: "#F2EEFE",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    marginBottom: Size.calcHeight(8),
  },

  cardSubtitle: {
    fontSize: Size.calcWidth(14),
    marginBottom: Size.calcHeight(16),
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Size.calcHeight(16),
  },

  circularProgressContainer: {
    marginRight: Size.calcWidth(16),
  },

  updateButton: {
    marginTop: Size.calcHeight(16),
    height: Size.calcHeight(46),
  },

  eventsSection: {
    marginTop: Size.calcHeight(24),
  },

  sectionTitle: {
    fontSize: Size.calcWidth(18),
    fontWeight: "bold",
    marginBottom: Size.calcHeight(16),
  },

  emptyState: {
    padding: Size.calcWidth(16),
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: Size.calcWidth(14),
    marginBottom: Size.calcHeight(16),
  },
});

export default DashboardScreen;
