// build.gradle.kts (Root Project)

buildscript {
    repositories {
        google()
        mavenCentral()
        maven { setUrl("https://jitpack.io")}
    }
    dependencies {
        classpath(libs.androidGradlePlugin)
        classpath(libs.kotlinGradlePlugin)
        classpath(libs.googleServices)
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://maven.fabric.io/public") }
        maven { url = uri("$rootDir/../node_modules/react-native/android") }
        maven { url = uri("https://maven.google.com") }
        maven { setUrl("https://jitpack.io") }
        maven {
            url = uri("https://maven.pkg.github.com/mikepenz/Android-Iconics")
            credentials {
                username = project.findProperty("gpr.user") as String? ?: System.getenv("Liburn-Bajraktari")
                password = project.findProperty("gpr.token") as String? ?: System.getenv("SteinsGatePersona5")
            }
        }
    }
}
tasks.register<Delete>("clean") {
    delete(rootProject.buildDir)
}