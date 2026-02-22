import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

export default function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (total: number) => {
    const h = Math.floor(total / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return { h, m, s };
  };

  const { h, m, s } = formatTime(seconds);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEMORY</Text>

      {/* Timer */}
      <View style={styles.timerRow}>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNumber}>{h}</Text>
          <Text style={styles.timerLabel}>hours</Text>
        </View>
        <Text style={styles.timerColon}>:</Text>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNumber}>{m}</Text>
          <Text style={styles.timerLabel}>minutes</Text>
        </View>
        <Text style={styles.timerColon}>:</Text>
        <View style={[styles.timerBlock, isRecording && styles.activeBlock]}>
          <Text
            style={[styles.timerNumber, isRecording && styles.activeNumber]}
          >
            {s}
          </Text>
          <Text style={[styles.timerLabel, isRecording && styles.activeLabel]}>
            seconds
          </Text>
        </View>
      </View>

      {/* Status */}
      {isRecording && (
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Recording Active</Text>
        </View>
      )}

      {/* Waveform Placeholder */}
      <View style={styles.waveform}>
        {Array.from({ length: 30 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.waveBar,
              {
                height: isRecording ? Math.random() * 50 + 10 : 20,
                opacity: isRecording ? 1 : 0.3,
              },
            ]}
          />
        ))}
      </View>

      {/* Transcript */}
      <View style={styles.transcriptContainer}>
        <View style={styles.transcriptHeader}>
          <Text style={styles.transcriptLabel}>Live Transcription</Text>
          <View style={styles.enabledBadge}>
            <Text style={styles.enabledText}>ENABLED</Text>
          </View>
        </View>
        <Text style={styles.transcriptText}>
          {transcript || (isRecording ? "Listening..." : "Tap record to begin")}
        </Text>
      </View>

      {/* Record Button */}
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.stopButton]}
        onPress={() => {
          setIsRecording(!isRecording);
          if (isRecording) setSeconds(0);
        }}
      >
        <Ionicons
          name={isRecording ? "stop" : "mic"}
          size={32}
          color={Colors.text}
        />
      </TouchableOpacity>
      <Text style={styles.tapLabel}>
        {isRecording ? "TAP TO STOP" : "TAP TO RECORD"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 24,
  },
  title: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 4,
    marginBottom: 32,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  timerBlock: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 64,
  },
  activeBlock: {
    backgroundColor: Colors.primary,
  },
  timerNumber: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  activeNumber: { color: Colors.background },
  timerLabel: { color: Colors.textMuted, fontSize: 10, marginTop: 2 },
  activeLabel: { color: Colors.background },
  timerColon: { color: Colors.textMuted, fontSize: 24, fontWeight: "300" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },
  statusText: { color: Colors.text, fontSize: 13, fontWeight: "600" },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    gap: 3,
    marginBottom: 24,
  },
  waveBar: {
    width: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  transcriptContainer: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 120,
  },
  transcriptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transcriptLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  enabledBadge: {
    backgroundColor: Colors.success + "22",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  enabledText: { color: Colors.success, fontSize: 10, fontWeight: "700" },
  transcriptText: { color: Colors.text, fontSize: 14, lineHeight: 22 },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  stopButton: { backgroundColor: Colors.danger },
  tapLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    marginTop: 12,
  },
});
