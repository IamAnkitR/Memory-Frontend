import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Search memories, transcripts..."
          placeholderTextColor={Colors.textMuted}
        />
      </View>
      <Text style={styles.empty}>Start typing to search your memories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: { flex: 1, color: Colors.text, fontSize: 15 },
  empty: {
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 60,
    fontSize: 14,
  },
});
