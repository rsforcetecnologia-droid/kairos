# Manter todas as classes do Capacitor
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }

# Manter classes dos Plugins oficiais (Push, Camera, etc)
-keep class com.capacitorjs.** { *; }
-keep interface com.capacitorjs.** { *; }

# Manter qualquer classe que estenda Plugin (Para plugins de terceiros)
-keep public class * extends com.getcapacitor.Plugin

# Manter anotações (CRITICO: O erro de NullPointer acontece porque isso está faltando ou sendo removido)
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.annotation.Annotation

# Manter referências do WebView e Javascript Interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface

# Regras gerais do Android para evitar quebras em bibliotecas comuns
-dontwarn android.support.**
-keep class android.support.v7.widget.** { *; }
-keep class android.support.v4.widget.** { *; }
-keep class android.support.v4.view.** { *; }