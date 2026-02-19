import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const MOCK_DETAIL = {
  title: "Project Sync Meeting",
  date: "12/15/24 · 10:25:16",
  summary:
    '"This recording covers the strategic planning for the upcoming Q4 product launch. Key discussions centered around marketing budget allocations, timeline adjustments for the beta phase, and the alignment of the engineering team with the new feature set. The team agreed on a finalized roadmap by Friday."',
  takeaways: [
    "Budget Reallocation — Increase social media spend to 35% to target early adopters.",
    "Beta Testing Timeline — Beta phase extended by one week to ensure UI quality.",
    "Action Items — Engineering team to sync with marketing by Wednesday morning.",
  ],
};

export default function RecordingDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{MOCK_DETAIL.title}</Text>
          <Text style={styles.headerMeta}>{MOCK_DETAIL.date}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons
              name="share-outline"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons
              name="create-outline"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="document-text-outline"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.sectionTitle}>Summary</Text>
          </View>
          <Text style={styles.summaryText}>{MOCK_DETAIL.summary}</Text>
        </View>

        {/* Key Takeaways */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bulb-outline" size={16} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Key Takeaways</Text>
          </View>
          {MOCK_DETAIL.takeaways.map((t, i) => (
            <View key={i} style={styles.takeawayRow}>
              <View style={styles.checkbox}>
                <Ionicons name="checkmark" size={12} color={Colors.primary} />
              </View>
              <Text style={styles.takeawayText}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Player */}
        <View style={styles.player}>
          <View style={styles.waveformMini}>
            {Array.from({ length: 40 }).map((_, i) => (
              <View
                key={i}
                style={[styles.waveBar, { height: Math.random() * 30 + 8 }]}
              />
            ))}
          </View>
          <View style={styles.playerControls}>
            <TouchableOpacity>
              <Ionicons
                name="play-back"
                size={24}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="play" size={24} color={Colors.background} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="play-forward"
                size={24}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="headset-outline"
                size={24}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  headerCenter: { flex: 1 },
  headerTitle: { color: Colors.text, fontWeight: "700", fontSize: 15 },
  headerMeta: { color: Colors.textMuted, fontSize: 11, marginTop: 2 },
  headerActions: { flexDirection: "row", gap: 4 },
  iconBtn: { padding: 6 },
  content: { padding: 20, paddingBottom: 40 },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: { color: Colors.text, fontWeight: "700", fontSize: 15 },
  summaryText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: "italic",
  },
  takeawayRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  takeawayText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  player: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  waveformMini: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    gap: 2,
    marginBottom: 16,
  },
  waveBar: {
    width: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    opacity: 0.7,
  },
  playerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
