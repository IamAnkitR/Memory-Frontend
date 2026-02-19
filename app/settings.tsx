import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function SettingsScreen() {
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
        {/* Account Details */}
        <Text style={styles.sectionLabel}>ACCOUNT DETAILS</Text>
        <View style={styles.card}>
          {[
            {
              label: "Full Name",
              value: "Alex Johnson",
              icon: "person-outline",
            },
            {
              label: "Email",
              value: "alex.johnson@example.com",
              icon: "mail-outline",
            },
            {
              label: "Bio",
              value: "Capturing moments, one memory at a time.",
              icon: "text-outline",
            },
          ].map((item, i) => (
            <View key={i} style={[styles.row, i < 2 && styles.rowBorder]}>
              <Ionicons
                name={item.icon as any}
                size={18}
                color={Colors.textMuted}
              />
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
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
              thumbColor={Colors.text}
            />
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Ionicons name="cloud-outline" size={18} color={Colors.textMuted} />
            <Text style={styles.settingLabel}>Automatic Cloud Sync</Text>
            <Switch
              value={cloudSync}
              onValueChange={setCloudSync}
              trackColor={{ true: Colors.primary }}
              thumbColor={Colors.text}
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
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowContent: { flex: 1 },
  rowLabel: { color: Colors.textMuted, fontSize: 11, marginBottom: 2 },
  rowValue: { color: Colors.text, fontSize: 14 },
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
