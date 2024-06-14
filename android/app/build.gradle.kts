// app/build.gradle.kts (App Module)

plugins {
    id("com.android.application")
    kotlin("android")
    kotlin("plugin.serialization") version "1.9.20"
    id("com.google.gms.google-services")
}

android {
    namespace = "com.gymtrackerapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.gymtrackerapp"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.5"
    }
    packagingOptions {
        resources.excludes.add("META-INF/*")
    }
}

dependencies {
    implementation(libs.kotlinStdlibV1922)
    implementation(libs.coreKtxV170)
    implementation(libs.androidxAppcompat)
    implementation(libs.googleMaterial)
    implementation(libs.androidxConstraintlayout)
    implementation(libs.lifecycleRuntimeKtxV240)
    implementation(libs.androidxActivityKtx)

    // Compose
    implementation(libs.ui)
    implementation(libs.androidxMaterial)
    implementation(libs.uiToolingPreview)
    implementation(libs.uiTooling)

    // React Native dependencies
    implementation("com.facebook.react:react-native:0.71.3") {
        exclude(group = "com.facebook.fbjni")
    }
    implementation(libs.gesturehandlerReactNativeGestureHandler)

    testImplementation(libs.junit)
    androidTestImplementation(libs.extJunit)
    androidTestImplementation(libs.espressoCoreV340)
}

