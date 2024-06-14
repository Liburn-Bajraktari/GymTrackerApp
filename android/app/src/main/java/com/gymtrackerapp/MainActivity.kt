package com.gymtrackerapp

import com.facebook.react.ReactActivity
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView


class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String {
        return "GymTrackerApp"
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): RNGestureHandlerEnabledRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }
        }
    }
}
