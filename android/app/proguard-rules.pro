# ==========================================
# 🛡️ REGRAS GERAIS E CAPACITOR
# ==========================================

# Manter classes principais do Capacitor e Bridge
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }

# Manter classes dos Plugins oficiais (Push, Camera, etc)
-keep class com.capacitorjs.** { *; }
-keep interface com.capacitorjs.** { *; }

# Manter qualquer classe que estenda Plugin (Plugins de terceiros e customizados)
-keep public class * extends com.getcapacitor.Plugin

# Manter compatibilidade com Cordova (se usares plugins legados)
-keep class org.apache.cordova.** { *; }
-keep interface org.apache.cordova.** { *; }

# ==========================================
# 🔥 REGRAS DO FIREBASE E GOOGLE SERVICES
# ==========================================

# Protege todo o Firebase (Auth, Firestore, Analytics, Crashlytics)
-keep class com.google.firebase.** { *; }

# Específico para NOTIFICAÇÕES PUSH (Messaging & InstanceID)
-keep class com.google.firebase.messaging.** { *; }
-keep class com.google.firebase.iid.** { *; }
-keep class com.google.firebase.installations.** { *; }
-keep class com.google.firebase.provider.FirebaseInitProvider { *; }

# Manter serviços do Google Play (Login Google, Mapas, etc)
-keep class com.google.android.gms.** { *; }

# Evitar problemas com modelos de dados e JSON (Gson)
-keep class com.google.gson.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# ==========================================
# 📱 REGRAS DO ANDROID E WEBVIEW
# ==========================================

# Manter anotações (Essencial para não dar erro de NullPointer)
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.annotation.Annotation

# Manter a ponte entre JavaScript e Android (WebView)
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface

# Regras de compatibilidade AndroidX e Support
-dontwarn android.support.**
-keep class android.support.v7.widget.** { *; }
-keep class android.support.v4.widget.** { *; }
-keep class android.support.v4.view.** { *; }
-keep class androidx.** { *; }

# ==========================================
# 🌐 REDE E OUTROS
# ==========================================

# OkHttp e Okio (usados internamente pelo Capacitor/Firebase)
-keep class okhttp3.** { *; }
-keep class okio.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# Ignorar avisos que não afetam a execução (limpa o log de build)
-dontwarn com.google.errorprone.annotations.**
-dontwarn javax.annotation.**