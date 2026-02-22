import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

const MOCK_MEMORIES = [
  {
    id: "1",
    title: "Meeting Notes - Proj...",
    date: "Today",
    time: "14:30",
    duration: "23:41",
    preview: "Discussed the Q4 roadmap, budget...",
    tag: "Meetings",
  },
  {
    id: "2",
    title: "App Idea: Plant Care...",
    date: "Today",
    time: "11:15",
    duration: "08:22",
    preview: "A specialized social network fo...",
    tag: "Voice",
  },
  {
    id: "3",
    title: "Grocery List & Errands",
    date: "Earlier this week",
    time: "09:04",
    duration: "02:18",
    preview: "Need to pick up milk, bread, organ...",
    tag: "Personal",
  },
];

const FILTERS = ["All", "Meetings", "Voice", "Personal"];

export default function MemoriesScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = MOCK_MEMORIES.filter((m) => {
    const matchesFilter = activeFilter === "All" || m.tag === activeFilter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Memories</Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons
            name="settings-outline"
            size={22}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={16} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recordings..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.activeChip]}
            onPress={() => setActiveFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === f && styles.activeFilterText,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/recording/${item.id}`)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.cardIcon}>
                <Ionicons name="mic" size={18} color={Colors.primary} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>
                  {item.date} · {item.time} · {item.duration}
                </Text>
                <Text style={styles.cardPreview}>{item.preview}</Text>
              </View>
            </View>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(tabs)/record")}
      >
        <Ionicons name="add" size={28} color={Colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: { color: Colors.text, fontSize: 22, fontWeight: "700" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    gap: 8,
  },
  searchInput: { flex: 1, color: Colors.text, fontSize: 14 },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeChip: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { color: Colors.textSecondary, fontSize: 13, fontWeight: "500" },
  activeFilterText: { color: Colors.background, fontWeight: "700" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 12,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: { flex: 1 },
  cardTitle: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  cardMeta: { color: Colors.textMuted, fontSize: 11, marginBottom: 4 },
  cardPreview: { color: Colors.textSecondary, fontSize: 12 },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
