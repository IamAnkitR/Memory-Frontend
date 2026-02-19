import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon} />
        <Text style={styles.logoText}>MEMORY</Text>
        <Text style={styles.tagline}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to access your digital vault of memories.
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "login" && styles.activeTab]}
          onPress={() => setActiveTab("login")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "login" && styles.activeTabText,
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "signup" && styles.activeTab]}
          onPress={() => setActiveTab("signup")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "signup" && styles.activeTabText,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          placeholderTextColor={Colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={Colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.replace("/(tabs)/memories")}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>— or continue with —</Text>

      {/* Social Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>G Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}> Apple</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        By continuing, you agree to Memory's Terms of Service and Privacy
        Policy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    marginBottom: 8,
  },
  logoText: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 4,
  },
  tagline: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  activeTabText: {
    color: Colors.background,
  },
  inputContainer: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
  },
  forgot: {
    color: Colors.primary,
    fontSize: 13,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 14,
    color: Colors.text,
    fontSize: 15,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  signInText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
  orText: {
    color: Colors.textMuted,
    textAlign: "center",
    marginVertical: 20,
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  socialText: {
    color: Colors.text,
    fontWeight: "600",
  },
  termsText: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 16,
  },
});
