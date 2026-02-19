import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={Colors.textMuted} />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={12} color={Colors.background} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.email}>alex.johnson@example.com</Text>
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>

        {/* Account Details */}
        <Text style={styles.sectionLabel}>ACCOUNT DETAILS</Text>
        <View style={styles.card}>
          {[
            { icon: "person-outline", value: "Alex Johnson" },
            { icon: "mail-outline", value: "alex.johnson@example.com" },
            {
              icon: "text-outline",
              value: "Capturing moments, one memory at a time.",
            },
          ].map((item, i) => (
            <View key={i} style={[styles.row, i < 2 && styles.rowBorder]}>
              <Ionicons
                name={item.icon as any}
                size={18}
                color={Colors.textMuted}
              />
              <Text style={styles.rowValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* App Settings */}
        <Text style={styles.sectionLabel}>APP SETTINGS</Text>
        <View style={styles.card}>
          <View style={[styles.row, styles.rowBorder]}>
            <Ionicons
              name="notifications-outline"
              size={18}
              color={Colors.textMuted}
            />
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: Colors.primary }}
            />
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Ionicons name="cloud-outline" size={18} color={Colors.textMuted} />
            <Text style={styles.settingLabel}>Automatic Cloud Sync</Text>
            <Switch
              value={cloudSync}
              onValueChange={setCloudSync}
              trackColor={{ true: Colors.primary }}
            />
          </View>
          <View style={styles.row}>
            <Ionicons
              name="language-outline"
              size={18}
              color={Colors.textMuted}
            />
            <Text style={styles.settingLabel}>App Language</Text>
            <Text style={styles.settingValue}>English (US)</Text>
          </View>
        </View>

        {/* Danger Zone */}
        <Text style={[styles.sectionLabel, { color: Colors.danger }]}>
          DANGER ZONE
        </Text>
        <View style={[styles.card, styles.dangerCard]}>
          <Text style={styles.dangerText}>
            Permanently delete your account and all of your content. This action
            cannot be undone.
          </Text>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  headerTitle: { color: Colors.text, fontSize: 20, fontWeight: "700" },
  content: { padding: 20, paddingBottom: 60 },
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 12,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  name: { color: Colors.text, fontSize: 20, fontWeight: "700" },
  email: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  updateButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  updateText: { color: Colors.background, fontWeight: "700", fontSize: 15 },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    marginBottom: 16,
  },
  row: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowValue: { flex: 1, color: Colors.text, fontSize: 14 },
  settingLabel: { flex: 1, color: Colors.text, fontSize: 14 },
  settingValue: { color: Colors.textMuted, fontSize: 13 },
  dangerCard: { borderColor: Colors.danger + "44" },
  dangerText: {
    color: Colors.textSecondary,
    fontSize: 13,
    padding: 14,
    lineHeight: 20,
  },
  deleteButton: {
    margin: 14,
    marginTop: 0,
    backgroundColor: Colors.danger,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  deleteText: { color: Colors.text, fontWeight: "700", fontSize: 14 },
});
